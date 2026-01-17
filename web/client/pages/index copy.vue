<template>
    <div class="page">
        <div class="bg-decoration">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>

        <div class="layout">
            <div class="headerBox">
                <div class="header">
                    <div class="menu-btn" @click="MobShow = !MobShow">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <img class="logo" @click="navigateTo('/')" src="/assets/logo.png" alt="">
                    <div class="NavBox">
                        <NuxtLink class="nav-link" to="/">首页</NuxtLink>

                    </div>
                </div>
                <div class="Icon">
                    <a-space :size="20">
                        <a-badge :count="9">
                            <a-button shape="circle">
                                <template #icon>
                                    <icon-message />
                                </template>
                            </a-button>
                        </a-badge>
                    </a-space>

                </div>
                <div class="user" @click="GoUser()">
                    <img class="avatar" :src="UserInfo.$state.UserInfo?.n_avatar" alt="">
                    <span class="nickname">{{ UserInfo.$state.UserInfo?.n_nickname }}</span>
                </div>
            </div>
            <!-- 侧边栏 -->
            <div class="sidebar" :class="{ 'show': MobShow }">
                <div class="sidebar-content">
                    <img class="logo" @click="navigateTo('/')" src="/assets/logo.png" alt="">
                    <div class="sidebar-close" @click="MobShow = false">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="sidebar-nav">
                        <NuxtLink class="sidebar-link" to="/" @click="MobShow = false">首页</NuxtLink>
                    </div>
                </div>
            </div>
            <div class="sidebar-overlay" :style="{
                opacity: MobShow ? 0.5 : 0
            }" @click="MobShow = false" v-if="MobShow"></div>
            <!-- 页面内容 -->
            <div class="page-container">

                <div class="main-content">
                    <div class="content">
                        <NuxtPage />
                    </div>
                    <Tabbar></Tabbar>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
const UserInfo = useUserInfo()
UserInfo.init()

const MobShow = ref(false)

const GoUser = () => {
    if (UserInfo.$state.UserInfo.id) {
        navigateTo('/user/home')
    } else {
        navigateTo('/login')
    }
}



</script>

<style lang="scss" scoped>
/* 视口大于728 */
@media (min-width: 728px) {
    .page {
        width: 100%;
        height: calc(100vh);
        position: relative;
        overflow: hidden;
        background-color: #f8f8f8;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);

        .bg-decoration {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;

            .circle {
                position: absolute;
                border-radius: 50%;
                opacity: 0.3;
                filter: blur(80px);
                animation: float 5s ease-in-out infinite;

                &.circle-1 {
                    width: 600px;
                    height: 600px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    top: -200px;
                    right: -100px;
                    animation-delay: 0s;
                }

                &.circle-2 {
                    width: 500px;
                    height: 500px;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    top: -150px;
                    left: -100px;
                    animation-delay: -5s;
                }

                &.circle-3 {
                    width: 400px;
                    height: 400px;
                    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation-delay: -10s;
                }
            }
        }

        .layout {
            width: calc(100%);
            margin: 0 auto;
            overflow: hidden;

            .headerBox {
                display: flex;
                position: fixed;
                top: 10px;
                z-index: 1000;
                max-width: 1280px;
                width: calc(100% - 20px);
                left: calc(50% - 640px);
                background-color: #ffffff;
                border-radius: 10px;

                .header {
                    width: calc(100% - 170px);
                    padding: 5px 10px;
                    border-radius: 10px;
                    height: 40px;
                    line-height: 20px;
                    display: flex;
                    backdrop-filter: blur(10px);


                    .logo {
                        height: 35px;
                        margin-top: 2.5px;
                        cursor: pointer;
                    }

                    .menu-btn {
                        display: none;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 30px;
                        height: 40px;
                        cursor: pointer;
                        margin-right: 10px;

                        span {
                            width: 20px;
                            height: 2px;
                            background-color: #414141;
                            margin: 3px 0;
                            transition: all 0.3s;
                        }
                    }


                    .NavBox {
                        height: 40px;
                        line-height: 40px;
                        margin-left: 20px;
                        display: flex;
                        gap: 20px;

                        .nav-link {
                            color: #414141;
                        }
                    }
                }

                .Icon {
                    padding: 5px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                }

                .user {
                    width: calc(150px - 40px);
                    padding: 5px 20px;
                    border-radius: 10px;
                    height: 40px;
                    line-height: 20px;
                    margin-left: 10px;
                    display: flex;
                    line-height: 40px;
                    justify-content: center;
                    cursor: pointer;

                    .avatar {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin-top: 5px;

                    }

                    .nickname {
                        margin-left: 10px;
                        color: #414141;
                        font-size: 14px;
                    }
                }

            }

            .page-container {
                width: calc(100%);
                overflow: hidden;

                .main-content {
                    width: 100%;
                    overflow: hidden;

                    .content {
                        // background-color: #fff;
                        overflow: hidden;
                        margin-bottom: 20px;
                        height: calc(100vh);
                    }
                }
            }
        }
    }

    .sidebar {
        display: none;
    }

}

