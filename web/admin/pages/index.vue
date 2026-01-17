<template>
    <div class="page">
        <div :class="['sidebar', {
            'show': MobShow
        }]" @click="MobShow = false">

            <div class="leftBox">
                <div class="ItemBox">
                    <div class="TopBox">
                        <img src="/assets/logo2.png" alt="">
                    </div>
                    <div :class="['Item', { ItemShow: currentPage.TopNav == value.id }]" v-for="value in TopNav"
                        @click="getSecondNav(value)">
                        <icon-compass class="menu-icon" />
                        <p class="menu-text">{{ value.n_name }}</p>
                    </div>

                </div>
            </div>

            <div :class="['rightBox', { 'show': SecondNavShow }]">
                <div class="ItemBox">
                    <div class="TopBox">
                        <!-- <p>{{currentPage.TopNavInfo.n_name}}</p> -->
                        Nacr 后台管理系统
                    </div>
                    <div :class="['Item', { ItemShow: currentPage.SecondNav == value.id }]" v-for="value in SecondNav"
                        @click="gopage(value)">
                        <p class="menu-text">{{ value.n_name }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 主内容区 -->
        <div :class="['main-content', {
            main_content_width: SecondNavShow
        }]">
            <!-- 顶部导航栏 -->
            <div class="header">
                <div class="header-left">
                    <a-space>
                        <a-button @click="MobShow = !MobShow" class="MobShow" shape="circle">
                            <icon-menu v-if="!MobShow" />
                            <icon-close v-else />
                        </a-button>
                        <h2 class="page-title">
                            <a-breadcrumb>
                                <!-- <a-breadcrumb-item >Home</a-breadcrumb-item> -->
                                <a-breadcrumb-item @click="gopage(item)" v-for="item in currentPath">{{ item.n_name
                                    }}</a-breadcrumb-item>
                            </a-breadcrumb>
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
                        Nacr ⓒ Nacr Copyright 2023-2029
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
const SecondNavShow = ref(false)
const currentPath = ref([])

/* 当前页面 */
const currentPage = ref({
    TopNav: '',
    SecondNav: '',
    TopNavInfo: {}
})

/* 获取顶级导航 */
const TopNav = ref([])
const getTopNav = async () => {
    const res = await useApiFetch().post('/api/getNavList', { fid: 0 })
    if (res.code == 200) {
        TopNav.value = res.data
        currentPage.value.TopNav = TopNav.value[0].id
        if (currentPage.value.TopNavInfo.id) {
            getSecondNav(currentPage.value.TopNavInfo, false)
        } else {
            getSecondNav(TopNav.value[0], false)
        }
    }
}


/* 获取二级导航 */
const SecondNav = ref([])
const getSecondNav = async (info, type = true) => {
    currentPage.value.TopNavInfo = info
    currentPage.value.TopNav = info.id
    const res = await useApiFetch().post('/api/getNavList', { fid: currentPage.value.TopNav })
    if (res.code == 200) {
        SecondNav.value = res.data
        if (SecondNav.value.length > 0) {
            SecondNavShow.value = true
            gopage(SecondNav.value[0], type)
            currentPage.value.SecondNav = SecondNav.value[0].id
        } else {
            SecondNavShow.value = false
            gopage(info, type)
        }
    }
}

/* 切换页面 并改变页眉 */
const gopage = (info, type = true) => {

    if (!type) return false;

    currentPage.value.SecondNav = info.id
    if (info.n_type === '1') {
        currentPath.value = [...info.n_fid_list, { ...info, n_fid_list: [] }]
        if (!type) {
            return false;
        }
        navigateTo(info.n_path)
        useSeoSet({
            title: info.n_name + ' - Nacr 后台管理系统'
        })
    }

    /* 缓存配置文件 currentPage */
    localStorage.setItem('cpenx_config', JSON.stringify({
        currentPath: currentPath.value,
        currentPage: currentPage.value,
        SecondNavShow: SecondNavShow.value,
    }))

}


/* 尝试恢复缓存状态函数 */
const tryRecover = () => {
    if (localStorage.getItem('cpenx_config')) {
        const config = JSON.parse(localStorage.getItem('cpenx_config'))
        if (config.currentPath && config.currentPage) {
            currentPath.value = config.currentPath
            currentPage.value = config.currentPage
            SecondNavShow.value = config.SecondNavShow


            navigateTo(config.currentPath[config.currentPath.length - 1].n_path)
            useSeoSet({
                title: config.currentPath[config.currentPath.length - 1].n_name + ' - Cpen X 后台管理系统'
            })
            // getSecondNav(config.currentPath[config.currentPath.length - 1],false)
            getTopNav()
        } else {
            localStorage.removeItem('cpenx_config')
        }
    } else {
        getTopNav()
    }
}

onMounted(() => {
    tryRecover()

})

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
        display: flex;

        .leftBox {
            .ItemBox {
                width: 70px;
                background-color: #282c34;
                height: 100vh;

                .TopBox {
                    height: 60px;
                    overflow: hidden;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;


                    img {
                        width: calc(100% - 20px);
                        margin: 10px auto;
                        display: block;
                    }
                }

                .Item {
                    color: #fff;
                    text-align: center;
                    width: calc(100% - 20px);
                    margin: 0 auto;
                    border-radius: 3px;
                    padding: 10px 5px;
                    cursor: pointer;

                    &:hover {
                        background-color: rgb(22, 93, 255);
                    }

                    .menu-icon {
                        font-size: 20px;
                        width: 20px;
                        height: 20px;
                        margin-bottom: 10px;
                        display: block;
                        margin: 0 auto;
                    }

                    .menu-text {
                        font-size: 12px;
                        margin-top: 10px;
                    }
                }

                .ItemShow {
                    background-color: rgb(22, 93, 255);
                }
            }
        }

        .rightBox {
            width: 0px;
            opacity: 0;
            transition: all 0.3s;

            .ItemBox {
                width: 100%;
                background-color: #fff;
                height: 100vh;

                .TopBox {
                    height: 60px;
                    border-bottom: 1px solid #f0f0f0;
                    width: calc(100% - 20px);
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;

                }

                .Item {
                    color: #252525;
                    width: calc(100% - 30px);
                    margin: 0 auto;
                    border-radius: 3px;
                    padding: 15px 10px;
                    cursor: pointer;

                    &:hover {
                        background-color: #c9d9ff;
                    }

                    .menu-text {
                        font-size: 12px;
                    }
                }

                .ItemShow {
                    color: #fff;
                    background-color: rgb(22, 93, 255);
                }
            }
        }

        .show {
            width: 200px;
            opacity: 1;
        }


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
        width: calc(100% - 70px);
        transition: all 0.3s;

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
                    border-radius: 10px;
                    cursor: pointer;
                 
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

    .main_content_width {
        width: calc(100% - 270px);
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