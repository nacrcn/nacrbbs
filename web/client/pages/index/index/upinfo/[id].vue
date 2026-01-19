<template>
    <div class="Pageas">
        <div class="PageContent">
            <div class="UserInfo">
                <div class="TopBox">
                    <div class="TopBoxbACS" :style="{
                        backgroundImage: `url(${Users.n_userback || '/default-banner.jpg'})`
                    }">
                        <div class="BackgroundImage">
                        </div>
                    </div>

                    <div class="UserInfoBox">
                        <div class="TInfo">
                            <div class="n_avatar">
                                <img :src="Users.n_avatar" alt="">
                            </div>
                            <div class="UserInfos">
                                <p class="nickname">{{ Users.n_nickname }}</p>
                                <p class="signature">{{ Users.n_signature }}</p>
                                <!-- 关注按钮 -->
                                <div class="Follow" v-if="UserInfo.$state.UserInfo?.id !== Users.id">
                                    <a-button :loading="loading" @click.stop="LikeUser()"
                                        :class="['FollowBtn', { 'Close': Users.isLiked }]" type="primary">
                                        {{ Users.isLiked ? '取消关注' : '关注' }}
                                    </a-button>
                                </div>
                            </div>
                        </div>
                        <div class="stats">
                            <div class="Item">
                                <p class="Value">{{ Users?.posts || 0 }}</p>
                                <p class="Label">发帖数</p>
                            </div>
                            <div class="Item">
                                <p class="Value">{{ Users?.n_comment || 0 }}</p>
                                <p class="Label">评论数</p>
                            </div>
                            <div class="Item">
                                <p class="Value">{{ Users?.followers || 0 }}</p>
                                <p class="Label">粉丝数</p>
                            </div>
                            <div class="Item">
                                <p class="Value">{{ Users?.following || 0 }}</p>
                                <p class="Label">关注数</p>
                            </div>

                        </div>

                    </div>


                </div>
                <div class="NavBox">
                    <NavBox :Item="[
                        {
                            value: '1',
                            name: '他的帖子'
                        },
                        {
                            value: '2',
                            name: '他的评论'
                        }
                    ]" v-model:modelValue="ShowIndex"></NavBox>
                </div>
                <div v-if="ShowIndex === '1'">
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
                <div v-if="ShowIndex === '2'">
                    <div class="content-box">
                        <CommentItem v-for="value in CommentList" :key="value.id" :data="value"
                            @reload="GetCommentList"></CommentItem>
                    </div>
                    <div class="Isno" style="  width: 100%;
                background-color: #fff;
                border-radius: 10px;" v-if="CommentList.length == 0">
                        <a-result :status="null" title="无内容" subtitle="哎呀，没有内容了">
                            <template #icon>
                                <IconFaceSmileFill />
                            </template>
                        </a-result>
                    </div>
                    <div class="PageNav">
                        <a-pagination @change="GetCommentList" @page-size-change="GetCommentList"
                            v-model:current="GetCommentsFrom.page" v-model:pageSize="GetCommentsFrom.pagesize"
                            :total="GetCommentsFrom.total" size="mini" show-total />
                    </div>
                </div>
            </div>
            <div class="Right">
                <div class="NavBar">
                    <BoxTitle>热门圈子</BoxTitle>
                    <ClassItem v-for="value in CategoryList" :key="value.n_name" :data="value"></ClassItem>
                </div>
                <div class="NavBar">
                    <BoxTitle>热门话题</BoxTitle>
                    <TopicItem v-for="value in TopicList" :key="value.n_name" :data="value"></TopicItem>
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
const UserInfo = useUserInfo()
const Users = ref({})

/* 获取用户信息 GetUser */
const res = await useApiSsr('GetUser' + id, '/api/GetUser', {
    id: id
})
if (res.code == 200) {
    Users.value = res.data
} else {
    Message.error(res.message || '获取用户信息失败')
}

