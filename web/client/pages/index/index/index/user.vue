<template>
    <div>
        <div class="Page">
            <div class="TopB">
                <div class="TopBox">
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

                </div>
                <div class="VipBox" @click="navigateTo('/user/vip')">
                    <p class="VipBoxTitle">{{ UserInfo.$state.UserInfo?.VipInfo?.n_name }}</p>
                    <p class="VipBoxNote">{{ UserInfo.$state.UserInfo?.VipInfo?.n_deft == '1' ? '无期限' :
                        UserInfo.$state.UserInfo?.n_group_time + ' 到期' }}
                    </p>
                </div>
            </div>
            <!-- 底部区域 n_balance -->
            <div class="bottoction">
                <BoxTitle>战胜附体</BoxTitle>
                <div class="Content">

                    <div class="BanBox" @click="navigateTo('/user/points')">
                        <p class="BanBoxTitle">我的积分</p>
                        <p class="BanBoxConte">{{ UserInfo.$state.UserInfo.n_points }}</p>

                    </div>
                    <div class="BanBox" @click="navigateTo('/user/wallet')">
                        <p class="BanBoxTitle">我的余额</p>
                        <p class="BanBoxConte">￥{{ UserInfo.$state.UserInfo.n_balance }}</p>

                    </div>
                </div>
            </div>
            <div class="bottoction">
                <BoxTitle>操作菜单</BoxTitle>
                <div class="Cbox">
                    <div class="Item" @click="navigateTo('/user/medal')">
                        <div class="icon">
                            <icon-tags />
                        </div>
                        <p class="title">勋章中心</p>
                    </div>
                    <div class="Item">
                        <div class="icon" @click="navigateTo('/user/Buylog')">
                            <icon-bookmark />
                        </div>
                        <p class="title">购买记录</p>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const UserInfo = useUserInfo()





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
    getinfo()
})

</script>

<style lang="scss" scoped>
@media (max-width: 780px) {
    .Page {
        width: calc(100% - 0px);
        border-radius: 20px;
        .TopB {
            background-color: #fff;
            border-radius: 25px;
            background-color: #1b150d;

            .TopBox {
                width: calc(100% - 20px);
                padding: 10px;
                background-color: #fff;
                border-radius: 25px;

                .Pagecontent {

                    display: flex;
                    position: relative;
                    margin: 5px auto;

                    .useravatar {
                        width: 50px;
                        height:50px;

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            border: 1px solid #ccc;
                        }
                    }

                    .userinfo {
                        margin-left: 10px;
                        margin-top: 4px;

                        .userinfoname {
                            font-size: 18px;
                            font-weight: 800;
                            color: #000;
                        }

                        .usersignature {
                            font-size: 12px;
                            color: #666;
                            margin-top: 5px;
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

                .user-statistics {
                    gap: 10px;
                    margin: 20px auto 0px;
                    border-radius: 10px;

                    .flex {
                        display: flex;
                        width: calc(100% - 0px);
                        margin: 0 auto;
                        border-radius: 10px;
                        padding: 0px 0px;
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

            }

            .VipBox {
                padding: 0px 20px;
                width: calc(100% - 40px);
                border-radius: 15px;
                color: #ffd51b;
                position: relative;
                line-height: 50px;

                .VipBoxTitle {
                    font-size: 17px;
                    font-weight: 800;
                }

                .VipBoxNote {
                    /* 斜体字 */
                    font-style: italic;
                    color: #ffd51b;
                    font-size: 12px;
                    position: absolute;
                    top: 0px;
                    right: 20px;
                }

            }


        }


        .bottoction {
            background-color: #fff;
            width: calc(100% - 30px);
            padding: 15px;
            border-radius: 24px;
            margin-top: 5px;

            .Content {
                width: calc(100%);
                margin: 5px auto;
                display: flex;


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
                        font-size: 18px;
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



            }

            .Cbox {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                gap: 10px;
                margin-top: 20px;

                .Item {
                    border-radius: 20px;
                    padding: 10px;
                    background-color: #f8f8f8;
                    border: 1px solid #fff;
                    cursor: pointer;

                    &:hover {
                        border: 1px solid #00ce90;
                        background-color: #fff;
                    }

                    .icon {
                        font-size: 20px;
                        text-align: center;
                    }

                    .title {
                        text-align: center;
                        margin-top: 6px;
                        font-size: 12px;
                    }
                }
            }
        }

        .Infobox {
            background-color: #fff;
            width: calc(100% - 30px);
            padding: 15px;
            border-radius: 15px;

            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin: 0 auto;
            /* 高度不跟随父元素 */
            height: 100%;
            margin-top: 5px;

            .InfoItem {
                .InfoItemTitle {
                    font-size: 14px;
                    color: #6d6d6d;
                    margin-right: 10px;
                }
            }
        }

    }
}

@media (min-width: 780px) {
    .Page {
        width: calc(100% - 0px);

        border-radius: 20px;


        .TopB {
            background-color: #fff;
            border-radius: 25px;
            background-color: #1b150d;

            .TopBox {
                width: calc(100% - 30px);
                padding: 15px;
                background-color: #fff;
                border-radius: 25px;

                .Pagecontent {

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
                        margin-left: 20px;
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
                        right: 10px;
                        top: 10px;
                        border-radius: 20px;
                        overflow: hidden;
                    }
                }

                .user-statistics {
                    gap: 10px;
                    margin: 20px auto 0px;
                    border-radius: 10px;

                    .flex {
                        display: flex;
                        width: calc(100% - 0px);
                        margin: 0 auto;
                        border-radius: 10px;
                        padding: 0px 0px;
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

            }

            .VipBox {
                padding: 0px 20px;
                width: calc(100% - 40px);
                border-radius: 15px;
                color: #ffd51b;
                position: relative;
                line-height: 50px;

                .VipBoxTitle {
                    font-size: 17px;
                    font-weight: 800;
                }

                .VipBoxNote {
                    /* 斜体字 */
                    font-style: italic;
                    color: #ffd51b;
                    font-size: 12px;
                    position: absolute;
                    top: 0px;
                    right: 20px;
                }

            }


        }


        .bottoction {
            background-color: #fff;
            width: calc(100% - 30px);
            padding: 15px;
            border-radius: 24px;
            margin-top: 5px;

            .Content {
                width: calc(100%);
                margin: 5px auto;
                display: flex;


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



            }

            .Cbox {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                gap: 10px;
                margin-top: 20px;

                .Item {
                    border-radius: 20px;
                    padding: 10px;
                    background-color: #f8f8f8;
                    border: 1px solid #fff;
                    cursor: pointer;

                    &:hover {
                        border: 1px solid #00ce90;
                        background-color: #fff;
                    }

                    .icon {
                        font-size: 20px;
                        text-align: center;
                    }

                    .title {
                        text-align: center;
                        margin-top: 6px;
                        font-size: 12px;
                    }
                }
            }
        }

        .Infobox {
            background-color: #fff;
            width: calc(100% - 30px);
            padding: 15px;
            border-radius: 15px;

            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin: 0 auto;
            /* 高度不跟随父元素 */
            height: 100%;
            margin-top: 5px;

            .InfoItem {
                .InfoItemTitle {
                    font-size: 14px;
                    color: #6d6d6d;
                    margin-right: 10px;
                }
            }
        }

    }
}
</style>
