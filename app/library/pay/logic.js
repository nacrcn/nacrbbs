/* 计算价格函数 */
export async function calculatePrice(from) {


    try {
        let list = JSON.parse(from)
        let price = 0
        console.log(list);

        for (let a in list) {
            if (list[a].type === 1) {
                price = price + Number(list[a].price)
            }
            if (list[a].type === 2) {
                /* 查询会员等级信息 */
                const memberLevel = await global.db.query('SELECT * FROM n_usergroup_price where id = ?', [list[a].id]);
                if (memberLevel.length !== 0) {
                    price = price + Number(memberLevel[0].n_price)
                }
            }

            if (list[a].type === 3) {
                /* 购买帖子 */
                /* 获取帖子信息 */
                const postInfo = await global.db.query('SELECT * FROM n_threads where id = ?', [list[a].id]);
                if (postInfo.length !== 0) {
                    price = price + Number(postInfo[0].n_price)
                }
            }
        }

        return price
    } catch (error) {
        console.log(error);

    }
}

/* 整理订单货物 */
export async function formatOrderGoods(from, id) {
    try {
        /* 
            解释,from.type类型。1：余额充值。2：会员充值，3：帖子购买
        */
        let list = JSON.parse(from)
        for (let a in list) {
            if (list[a].type === 1) {
                await global.db.insert('n_payorder_item', {
                    n_oid: id,
                    n_name: '积分余额充值',
                    n_number: 1,
                    n_price: list[a].price,
                    n_type: 1
                })

                await global.db.update('n_payorder', { n_balance: 2 }, 'id = ?', [id])
            }
            if (list[a].type === 2) {
                /* 查询会员等级信息 */
                const memberLevel = await global.db.query('SELECT * FROM n_usergroup_price where id = ?', [list[a].id]);
                if (memberLevel.length !== 0) {
                    /* 获取会员组 */
                    const memberGroup = await global.db.query('SELECT * FROM n_usergroup where id = ?', [memberLevel[0].n_gid]);

                    await global.db.insert('n_payorder_item', {
                        n_oid: id,
                        n_name: '购买' + memberGroup[0].n_name,
                        n_number: 1,
                        n_price: memberLevel[0].n_price,
                        n_type: 2,
                        n_sid: list[a].id
                    })
                }
            }

            if (list[a].type === 3) {
                /* 获取帖子信息 */

                const postInfo = await global.db.query('SELECT * FROM n_threads where id = ?', [list[a].id]);
                if (postInfo.length !== 0) {
                    await global.db.insert('n_payorder_item', {
                        n_oid: id,
                        n_name: '购买帖贴子 - ' + postInfo[0].id,
                        n_number: 1,
                        n_price: postInfo[0].n_price,
                        n_type: 3,
                        n_sid: list[a].id
                    })

                }
                if (postInfo[0].n_permission == '2') {
                    await global.db.update('n_payorder', { n_balance: 3 }, 'id = ?', [id])
                }
            }
        }
    } catch (error) {
        console.log(error);
    }


}

/* 获取支付方式对应的transporter */
export async function getTransporter(code) {

    try {
        let sql;

        if (code == 1) {
            sql = 'SELECT n_code FROM n_payconfig where n_qq = 1 and n_off = 1';
        }
        if (code == 2) {
            sql = 'SELECT n_code FROM n_payconfig where n_wx = 1 and n_off = 1';
        }
        if (code == 3) {
            sql = 'SELECT n_code FROM n_payconfig where n_ali = 1 and n_off = 1';
        }
        const res = await global.db.query(sql);
        if (res.length === 0) {
            return false
        }
        return res[0];

    } catch (error) {

        console.log(error);

    }

}

/* 引入微信支付回调解密函数 */
import { decryption } from './WeChatPay/decryption.js'
/* 获取回调订单号函数 */
export async function getOrderNo(options) {
    try {
        /* 如果有订单号，则直接返回订单号 */
        if (options.out_trade_no) {
            return options.out_trade_no
        }

        /* 如果没有订单号，则可能是微信支付 尝试判断是否是微信支付 */
        if (options.event_type === 'TRANSACTION.SUCCESS' && options.resource.ciphertext) {
            /* 解密微信支付订单号 */
            const decrypt = decryption(options.resource)
            if (decrypt.out_trade_no) {
                return decrypt.out_trade_no
            } else {
                return false
            }
        }
    } catch (error) {
        return false
    }
}

/* 支付回调 */
export async function upPayNotify(info, reply) {

    try {

        /* 获取订单物品 */
        const orderItem = await global.db.query('SELECT * FROM n_payorder_item where n_oid = ?', [info.id]);

        for (let a in orderItem) {

            /* 如果是充值余额积分 */
            if (orderItem[a].n_type === '1') {
                await global.db.query('update n_users set n_balance = n_balance + ? where id = ?', [orderItem[a].n_price, info.n_uid])

                await global.db.insert('n_user_bill', {
                    n_name: '在线充值',
                    n_amount: orderItem[a].n_price,
                    n_uid: info.n_uid,
                    n_time: new Date(),
                    n_type: 1,
                    n_status: 2
                })
            }
            /* 如果是购买会员 */
            if (orderItem[a].n_type === '2') {
                /* 查询会员等级信息 */
                const memberLevel = await global.db.query('SELECT * FROM n_usergroup_price where id = ?', [orderItem[a].n_sid]);
                if (memberLevel.length == 0) {
                    console.log('会员等级不存在', orderItem[a].n_sid);
                    continue;
                };

                /* 获取会员组 */

                const memberGroup = await global.db.query('SELECT * FROM n_usergroup where id = ?', [memberLevel[0].n_gid]);
                if (memberGroup.length == 0) {
                    console.log('会员组不存在', memberLevel[0].n_gid);
                    continue;
                };
                /* 获取用户信息 */
                const userInfo = await global.db.query('SELECT * FROM n_users where id = ?', [info.n_uid]);
                if (userInfo.length == 0) {
                    console.log('用户不存在', info.n_uid);
                    continue;
                };
                // 计算新的会员到期时间
                const now = new Date();
                const dayDuration = memberLevel[0].n_day * 24 * 60 * 60 * 1000; // 转换为毫秒

                let newGroupTime;
                if (userInfo[0].n_group_id !== memberGroup[0].id) {
                    // 新用户或更换会员组，从当前时间开始计算
                    newGroupTime = new Date(now.getTime() + dayDuration);
                } else {
                    // 续费同一会员组
                    const currentGroupTime = new Date(userInfo[0].n_group_time);
                    if (currentGroupTime > now) {
                        // 还未到期，在现有时间基础上延长
                        newGroupTime = new Date(currentGroupTime.getTime() + dayDuration);
                    } else {
                        // 已到期，从当前时间开始计算
                        newGroupTime = new Date(now.getTime() + dayDuration);
                    }
                }

                // 更新用户会员信息
                await global.db.update('n_users', {
                    n_group_id: memberGroup[0].id,
                    n_group_time: newGroupTime
                }, 'id = ?', [info.n_uid]);
            }

            /* 如果是购买货物 */
            if (orderItem[a].n_type === '3') {
                // n_threads_buy [orderItem[a].n_sid

                await global.db.insert('n_threads_buy', {
                    n_tid: orderItem[a].n_sid,
                    n_uid: info.n_uid,
                    n_time: new Date()
                })
            }
        }

        if (reply) {
            global.sendMsg(reply, 200);
        }

    } catch (error) {
        console.log(error);
    }

}