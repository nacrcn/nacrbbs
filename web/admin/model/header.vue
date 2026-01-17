<template>
    <div class="HeaderBox">
        <div class="HeaderBoxNeibox">
            <!-- logo -->
            <NuxtLink to="/" > <img class="HeaderBoxNeiboxLogo"
                    :src="SiteConfig.Config.xu_WebLogo" alt="Logo"></NuxtLink>

            <!-- 手机端 <icon-menu /> -->
            <div class="Phonemenu" @click="showMenu = !showMenu">
                <icon-menu v-if="!showMenu" />
                <icon-close v-else />
            </div>
            <!-- 用户 -->
            <div class="UserBox">
                <a-space>
                    <div v-if="!myinfo.id" class="hvr-wobble-to-top-right loginbut" @click="Show.increment()">
                        <icon-user style="margin-right: 10px;" />登录控制台
                    </div>
                    <NuxtLink to="/UserCenter" v-else class="hvr-wobble-to-top-right userinfo">
                        <a-avatar :size="30" style="margin-right: 10px;">
                            <img alt="avatar" :src="myinfo.x_avatar" />
                        </a-avatar>{{ myinfo.x_nickname }}
                    </NuxtLink>
                </a-space>
            </div>
        </div>
    </div>

    <!-- 登录弹窗 -->
    <Login />
</template>

<script setup>

const showMenu = ref(false);
const SiteConfig = useSiteConfig()
import Login from './login.vue';
const Show = UserLoginShow()
/* 获取我的信息 /av1/getmyinfo
 */
const myinfo = ref({})
const getmyinfo = async () => {
    const res = await useApiFetch().post('/av1/getmyinfo')
    if (res.code == 200) {
        myinfo.value = res.data
    }
}
getmyinfo()
</script>

<style lang="scss" scoped>
/* 视口大于800 */
@media (min-width: 800px) {
    .HeaderBox {
        width: 100%;
        height: 60px;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;

        .HeaderBoxNeibox {
            width: calc(100% - 20px);
            height: 60px;
            max-width: 1200px;
            overflow: hidden;
            margin: 0 auto;

            .HeaderBoxNeiboxLogo {
                height: 40px;
                width: auto;
                float: left;
                margin-top: 10px;
            }

            .NavBox {
                float: left;
                height: 100%;
                padding-left: 50px;
                padding-top: 13px;

                .navitem {
                    text-decoration: none;
                    color: rgb(0, 0, 0);
                    margin: 0 5px;
                    font-size: 14px;
                    padding: 10px 15px;
                    cursor: pointer;

                    &:hover {
                        color: rgb(0, 110, 255);
                        background-color: aliceblue;
                        border-radius: 5px;
                    }
                }
            }

            .UserBox {
                float: right;
                height: 100%;
                padding-right: 50px;
                padding-top: 13px;

                .loginbut {
                    font-size: 14px;
                    padding: 10px 15px;
                    color: rgb(0, 110, 255);
                    background-color: aliceblue;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .userinfo {
                    padding: 5px 10px;
                    color: rgb(0, 110, 255);
                    background-color: aliceblue;
                    border-radius: 5px;
                    line-height: 30px;
                    cursor: pointer;
                }
            }

            .Phonemenu {
                float: right;
                width: 40px;
                height: 40px;
                margin-top: 12px;
                color: #797979;
                display: none;
                cursor: pointer;
            }
        }
    }

}

/* 视口小于800 */
@media (max-width: 800px) {
    .HeaderBox {
        width: 100%;
        height: 60px;
        background: rgba(255, 255, 255, 0.603);
        backdrop-filter: saturate(5) blur(20px);
        box-shadow: 0 0 10px rgba(111, 113, 189, .0941176471);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;

        .HeaderBoxNeibox {
            width: calc(100% - 20px);
            height: 60px;
            max-width: 1200px;
            margin: 0 auto;

            .HeaderBoxNeiboxLogo {
                height: 40px;
                width: auto;
                float: left;
                margin-top: 10px;
            }

            .NavBox {
                height: 100vh;
                position: fixed;
                top: -100vh;
                left: 0px;
                opacity: 0;
                z-index: 99;
                transition: all 0.5s;
                background-color: rgb(255, 255, 255);
                width: 100%;
                overflow: hidden;

                .navitem {
                    text-decoration: none;
                    color: rgb(0, 0, 0);
                    font-size: 14px;
                    padding: 15px 15px;
                    width: calc(100% - 60px);
                    margin: 0 auto;
                    display: block;
                    border-bottom: 1px solid #f7f7f7;

                }
            }

            .UserBox {
                float: right;
                height: 100%;
                padding-top: 13px;
                margin-right: 20px;

                .loginbut {
                    font-size: 14px;
                    padding: 10px;
                    color: rgb(0, 110, 255);
                    background-color: aliceblue;
                    border-radius: 5px;

                }

                .userinfo {
                    padding: 5px 10px;
                    color: rgb(0, 110, 255);
                    background-color: rgb(255, 255, 255);
                    border-radius: 5px;
                    line-height: 30px;
                    cursor: pointer;
                    margin-top: -4px;
                }
            }

            .Phonemenu {
                float: right;
                width: 40px;
                height: 40px;
                margin-top: 12px;
                color: #797979;
                display: block;
                font-size: 28px;
                padding-top: 3px;
            }
        }
    }

}

.show {
    top: 62px !important;
    opacity: 1 !important;
}
</style>
