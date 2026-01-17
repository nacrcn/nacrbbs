<template>
    <div class="MainBox">
        <div class="Left">
            <div class="MainContent" :style="{
                backgroundImage: `url(${Info.n_icon || '/default-banner.jpg'})`
            }">

                <div class="ThreadInfo">
                    <!-- 顶部信息 -->
                    <div class="TopBoxbACS">

                    </div>
                    <div class="TopBox">
                        <div class="Icon">
                            <img :src="Info.n_icon" alt="">
                        </div>
                        <div class="Info">
                            <h1>{{ Info.n_name }}</h1>
                            <p>{{ Info.n_note }}</p>
                            <a-space wrap class="Category">
                                <div class="Tag">
                                    <span>贴子：{{ Info.n_threads }}</span>
                                </div>
                                <div class="Tag">
                                    <span>热度：{{ Info.n_hotnum }}</span>
                                </div>
                            </a-space>
                        </div>
                    </div>

                    <!-- 按钮部分 -->
                    <div class="ButtonSection">
                        <a-button>
                            <template #icon>
                                <icon-more />
                            </template>
                        </a-button>
                    </div>
                </div>

            </div>
            <div class="NavLisbox">
                <div :class="['Item', { active: active === 1 }]" @click="active = 1">
                    <span>最新帖子</span>
                </div>
                <div :class="['Item', { active: active === 2 }]" @click="active = 2">
                    <span>热门帖子</span>
                </div>
                <div :class="['Item', { active: active === 3 }]" @click="active = 3">
                    <span>图片</span>
                </div>
                <div :class="['Item', { active: active === 4 }]" @click="active = 4">
                    <span>视频</span>
                </div>
                <div :class="['Item', { active: active === 5 }]" @click="active = 5">
                    <span>悬赏贴</span>
                </div>
            </div>
            <div class="threads">
                <div class="content-box">
                    <ItemA v-for="value in ThreadsList" :key="value.id" :data="value"></ItemA>
                </div>
                 <div class="Isno" style="  width: 100%;
                background-color: #fff;
                border-radius: 10px;" v-if="ThreadsList.length == 0">
                <a-result :status="null" title="无内容" subtitle="哎呀，没有内容了">
                    <template #icon>
                        <IconFaceSmileFill />
                    </template>
                </a-result>
            </div>
                <div class="PageNav">
                    <a-pagination @change="GetThreads" @page-size-change="GetThreads" v-model:current="from.page"
                        v-model:pageSize="from.pagesize" :total="from.total" size="mini" show-total />
                </div>
            </div>

        </div>
        <div class="Right">
            <div class="UserInfo">

            </div>
            <div class="NavBar">
                <div class="title">
                    <img src="/assets/1.png" alt="">
                    <span>热门话题</span>
                </div>
                <TopicItem v-for="value in TopicList" :key="value.n_name" :data="value"></TopicItem>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const route = useRoute()
const id = route.params.id
const active = ref(1)


const Info = ref({})
const res = await useApiSsr('GetCategoryInfo' + id, '/api/GetCategory', {
    id: id
})
if (res.code === 200) {
    Info.value = res.data
} else {
    navigateTo('/tools/error')
}


/* 获取文章列表 GetThreads */
const ThreadsList = ref([])
const from = ref({
    page: 1,
    pagesize: 10,
    total: 0,
    cidt: id,

})
const GetThreads = async () => {
    try {
        const res = await useApiFetch().post('/api/GetThreads', from.value)
        if (res.code == 200) {
            ThreadsList.value = res.data
            from.value.total = res.total
        } else {
            Message.error(res.message || '获取文章列表失败')
        }
    } catch (error) {
        Message.error(error.message)
    }
}




/* 获取话题列表 */
const TopicList = ref([])
const GetTopicList = async () => {
    try {
        const res = await useApiFetch().post('/api/GetCategory', {
            type: 2
        })
        if (res.code == 200) {
            TopicList.value = res.data
        } else {
            Message.error(res.message || '获取分类列表失败')
        }

    } catch (error) {
        Message.error(error.message)
    }
}
onMounted(() => {
    GetTopicList()
    GetThreads()
})
</script>


<style lang="scss" scoped>
.title {
    display: flex;
    line-height: 30px;
    gap: 4px;
    margin-bottom: 10px;

    img {
        width: 20px;
        height: 20px;
        margin: 5px;
    }
}

