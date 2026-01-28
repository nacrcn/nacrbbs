<template>
    <div>
        <div class="Page">
            <div class="Pagecontent">
                <div class="useravatar">
                    <img :src="UserInfo.$state.UserInfo.n_avatar" />
                </div>
                <div class="userinfo">
                    <p class="userinfoname">{{ UserInfo.$state.UserInfo.n_nickname }}</p>
                    <p class="usersignature">{{ UserInfo.$state.UserInfo.n_signature }}</p>
                </div>
                <!-- 右侧按钮 -->
                <div class="right-buttons">
                    <a-button type="primary" size="small" @click="navigateTo('/user/editInfo')">
                        <template #icon>
                            <icon-pen-fill />
                        </template>
                        修改资料
                    </a-button>
                </div>
            </div>
            <div class="user-statistics">
                <BoxTitle>我的动态</BoxTitle>
                <div class="flex" @click="navigateTo('/user/myInfo')">
                    <div class="statistics-content">
                        <p>{{ TBBSInfo.posts }}</p>
                        <p>我的帖子</p>
                    </div>
                    <div class="statistics-content">
                        <p>{{ TBBSInfo.n_comment }}</p>
                        <p>我的回复</p>
                    </div>
                    <div class="statistics-content">
                        <p>{{ TBBSInfo.followers }}</p>
                        <p>我的粉丝</p>
                    </div>
                    <div class="statistics-content">
                        <p>{{ TBBSInfo.following }}</p>
                        <p>我的关注</p>
                    </div>
                </div>
            </div>

            <!-- 底部区域 n_balance -->
            <BoxTitle>战胜附体</BoxTitle>
            <div class="Content">
                <div class="VipBox" @click="navigateTo('/user/vip')">
                    <p class="VipBoxTitle">{{ UserInfo.$state.UserInfo?.VipInfo?.n_name }}</p>
                    <p class="VipBoxConte">{{ UserInfo.$state.UserInfo?.VipInfo?.n_deft == '1' ? '无期限' :
                        UserInfo.$state.UserInfo?.n_group_time + ' 到期' }}
                    </p>
                </div>
                <div class="BanBox" @click="navigateTo('/user/points')">
                    <p class="BanBoxTitle">我的积分</p>
                    <p class="BanBoxConte">{{ UserInfo.$state.UserInfo.n_points }}</p>

                </div>
                <div class="BanBox" @click="navigateTo('/user/wallet')">
                    <p class="BanBoxTitle">我的余额</p>
                    <p class="BanBoxConte">{{ UserInfo.$state.UserInfo.n_balance }}</p>
                    <div>
                        <a-space class="BanBoxButtons">

                            <a-button type="primary" size="small" status="success"
                                @click.stop="navigateTo('/user/topup')">
                                <template #icon>
                                    <icon-safe />
                                </template>
                                充值
                            </a-button>
                        </a-space>
                    </div>
                </div>
            </div>
            <div class="Infobox">
                <div class="InfoItem">
                    <span class="InfoItemTitle">我的邮箱:</span>
                    <span class="InfoItemConte">{{ UserInfo.$state.UserInfo.n_username }}</span>
                </div>
                <div class="InfoItem">
                    <span class="InfoItemTitle">注册时间:</span>
                    <span class="InfoItemConte">{{ UserInfo.$state.UserInfo.n_registertime }}</span>
                </div>
                <div class="InfoItem">
                    <span class="InfoItemTitle">我的性别:</span>
                    <span class="InfoItemConte">{{ UserInfo.$state.UserInfo.n_gender === '1' ? '男' : '女'
                        }}</span>
                </div>
                <div class="InfoItem">
                    <span class="InfoItemTitle">我的编码:</span>
                    <span class="InfoItemConte">{{ UserInfo.$state.UserInfo.n_encoding }}</span>
                </div>
                <div class="InfoItem">
                    <span class="InfoItemTitle">联系电话:</span>
                    <span class="InfoItemConte">{{ UserInfo.$state.UserInfo.n_phone ?? '未设置' }}</span>
                </div>
                <div class="InfoItem">
                    <span class="InfoItemTitle">我的QQ:</span>
                    <span class="InfoItemConte">{{ UserInfo.$state.UserInfo.n_qqnumber ?? '未设置' }}</span>
                </div>
                <div class="InfoItem">
                    <span class="InfoItemTitle">我的微信:</span>
                    <span class="InfoItemConte">{{ UserInfo.$state.UserInfo.n_wxnumber ?? '未设置' }}</span>
                </div>
            </div>

            <div class="ActiveBox">
                <div class="InfoItem" v-for="value in ActivityList">
                    <img class="InfoItemIcon" :src="value.n_icon" alt="">
                    <div class="InfoItemContent">
                        <p class="InfoItemTitle">{{ value.n_name }}</p>
                        <p class="InfoItemConte">{{ value.n_note }}</p>
                    </div>

                    <a-button class="ActiveBoxBut" type="primary" size="small" @click="navigateTo(value.n_path)">
                        <template #icon>
                            <icon-safe />
                        </template>
                        {{ value.n_buttext || '查看详情' }}
                    </a-button>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const UserInfo = useUserInfo()