/* 视口小于728 */
@media (max-width: 728px) {
    .page {
        width: 100%;
        height: calc(100vh);
        position: relative;
        overflow: hidden;
        overflow-y: auto;
        background-color: #f8f8f8;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);


        .layout {
            width: calc(100%);
            margin: 0 auto;
            overflow: hidden;

            .headerBox {
                display: flex;
                position: fixed;
                top: 10px;
                z-index: 1000;
                max-width: 1280px;
                width: calc(100% - 20px);
                left: 50%;
                transform: translateX(-50%);
                background-color: #ffffff;
                border-radius: 10px;

                .header {
                    width: calc(100% - 120px);
                    padding: 5px 10px;
                    border-radius: 10px;
                    height: 40px;
                    line-height: 20px;
                    display: flex;
                    background-color: #ffffff93;
                    backdrop-filter: blur(10px);


                    .logo {
                        height: 35px;
                        margin-top: 2.5px;
                        cursor: pointer;
                    }

                    .NavBox {
                        display: none;
                        height: 40px;
                        line-height: 40px;
                        margin-left: 20px;
                        gap: 20px;

                        .nav-link {
                            color: #414141;
                        }
                    }

                    .menu-btn {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 30px;
                        height: 40px;
                        cursor: pointer;
                        margin-right: 10px;

                        span {
                            width: 20px;
                            height: 2px;
                            background-color: #414141;
                            margin: 3px 0;
                            transition: all 0.3s;
                        }
                    }

                    .welcome-text {
                        line-height: 30px;
                        margin-left: 10px;
                        background-color: #00c573;
                        border-radius: 20px;
                        height: 30px;
                        margin-top: 5px;
                        padding: 0 10px;
                        display: flex;

                        span {
                            margin-left: 4px;
                            color: #fff;
                        }

                        .icon {
                            color: #fff;
                            font-size: 20px;
                            margin-top: 5px;
                        }
                    }
                }

                .Icon {
                    display: none;
                }

                .user {
                    width: calc(100px);
                    padding: 5px 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    height: 40px;
                    line-height: 20px;
                    margin-left: 10px;
                    display: flex;
                    line-height: 40px;
                    justify-content: center;
                    cursor: pointer;
                    background-color: #ffffff93;
                    backdrop-filter: blur(10px);

                    .avatar {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin-top: 5px;

                    }

                    .nickname {
                        margin-left: 10px;
                        color: #414141;
                        font-size: 14px;
                    }
                }

            }

            .page-container {
                width: calc(100%);
                overflow: hidden;

                .main-content {
                    width: 100%;
                    overflow: hidden;

                    .content {
                        // background-color: #fff;
                        max-height: calc(100% - 190px);
                        overflow: hidden;
                    }


                }


            }

            .sidebar {
                position: fixed;
                top: 0;
                left: -280px;
                width: 280px;
                height: 100vh;
                background-color: #fff;
                z-index: 1001;
                transition: left 0.3s ease-in-out;
                box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

                &.show {
                    left: 0;

                    .sidebar-overlay {
                        opacity: 1;
                        pointer-events: auto;
                    }
                }



                .sidebar-content {
                    position: relative;
                    height: 100%;
                    padding: 20px;
                    overflow-y: auto;
                    z-index: 12;

                    .sidebar-close {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        span {
                            position: absolute;
                            width: 20px;
                            height: 2px;
                            background-color: #414141;
                            transition: all 0.3s;

                            &:first-child {
                                transform: rotate(45deg);
                            }

                            &:last-child {
                                transform: rotate(-45deg);
                            }
                        }

                        &:hover span {
                            background-color: #667eea;
                        }
                    }

                    .logo {
                        height: 30px;
                    }

                    .sidebar-nav {
                        margin-top: 20px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;

                        .sidebar-link {
                            padding: 15px 20px;
                            border-radius: 8px;
                            color: #414141;
                            text-decoration: none;
                            transition: all 0.3s;
                            font-size: 16px;

                            &:hover {
                                background-color: #f5f7fa;
                                color: #667eea;
                            }

                            &.router-link-active {
                                background-color: #667eea;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }




    }

    .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 222;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

}
</style>