/* 视口大于768px时的样式 */
@media (min-width: 768px) {
    .MainBox {
        width: 100%;
        display: flex;
        height: 100%;

        .Left {
            width: calc(100% - 300px);
            margin: 0 auto;
            overflow-y: auto;
            height: calc(100vh - 70px);

            /* 隐藏滚动条 */
            &::-webkit-scrollbar {
                display: none;
            }

            .MainContent {
                background-color: #fff;
                border-radius: 10px;
                margin-bottom: 10px;
                background-repeat: no-repeat;
                background-size: 100%;
                background-position: center;
                backdrop-filter: blur(10px);
                overflow: hidden;

                .ThreadInfo {
                    position: relative;

                    .TopBoxbACS {
                        width: 100%;
                        height: 100px;
                        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(255, 255, 255) 100%);
                    }

                    .TopBox {
                        display: flex;
                        gap: 10px;
                        width: calc(100% - 40px);
                        padding: 20px;
                        /* back */
                        background-color: #fff;

                        .Icon {
                            width: 100px;
                            height: 100px;

                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 10px;

                            }
                        }
                    }

                    h1 {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 10px;
                        margin-top: 5px;
                    }

                    .Category {
                        margin-top: 10px;

                        .Tag {
                            border-radius: 20px;
                            padding: 5px 10px;
                            font-size: 12px;
                            background-color: #ecf7fc;
                            display: inline-block;
                            color: #1890ff;
                        }
                    }


                    .User {
                        display: flex;
                        align-items: center;
                        gap: 5px;

                        img {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                        }

                        span {
                            font-size: 12px;
                            color: #444;
                            line-height: 20px;
                        }
                    }

                    .Time {
                        font-size: 12px;
                        color: #444;
                        line-height: 20px;
                    }

                    .ButtonSection {
                        position: absolute;
                        right: 20px;
                        top: 20px;
                    }
                }

                .CommentSection {
                    padding-top: 10px;
                    margin-top: 10px;
                    border-top: 1px solid #ebeff3;
                    display: flex;
                    justify-content: center;

                    .Item {
                        padding: 10px 30px;
                        text-align: center;
                        margin: 5px;
                        border-radius: 100px;

                        &:hover {
                            background-color: #f0f0f0;
                            cursor: pointer;
                        }

                        .icon {
                            font-size: 25px;
                            color: #666;
                            margin-bottom: 5px;
                        }

                        span {
                            display: block;
                            color: #666;
                        }
                    }
                }
            }


            .threads {
                border-radius: 10px;
                margin-bottom: 10px;



                .content-box {
                    width: calc(100%);
                    margin-top: 10px;
                    column-count: 2;
                    column-gap: 10px;

                    :deep(.Itemlist) {
                        break-inside: avoid;
                        margin-bottom: 10px;
                    }
                }

                .PageNav {
                    width: calc(100% - 20px);
                    margin-top: 10px;
                    display: flex;
                    padding: 10px;
                    border-radius: 10px;
                    background-color: #fff;
                    justify-content: center;
                }
            }


            .NavLisbox {
                padding: 10px 20px;
                background-color: #fff;
                border-radius: 10px;
                margin-bottom: 10px;
                white-space: nowrap;
                overflow-x: auto;

                .Item {
                    display: inline-block;
                    line-height: 30px;
                    padding: 10px 0;
                    cursor: pointer;
                    color: #888888;
                    margin-right: 20px;

                    .icon {
                        width: 17px;
                        height: 17px;
                        margin-right: 10px;
                        display: inline-block;
                        margin-top: 6.5px;
                    }

                }

                .active {
                    color: rgb(0, 209, 129);
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        left: 15px;
                        bottom: 1px;
                        width: calc(100% - 30px);
                        height: 5px;

                        background-color: rgb(0, 209, 129);
                    }

                    p {
                        color: rgb(0, 209, 129);
                    }
                }
            }
        }

        .Right {
            margin-left: 10px;
            width: 300px;

            // background-color: #fff;
            .UserInfo {
                border-radius: 10px;
                background-color: #fff;
                overflow: hidden;

                .UserBack {
                    width: 100%;
                    height: 150px;
                    background-size: cover;
                    background-position: center;
                }

                img {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    margin: 0 auto;
                    margin-top: -35px;
                    border: 2px solid #fff;
                    display: block;
                }

                .nickname {
                    text-align: center;
                    font-size: 15px;
                    color: #333;
                    margin-top: 10px;
                }

                .UserDetail {
                    display: flex;
                    gap: 10px;
                    padding: 10px;
                    margin-top: 10px;
                    background-color: #f5f9fc;
                    border-radius: 10px;
                    width: calc(100% - 40px);
                    margin: 10px;
                    justify-content: center;

                    .Item {
                        text-align: center;
                        width: 100%;

                        .Value {
                            font-size: 14px;
                            color: #333;
                        }

                        .Label {
                            font-size: 12px;
                            color: #666;
                            margin-top: 7px;
                        }
                    }
                }
            }

            .NavBar {
                width: calc(100% - 20px);
                padding: 10px 10px;
                border-radius: 10px;
                background-color: #fff;
                margin-top: 10px;

                .Item {
                    width: calc(100% - 20px);
                    padding: 10px 0;
                    cursor: pointer;

                    p {
                        font-size: 16px;
                        color: #333;
                    }
                }
            }
        }
    }
}