/* 获取活动列表 /api/getActivity */
const ActivityList = ref([])
const getActivity = async () => {
    const res = await useApiFetch().post('/api/getActivity')
    if (res.code === 200) {
        ActivityList.value = res.data
    }
}

/* 论坛详情 */
const TBBSInfo = ref({})

const getinfo = async () => {
    const res = await useApiFetch().post('/api/GetUser', {
        id: 'me'
    })
    if (res.code === 200) {
        TBBSInfo.value = res.data
    }
}
onMounted(() => {
    getActivity()
    getinfo()
})

/* 查看页面 */
const showIndex = ref('1')
</script>

<style lang="scss" scoped>
.Page {
    width: calc(100% - 40px);
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;

    .user-statistics {
        gap: 10px;
        margin: 10px auto;
        border-radius: 10px;

        .flex {
            display: flex;
            width: calc(100% - 30px);
            margin: 0 auto;
            border-radius: 10px;
            padding: 10px 0px;
            border: 1px solid #fff;
            cursor: pointer;
            &:hover {
                border: 1px solid #00c451;
            }
        }

        .statistics-content {
            width: 100%;
            text-align: center;
            line-height: 20px;
            border-radius: 10px;
        }
    }

    .Pagecontent {
        width: calc(100%);
        background-color: #fff;
        display: flex;
        position: relative;
        margin: 5px auto;

        .useravatar {
            width: 80px;
            height: 80px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px solid #ccc;
            }
        }

        .userinfo {
            margin-left: 30px;
            margin-top: 10px;

            .userinfoname {
                font-size: 24px;
                font-weight: 800;
                color: #000;
            }

            .usersignature {
                font-size: 14px;
                color: #666;
                margin-top: 10px;
                line-height: 20px;
                max-width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .right-buttons {
            position: absolute;
            right: 0px;
            top: 0px;
            border-radius: 20px;
            overflow: hidden;
        }
    }

    .Content {
        width: calc(100% - 10px);
        margin: 5px auto;
        display: flex;
        margin-top: 30px;

        .VipBox {
            background-color: #1b150d;
            padding: 20px;
            width: calc(100%);
            border-radius: 15px;
            color: #ffd51b;
            position: relative;

            .VipBoxTitle {
                margin-bottom: 10px;
                font-size: 17px;
                font-weight: 800;
            }

            .VipBoxNote {
                margin-top: 20px;
                /* 斜体字 */
                font-style: italic;
                color: #ffd51b;
                font-size: 12px;
            }

            .BuyBox {
                position: absolute;
                right: 30px;
                top: 60px;
                background-color: #ecbc1f;
                border-radius: 20px;
            }
        }



        .BanBox {
            width: calc(100%);
            background-color: #f0f0f0;
            margin-left: 5px;
            padding: 20px;
            border-radius: 15px;
            position: relative;

            .BanBoxTitle {
                font-size: 13px;
                color: #6d6d6d;
            }

            .BanBoxConte {
                font-size: 24px;
                color: #000;
                margin-top: 10px;
            }

            .BanBoxButtons {

                margin-top: 10px;
                position: absolute;
                right: 20px;
                bottom: 20px;
            }

        }

        .Infobox {
            width: calc(100% - 20px);
            background-color: #fff;
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin: 0 auto;
            margin-top: 20px;
            /* 高度不跟随父元素 */
            height: 100%;

            .InfoItem {
                .InfoItemTitle {
                    font-size: 14px;
                    color: #6d6d6d;
                    margin-right: 10px;
                }
            }
        }

    }


    .ActiveBox {
        width: calc(100% - 20px);
        padding: 10px;
        background-color: #fff;
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin: 0 auto;
        /* 高度不跟随父元素 */
        height: 100%;
        margin-top: 25px;

        .InfoItem {
            position: relative;
            background-color: #f8f8f8;
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 10px;

            .InfoItemIcon {
                width: 40px;
                height: 40px;
                margin-right: 10px;
                margin-left: 10px;
            }

            .InfoItemContent {
                .InfoItemTitle {
                    font-size: 14px;
                    color: #000000;
                    margin-bottom: 5px;
                    font-weight: 800;
                }

                .InfoItemConte {
                    font-size: 13px;
                    color: #6d6d6d;
                }
            }

            .ActiveBoxBut {
                position: absolute;
                right: 20px;
                top: 16px;
                background-color: #fd511d;
                border-radius: 20px;
                padding: 5px 10px;

            }
        }
    }

    @media (max-width: 780px) {

        /* 视口小于 780px 时*/
        .Content {
            // flex-direction: column;
            flex-wrap: wrap;

            .VipBox {
                width: calc(100% - 40px);
            }

            .BanBox {
                margin-left: 0px;
                margin-top: 5px;
                width: calc(50% - 42.5px);

                &:last-child {
                    margin-left: 5px;
                }

                .BanBoxButtons {

                    display: none;
                }
            }
        }

        .Infobox,
        .ActiveBox {
            grid-template-columns: 1fr !important;

        }
    }

}
</style>
