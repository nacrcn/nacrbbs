<template>
    <div class="Pageas">
        <!-- 动态背景装饰 -->
        <div class="bg-decoration">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>

        <div class="PageContent">
            <div class="ConBox">

                <div class="TopBox">
                    <div class="Image">
                        <img :src="Info.n_image" alt="新闻资讯缩略图">

                    </div>
                    <div class="Info">
                        <h1>{{ Info.n_name }}</h1>
                        <h3 class="desc">{{ Info.n_desc }}</h3>
                        <p class="desc">{{ Info.n_time }}

                        <p class="n_read"><icon-eye />{{ Info.n_read }}</p>

                        </p>
                    </div>
                </div>

                <div class="ContentBox">
                    <RichHtml :html="Info.n_html"></RichHtml>
                </div>
            </div>
            <div class="RegtBox">
                <div class="moreTools">
                    <p class="title">更多推荐</p>
                    <ApiItemHeng v-for="value in toolList" :key="value.id" :Info="value"></ApiItemHeng>
                </div>
                <div class="moreTools">
                    <p class="title">热门文章</p>
                    <NoticeItem v-for="value in noticeList" :key="value.id" :Info="value"></NoticeItem>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const route = useRoute()
const id = route.params.id
const SiteConfig = useSiteConfig()



/* 获取工具列表 */
const Info = ref({})
const res = await useApiFetch().post('/api/noticeList', {
    id: id
})
if (res.code == 200) {
    Info.value = res.data
} else {
    Message.error(res.msg)
}
useSeoSet({
    title: Info.value.n_name + '-' + SiteConfig.$state.Config.n_web_title,
    description: Info.value.n_desc,
    keywords: Info.value.n_keys,
    image: Info.value.n_image,
    icon: Info.value.n_image
})
const toolList = ref([])
const Form = ref({
    page: 1,
    pageSize: 10,
    search: '',
    total: 0
})
const GetTools = await useApiFetch().post('/api/GetTools', Form.value)
if (GetTools.code == 200) {
    toolList.value = GetTools.data
    Form.value.total = GetTools.total
} else {
    Message.error(GetTools.msg)
}


/* 获取文章列表 noticeList */

const noticeList = ref([])

const getnoticeList = await useApiFetch().post('/api/noticeList', Form.value)
if (getnoticeList.code == 200) {
    noticeList.value = getnoticeList.data
} else {
    Message.error(getnoticeList.msg)
}

</script>

<style lang="scss" scoped>
/* 视口大于768px */
@media (min-width: 768px) {
   .Pageas {
    width: calc(100%);
    height: calc(100%);
    position: relative;

    .PageContent {
        width: 100%;
        padding: 80px 0px 30px;
        position: relative;
        z-index: 12;
        max-width: 1280px;
        margin: 0 auto;
        display: flex;

        .RegtBox {
            width: 360px;
            margin-left: 10px;

            .moreTools {
                width: calc(100% - 40px);
                padding: 20px;
                border-radius: 20px;
                background-color: #fff;
                position: relative;
                overflow: hidden;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 10px;
                margin-bottom: 10px;

                .title {
                    text-align: center;
                    font-size: 16px;
                    font-weight: 600;
                }
            }
        }

        .ConBox {
            width: calc(100% - 330px);
            padding: 15px;
            border-radius: 20px;
            background-color: #fff;

            .ContentBox {
                /* 子元素css禁止渗透 */
                overflow: hidden;
                margin-top: 20px;
            }

            .TopBox {
                width: calc(100%);
                background-color: #fff;
                position: relative;
                overflow: hidden;
                display: flex;
                border-bottom: 1px solid #f3f3f3;


                .Image {
                    width: 80px;
                    height: 80px;
                    border-radius: 15px;
                    overflow: hidden;
                    margin-bottom: 10px;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .Info {
                    margin-left: 10px;
                    width: calc(100% - 70px);

                    h1 {
                        font-size: 16px;
                        font-weight: 800;
                        line-height: 20px;
                        margin: 0;
                        margin-top: 8px;
                    }

                    .desc {
                        font-size: 12px;
                        color: #555555;
                        margin: 10px auto;
                        font-weight: 400;
                    }

                    .n_read {
                        position: absolute;
                        bottom: 10px;
                        font-size: 12px;
                        right: 10px;
                        color: #555555;
                    }
                }


            }

        }
    }

    
}
}

/* 视口小于768px */
@media (max-width: 768px) {
    .Pageas {
    width: calc(100%);
    height: calc(100%);
    position: relative;

    .PageContent {
        width: 100%;
        padding: 80px 0px 30px;
        position: relative;
        z-index: 12;
        max-width: 1280px;
        margin: 0 auto;

        .RegtBox {
            width: calc(100% - 20px);
            margin: 10px auto;
            .moreTools {
                width: calc(100% - 40px);
                padding: 20px;
                border-radius: 20px;
                background-color: #fff;
                position: relative;
                overflow: hidden;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 10px;
                margin-bottom: 10px;

                .title {
                    text-align: center;
                    font-size: 16px;
                    font-weight: 600;
                }
            }
        }

        .ConBox {
            width: calc(100% - 40px);
            padding: 15px;
            border-radius: 20px;
            background-color: #fff;
            margin: 0px auto;
            .ContentBox {
                /* 子元素css禁止渗透 */
                overflow: hidden;
                margin-top: 20px;
            }

            .TopBox {
                width: calc(100%);
                background-color: #fff;
                position: relative;
                overflow: hidden;
                display: flex;
                border-bottom: 1px solid #f3f3f3;


                .Image {
                    width: 80px;
                    height: 80px;
                    border-radius: 15px;
                    overflow: hidden;
                    margin-bottom: 10px;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .Info {
                    margin-left: 10px;
                    width: calc(100% - 70px);

                    h1 {
                        font-size: 16px;
                        font-weight: 800;
                        line-height: 20px;
                        margin: 0;
                        margin-top: 8px;
                    }

                    .desc {
                        font-size: 12px;
                        color: #555555;
                        margin: 10px auto;
                        font-weight: 400;
                    }

                    .n_read {
                        position: absolute;
                        bottom: 10px;
                        font-size: 12px;
                        right: 10px;
                        color: #555555;
                    }
                }


            }

        }
    }

    
}
}

</style>