/* 视口小于768px时的样式 */
@media (max-width: 768px) {
   .MainBox {
        width: 100%;
        height: 100%;

        .Left {
            width: calc(100% );
            margin: 0 auto;
            overflow-y: auto;
            height: calc(100vh - 70px);

            /* 隐藏滚动条 */
            &::-webkit-scrollbar {
                display: none;
            }

            .MainContent {
                background-color: #fff;
                border-radius: 10px;
                margin-bottom: 10px;
                background-repeat: no-repeat;
                background-size: 100%;
                background-position: center;
                backdrop-filter: blur(10px);
                overflow: hidden;

                .ThreadInfo {
                    position: relative;

                    .TopBoxbACS {
                        width: 100%;
                        height: 100px;
                        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(255, 255, 255) 100%);
                    }

                    .TopBox {
                        display: flex;
                        gap: 10px;
                        width: calc(100% - 40px);
                        padding: 20px;
                        /* back */
                        background-color: #fff;

                        .Icon {
                            width: 100px;
                            height: 100px;

                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 10px;

                            }
                        }
                    }

                    h1 {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 10px;
                        margin-top: 5px;
                    }

                    .Category {
                        margin-top: 10px;

                        .Tag {
                            border-radius: 20px;
                            padding: 5px 10px;
                            font-size: 12px;
                            background-color: #ecf7fc;
                            display: inline-block;
                            color: #1890ff;
                        }
                    }


                    .User {
                        display: flex;
                        align-items: center;
                        gap: 5px;

                        img {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                        }

                        span {
                            font-size: 12px;
                            color: #444;
                            line-height: 20px;
                        }
                    }

                    .Time {
                        font-size: 12px;
                        color: #444;
                        line-height: 20px;
                    }

                    .ButtonSection {
                        position: absolute;
                        right: 20px;
                        top: 20px;
                    }
                }

                .CommentSection {
                    padding-top: 10px;
                    margin-top: 10px;
                    border-top: 1px solid #ebeff3;
                    display: flex;
                    justify-content: center;

                    .Item {
                        padding: 10px 30px;
                        text-align: center;
                        margin: 5px;
                        border-radius: 100px;

                        &:hover {
                            background-color: #f0f0f0;
                            cursor: pointer;
                        }

                        .icon {
                            font-size: 25px;
                            color: #666;
                            margin-bottom: 5px;
                        }

                        span {
                            display: block;
                            color: #666;
                        }
                    }
                }
            }


            .threads {
                border-radius: 10px;
                margin-bottom: 10px;



                .content-box {
                    width: calc(100%);
                    margin-top: 10px;
                    column-count: 1;
                    column-gap: 10px;

                    :deep(.Itemlist) {
                        break-inside: avoid;
                        margin-bottom: 10px;
                    }
                }

                .PageNav {
                    width: calc(100% - 20px);
                    margin-top: 10px;
                    display: flex;
                    padding: 10px;
                    border-radius: 10px;
                    background-color: #fff;
                    justify-content: center;
                }
            }


            .NavLisbox {
                padding: 10px 20px;
                background-color: #fff;
                border-radius: 10px;
                margin-bottom: 10px;
                white-space: nowrap;
                overflow-x: auto;

                .Item {
                    display: inline-block;
                    line-height: 30px;
                    padding: 10px 0;
                    cursor: pointer;
                    color: #888888;
                    margin-right: 20px;

                    .icon {
                        width: 17px;
                        height: 17px;
                        margin-right: 10px;
                        display: inline-block;
                        margin-top: 6.5px;
                    }

                }

                .active {
                    color: rgb(0, 209, 129);
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        left: 15px;
                        bottom: 1px;
                        width: calc(100% - 30px);
                        height: 5px;

                        background-color: rgb(0, 209, 129);
                    }

                    p {
                        color: rgb(0, 209, 129);
                    }
                }
            }
        }

        .Right {
            width: 100%;

            // background-color: #fff;
            .UserInfo {
                border-radius: 10px;
                background-color: #fff;
                overflow: hidden;

                .UserBack {
                    width: 100%;
                    height: 150px;
                    background-size: cover;
                    background-position: center;
                }

                img {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    margin: 0 auto;
                    margin-top: -35px;
                    border: 2px solid #fff;
                    display: block;
                }

                .nickname {
                    text-align: center;
                    font-size: 15px;
                    color: #333;
                    margin-top: 10px;
                }

                .UserDetail {
                    display: flex;
                    gap: 10px;
                    padding: 10px;
                    margin-top: 10px;
                    background-color: #f5f9fc;
                    border-radius: 10px;
                    width: calc(100% - 40px);
                    margin: 10px;
                    justify-content: center;

                    .Item {
                        text-align: center;
                        width: 100%;

                        .Value {
                            font-size: 14px;
                            color: #333;
                        }

                        .Label {
                            font-size: 12px;
                            color: #666;
                            margin-top: 7px;
                        }
                    }
                }
            }

            .NavBar {
                width: calc(100% - 20px);
                padding: 10px 10px;
                border-radius: 10px;
                background-color: #fff;
                margin-top: 10px;

                .Item {
                    width: calc(100% - 20px);
                    padding: 10px 0;
                    cursor: pointer;

                    p {
                        font-size: 16px;
                        color: #333;
                    }
                }
            }
        }
    }
}
</style>