useSeoSet({
    title: Users.value.n_nickname + ' - ' + SiteConfig.$state.Config.n_web_title,
})
/* 获取分类列表 GetCategory */
const CategoryList = ref([])
const GetCategory = async () => {
    try {
        const res = await useApiFetch().post('/api/GetCategory')
        if (res.code == 200) {
            CategoryList.value = res.data
        } else {
            Message.error(res.message || '获取分类列表失败')
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

/* 获取文章列表 GetThreads */
const ThreadsList = ref([])
const from = ref({
    page: 1,
    pagesize: 10,
    total: 0,
    uid: id
})
const GetThreads = async () => {
    try {
        const res = await useApiFetch().post('/api/GetThreads', from.value)
        if (res.code == 200) {
            ThreadsList.value = res.data
            from.value.total = res.total
        } else {
        }
    } catch (error) {
        Message.error(error.message)
    }
}

/* 获取评论列表 */
const GetCommentsFrom = ref({
    page: 1,
    pagesize: 20,
    uid: id,
    total: 0
})
const CommentList = ref([])
const GetCommentList = async () => {
    try {
        const res = await useApiFetch().post('/api/GetComments', GetCommentsFrom.value)
        if (res.code == 200) {
            CommentList.value = res.data
            GetCommentsFrom.value.total = res.total
        } else {
        }
    } catch (error) {
        Message.error(error.message)
    }
}

onMounted(() => {
    GetCategory()
    GetTopicList()
    GetCommentList()
    GetThreads()
})


const ShowIndex = ref('1')
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
            position: relative;
            z-index: 12;
            max-width: 1280px;
            margin: 0 auto;
            display: flex;

            .UserInfo {
                width: calc(100% - 260px);

                .TopBox {
                    width: calc(100%);
                    border-radius: 10px;
                    background-color: #fff;
                    overflow: hidden;

                    .TopBoxbACS {
                        width: 100%;
                        height: 130px;
                        background-repeat: no-repeat;
                        background-size: 100%;
                        background-position: center;

                        .BackgroundImage {
                            width: calc(100%);
                            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(255, 255, 255) 100%);

                            height: 100%;
                        }
                    }
                }

                .UserInfoBox {
                    width: calc(100% - 30px);
                    padding: 15px;
                    position: relative;

                    .TInfo {
                        display: flex;

                        .n_avatar {
                            width: 80px;
                            height: 80px;
                            margin-top: -20px;

                            img {
                                width: 100%;
                                border: 5px solid #fff;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }

                        .UserInfos {
                            margin-left: 10px;
                            position: relative;
                            width: calc(100% - 90px);

                            .nickname {
                                font-weight: 800;
                                font-size: 19px;
                            }

                            .signature {
                                margin-top: 5px;
                                color: #333;
                            }

                            .Follow {
                                width: calc(100px);
                                position: absolute;
                                bottom: 10px;
                                right: 10px;
                                padding: 10px;

                                .FollowBtn {
                                    width: 100%;
                                    border-radius: 20px;
                                }

                                .Close {
                                    background-color: #999999;
                                }
                            }

                        }



                    }

                    .stats {
                        width: 100%;
                        display: flex;
                        margin-top: 20px;

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

                .NavBox {
                    margin-top: 10px;
                    padding: 0px 20px;
                    background-color: #fff;
                    border-radius: 10px;

                }

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

            .Right {
                margin-left: 10px;



                .NavBar {
                    width: calc(250px - 20px);
                    padding: 10px 10px;
                    border-radius: 10px;
                    background-color: #fff;
                    margin-bottom: 10px;

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
}

/* 视口小于768px */
@media (max-width: 768px) {
    .Pageas {
        width: calc(100%);
        height: calc(100%);
        position: relative;

        .PageContent {
            width: 100%;
            position: relative;
            z-index: 12;
            max-width: 1280px;
            margin: 0 auto;

            .UserInfo {
                width: calc(100% - 20px);
                margin: 0 auto;

                .TopBox {
                    width: calc(100%);
                    border-radius: 10px;
                    background-color: #fff;
                    overflow: hidden;

                    .TopBoxbACS {
                        width: 100%;
                        height: 130px;
                        background-repeat: no-repeat;
                        background-size: 100%;
                        background-position: center;

                        .BackgroundImage {
                            width: calc(100%);
                            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(255, 255, 255) 100%);

                            height: 100%;
                        }
                    }
                }

                .UserInfoBox {
                    width: calc(100% - 30px);
                    padding: 15px;
                    position: relative;

                    .TInfo {
                        display: flex;

                        .n_avatar {
                            width: 60px;
                            height: 60px;
                            margin-top: -10px;

                            img {
                                width: 100%;
                                border: 5px solid #fff;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }

                        .UserInfos {
                            margin-left: 10px;
                            position: relative;
                            width: calc(100% - 70px);

                            .nickname {
                                font-weight: 800;
                                font-size: 19px;
                            }

                            .signature {
                                margin-top: 5px;
                                color: #333;
                            }

                            .Follow {
                                width: calc(100px);
                                position: absolute;
                                bottom: 20px;
                                right: 0px;
                                padding: 10px;

                                .FollowBtn {
                                    width: 100%;
                                    border-radius: 20px;
                                }

                                .Close {
                                    background-color: #999999;
                                }
                            }

                        }



                    }

                    .stats {
                        width: 100%;
                        display: flex;
                        margin-top: 20px;

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

                .NavBox {
                    margin-top: 10px;
                    padding: 0px 20px;
                    background-color: #fff;
                    border-radius: 10px;

                }

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

            .Right {
                margin-left: 10px;
                width: calc(100% - 20px);
                margin: 10px auto;


                .NavBar {
                    width: calc(100% - 20px);
                    padding: 10px 10px;
                    border-radius: 10px;
                    background-color: #fff;
                    margin-bottom: 10px;

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
}

.road {
    border-radius: 10px !important;
    overflow: hidden;
}
</style>
