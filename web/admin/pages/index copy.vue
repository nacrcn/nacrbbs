<template>
    <div class="page">
        <!-- 侧边栏 -->
        <div :class="['sidebar', {
            'show': MobShow
        }]" @click="MobShow = false">
            <a-menu :default-open-keys="['0']" :default-selected-keys="[activeMenuKey]" class="sidebar-menu"
                @click.stop="">
                <div class="logo-container " v-if="!MobShow">
                    <img src="https://imgsbad.semoun.com/uploads/2025/03/19/67da24298292e.jpg" alt="Logo"
                        class="logo-image" />
                </div>

                <a-menu-item key="0" @click="gopage('/')">
                    <template #icon><icon-compass class="menu-icon" /></template>
                    数据概览
                </a-menu-item>

                <a-sub-menu key="1">
                    <template #icon><icon-apps class="menu-icon" /></template>
                    <template #title>用户管理</template>
                    <a-menu-item key="1_0" @click="gopage('/user')">用户列表</a-menu-item>
                    <a-menu-item key="1_2" @click="gopage('/user/group')">用户组管理</a-menu-item>
                </a-sub-menu>
                  <a-sub-menu key="3">
                    <template #icon><icon-apps class="menu-icon" /></template>
                    <template #title>支付配置</template>
                    <a-menu-item key="3_1" @click="gopage('/user')">订单记录</a-menu-item>
                    <a-menu-item key="3_2" @click="gopage('/user')">支付方式</a-menu-item>
                    <a-menu-item key="3_3" @click="gopage('/user')">支付配置</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="2">
                    <template #icon><icon-apps class="menu-icon" /></template>
                    <template #title>站点管理</template>
                    <a-menu-item key="2_0" @click="gopage('/webs')">基础管理</a-menu-item>
                    <a-menu-item key="2_3" @click="gopage('/webs/email/config')">邮件配置</a-menu-item>
                    <a-menu-item key="2_1" @click="gopage('/webs/notices')">公告管理</a-menu-item>
                    <a-menu-item key="2_2" @click="gopage('/webs/swipers')">轮播图管理</a-menu-item>
                </a-sub-menu>

            </a-menu>


        </div>

        <!-- 主内容区 -->
        <div class="main-content">
            <!-- 顶部导航栏 -->
            <div class="header">
                <div class="header-left">
                    <a-space>
                        <a-button @click="MobShow = !MobShow" class="MobShow" shape="circle">
                            <icon-menu v-if="!MobShow" />
                            <icon-close v-else />
                        </a-button>
                        <h2 class="page-title">
                            <!-- <span class="welcome-text">欢迎回来，管理员</span> -->
                        </h2>
                    </a-space>


                </div>

                <div class="header-right">
                    <a-space>
                        <a-button class="action-btn" shape="circle">
                            <icon-skin />
                        </a-button>

                        <a-dropdown trigger="click" position="br">
                            <div class="user-dropdown">
                                <a-avatar :size="30" class="user-avatar">
                                    <span>Cpen X</span>
                                </a-avatar>
                                <span class="user-name-display">Cpen X</span>
                                <icon-down />
                            </div>
                            <template #content>
                                <a-doption @click="gopage('/my')">
                                    <template #icon><icon-user /></template>
                                    个人中心
                                </a-doption>
                                <a-doption>
                                    <template #icon><icon-settings /></template>
                                    账户设置
                                </a-doption>
                                <a-divider style="margin: 4px 0" />
                                <a-doption>
                                    <template #icon><icon-export /></template>
                                    退出登录
                                </a-doption>
                            </template>
                        </a-dropdown>
                    </a-space>
                </div>
            </div>

            <!-- 页面内容 -->
            <div class="page-container">
                <NuxtPage />
            </div>

            <!-- 页脚 -->
            <div class="footer">
                <div class="footer-content">
                    <p class="copyright">
                        CansCode ⓒ Cpen X Copyright 2023-2029
                    </p>
                    <div class="footer-links">

                    </div>
                </div>
            </div>
        </div>

        <!-- 抽屉 -->
        <!-- <div class="drawer">
             <div class="Niebox">

             </div>
        </div> -->
    </div>
</template>

<script setup>
const MobShow = ref(false)

const gopage = (path) => {
    navigateTo(path)
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    background-color: #f8f8f8;

    .sidebar {
        height: 100%;
        width: 200px;

        .sidebar-menu {
            height: 100%;

            .logo-image {
                height: 40px;
                display: block;
                margin: 10px auto;
            }
        }
    }

    .main-content {
        width: calc(100% - 200px);

        .header {
            position: relative;
            width: 100%;
            padding: 20px 20px;
            width: calc(100% - 40px);
            background-color: #fff;

            .header-right {
                position: absolute;
                top: 10px;
                right: 20px;

                .user-dropdown {
                    padding: 5px 10px;
                    background-color: aliceblue;
                    border-radius: 10px;

                    .user-name-display {
                        margin-left: 10px;
                        margin-right: 10px;
                        font-weight: 800;
                    }
                }
            }
        }

        .page-container {
            width: 100%;
            height: calc(100vh - 110px);
            background-color: #f8f8f8;
            margin-top: 2px;
        }


        .footer {
            background-color: #fff;
            height: 50px;
            line-height: 50px;
            color: #414141;
            padding-left: 10px;
        }
    }
}

.drawer {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 60px;
    right: 0;
    background-color: #42424207;
    backdrop-filter: blur(10px);

    .Niebox {
        width: 400px;
        background-color: #fff;
        height: 100%;
    }
}

/* 视口大于728 */
@media (min-width: 728px) {
    .MobShow {
        display: none;
    }
}

/* 视口小于728 */
@media (max-width: 728px) {
    .page {
        width: 100%;
        height: 100vh;
        position: relative;
        overflow: hidden;
        display: flex;

        .sidebar {
            height: 100%;
            width: 100%;
            position: fixed;
            top: 60px;
            left: 0;
            background-color: #42424213;
            backdrop-filter: blur(10px);
            z-index: -1;
            opacity: 0;
            color: red;

            .sidebar-menu {
                height: 100%;
                width: 0%;
                overflow: hidden;
            }
        }

        .main-content {
            width: calc(100%);

            .header {
                position: relative;
                width: 100%;
                padding: 14px 10px;
                width: calc(100% - 20px);

                .header-left {
                    height: 30px;

                    .MobShow {
                        display: block !important;
                    }
                }

                .header-right {
                    position: absolute;
                    top: 9px;
                    right: 10px;

                    .user-dropdown {
                        padding: 5px 10px;
                        background-color: rgb(243, 243, 243);
                        border-radius: 10px;

                        .user-name-display {
                            margin-left: 5px;
                            margin-right: 5px;
                            font-weight: 800;
                            font-size: 14px;
                        }
                    }
                }
            }

            .page-container {
                width: 100%;
                height: calc(100vh - 110px);
            }

            .footer {
                background-color: #fff;
                height: 50px;
                line-height: 50px;
                color: #414141;
                padding-left: 10px;
                text-align: center;
                font-size: 12px;
            }
        }
    }

    .show {
        z-index: 122 !important;
        opacity: 1 !important;

        .sidebar-menu {
            width: 50% !important;
        }
    }

}
</style>