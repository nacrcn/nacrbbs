<template>
    <div class="MainBox">
        <div class="Left">
            <div class="MainContent">

                <div class="ThreadInfo">
                    <h1>{{ Info.n_name }}</h1>
                    <div>
                        <a-space wrap>
                            <p class="User">
                                <img :src="Info.user?.n_avatar" alt="用户头像" />
                                <span>{{ Info.user?.n_nickname }}</span>
                            </p>
                            <p class="Time">{{ Info.n_time }}</p>
                            <p class="Read">
                                <icon-eye class="icon" />
                                <span>{{ formatNumber(Info.n_read || 0) }}</span>
                            </p>
                        </a-space>
                    </div>
                    <div class="Category">
                        <a-space wrap>
                            <div class="Tag" v-for="value in Info.category" :key="value">
                                <span v-if="value.n_type == 2">#</span>
                                {{ value.n_name }}
                            </div>
                        </a-space>
                    </div>
                    <!-- 按钮部分 -->
                    <div class="ButtonSection" @click="PopShow = true">
                        <a-button>
                            <template #icon>
                                <icon-more />
                            </template>
                        </a-button>
                    </div>
                </div>
                <div class="Buy" v-if="!Info.IsBuy">
                    <a-result status="error" title="请先购买">
                        <template #icon>
                            <IconFaceFrownFill />
                        </template>
                        <template #subtitle> 当前铁子需要支付{{ Info.n_price || 0 }}{{ Info.n_permission == '2' ? '积分' : '元' }}
                        </template>

                        <template #extra>
                            <a-button :loading="loading" type="primary" @click="handleSubmit()">立即购买</a-button>
                        </template>
                        <a-typography style="background: var(--color-fill-2); padding: 24px;">
                            <a-typography-paragraph>说明:</a-typography-paragraph>
                            <ul>
                                <li>购买后即可查看内容</li>

                                <li>如有问题请联系管理员</li>
                            </ul>
                        </a-typography>
                    </a-result>
                </div>
                <div v-else>
                    <RichHtml :html="Info.n_html"></RichHtml>
                </div>

                <div class="CommentSection">
                    <div :class="['Item', { active: Info.isLiked }]" @click="LikeThreads()">
                        <icon-thumb-up class="icon" />
                        <span>{{ Info.n_starts || 0 }}</span>
                    </div>
                    <div class="Item">
                        <icon-message class="icon" />
                        <span>{{ Info.n_msgs || 0 }}</span>
                    </div>
                    <div class="Item">
                        <icon-share-internal class="icon" />
                        <span>分享</span>
                    </div>
                </div>
            </div>
            <div class="comment">
                <div class="title">
                    <img src="/assets/1.png" alt="">
                    <span>我有话要说</span>
                </div>
                <div class="content">
                    <a-textarea class="road" v-model="form.n_html" placeholder="请输入评论" :max-length="100" allow-clear
                        show-word-limit />
                    <div class="ButtonSection">

                        <a-button type="primary" class="send-btn" @click="CommentThreads()">
                            <template #icon>
                                <icon-send />
                            </template>
                            <template #default>发送</template>
                        </a-button>
                    </div>
                </div>
            </div>
            <div class="comment">
                <div class="title">
                    <img src="/assets/1.png" alt="">
                    <span>大家都再说</span>
                </div>
                <a-spin :loading="loading" tip="正在加载" style="width: 100%;height: 100%;">

                    <CommentItem v-for="value in CommentList" :key="value.id" :data="value"
                        :isAuthor="value.n_uid == Info.n_uid" @reload="GetCommentList"></CommentItem>

                    <div class="Isno" style="  width: 100%;
                background-color: #fff;
                border-radius: 10px;" v-if="CommentList.length == 0 && !loading">
                        <a-result :status="null" title="无内容" subtitle="哎呀，没有内容了">
                            <template #icon>
                                <IconFaceSmileFill />
                            </template>
                        </a-result>
                    </div>
                </a-spin>

                <div class="PageNav">
                    <a-pagination @change="GetCommentList" @page-size-change="GetCommentList"
                        v-model:current="GetCommentsFrom.page" v-model:pageSize="GetCommentsFrom.pagesize"
                        :total="GetCommentsFrom.total" size="mini" show-total />
                </div>
            </div>

        </div>
        <div class="Right">

            <div class="UserInfo">
                <UserBox :id="Info.n_uid"></UserBox>
            </div>
            <div class="NavBar">
                <div class="title">
                    <img src="/assets/1.png" alt="">
                    <span>热门话题</span>
                </div>
                <TopicItem v-for="value in TopicList" :key="value.n_name" :data="value"></TopicItem>
            </div>
        </div>

        <!-- 操作框 -->
        <popupMob v-model:modelValue="PopShow" :Title="'操作'" Nook>
            <template #content>
                <a-space wrap>
                    <a-button @click="navigateTo('/threadInfo/' + id)" v-if="UserInfo.$state.UserInfo?.id == Info.n_uid"
                        style="border-radius: 20px;">
                        <template #icon>
                            <icon-edit />
                        </template>
                        编辑贴贴
                    </a-button>

                    <a-button status="warning" style="border-radius: 20px;" @click="reportThreadsShow = true">
                        <template #icon>
                            <icon-info-circle />
                        </template>
                        举报帖子
                    </a-button>
                    <a-popconfirm @ok="DelThreads()" content="确定删除吗?" type="error"
                        v-if="UserInfo.$state.UserInfo?.id == Info.n_uid">
                        <a-button status="danger" style="border-radius: 20px;">
                            <template #icon>
                                <icon-delete />
                            </template>
                            删除贴贴
                        </a-button>
                    </a-popconfirm>

                </a-space>

            </template>
        </popupMob>

        <!-- 举报 -->
        <popupMob v-model:modelValue="reportThreadsShow" :Title="'举报'" Nook>
            <template #content>
                <a-form :model="form" :layout="'vertical'">

                    <a-form-item field="post" label="举报原因">
                        <a-textarea class="road" v-model="reportThreadsFrom.n_html" placeholder="请输入举报原因"
                            :max-length="200" allow-clear show-word-limit />
                    </a-form-item>
                    <a-form-item field="post" label="">
                        <a-button type="primary" class="road" @click="reportThreads()">提交</a-button>
                    </a-form-item>

                </a-form>

            </template>
        </popupMob>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Message } from '@arco-design/web-vue';
const route = useRoute()
const UserInfo = useUserInfo()
UserInfo.init()
const id = route.params.id
const SiteConfig = useSiteConfig()

/* 数字格式化 自动识别转换 K W */
const formatNumber = (num) => {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    }
    return num
}

const Info = ref({})
const res = await useApiSsr('GetThreadsInfo' + id, '/api/GetThreads', {
    id: id
})
if (res.code === 200) {
    Info.value = res.data
} else {
    navigateTo('/threads/404')
}
useSeoSet({
    title: Info.value.n_name + '-' + SiteConfig.$state.Config.n_web_title,
    description: Info.value.n_profile
})
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
})

/* 删除帖子 DelThreads */
const DelThreads = async () => {
    try {
        const res = await useApiFetch().post('/api/DelThreads', {
            id: id
        })
        if (res.code == 200) {
            Message.success('删除成功')
            navigateTo('/')
        } else {
            Message.error(res.message || '删除失败')
        }
    } catch (error) {
        Message.error(error.message)
    }
}
const PopShow = ref(false)


const form = ref({
    id: id,
    n_html: '',
    n_cid: 0,
    n_html: '',
})
/* 评论 CommentThreads */
const CommentThreads = async () => {
    try {
        const res = await useApiFetch().post('/api/CommentThreads', form.value)
        if (res.code == 200) {
            Message.success('评论成功')
            form.value.n_html = ''
            GetCommentList()
        } else if (res.code == 401) {
            navigateTo('/login')
        } else {
            Message.error(res.msg || '点赞失败')
        }
    } catch (error) {
        Message.error(error.message)
    }
}

/* 获取评论列表 */
const GetCommentsFrom = ref({
    page: 1,
    pagesize: 20,
    id: id
})
const CommentList = ref([])
const GetCommentList = async () => {
    try {
        loading.value = true
        const res = await useApiFetch().post('/api/GetComments', GetCommentsFrom.value)
        if (res.code == 200) {
            CommentList.value = res.data
            GetCommentsFrom.value.total = res.total
        } else {
        }
        loading.value = false
    } catch (error) {
        Message.error(error.message)
    }
}
onMounted(() => {
    GetCommentList()
})


/* 点赞帖子 LikeThreads */
const LikeThreads = async () => {
    try {
        const res = await useApiFetch().post('/api/LikeThreads', {
            id: id
        })
        if (res.code == 200) {
            Message.success(res.msg)
            const data = await useApiSsr('GetThreadsInfo' + id, '/api/GetThreads', {
                id: id
            })
            if (data.code === 200) {
                Info.value = data.data
            } else {
                navigateTo('/threads/404')
            }
        } else if (res.code == 401) {
            navigateTo('/login')
        } else {
            Message.error(res.msg || '点赞失败')
        }
    } catch (error) {
        Message.error(error.message)
    }
}

/* 购买帖子  */
const from = ref({
    price: Info.value.n_price,
    type: 3,
    id: Info.value.id
})
/* 获取当前页面地址 */

// 提交充值
const loading = ref(false)
const handleSubmit = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/CreateOrder', {
        from: JSON.stringify([from.value]),
        path: window.location.href
    })
    if (res.code === 200) {
        navigateTo('/user/order/' + res.data.order + '?return=/threads/' + Info.value.id)
    } else {
        Message.error(res.msg)
    }
    loading.value = false
}



/* 举报帖子 ReportThreads */
const reportThreadsFrom = ref({
    n_tid: Info.value.id,
    n_html: ''
})
const reportThreadsShow = ref(false)
const reportThreads = async () => {
    // 举报帖子逻辑
    const res = await useApiFetch().post('/api/ReportThreads', reportThreadsFrom.value)
    if (res.code === 200) {
        reportThreadsShow.value = false
        Message.success(res.msg)
    } else if (res.code == 401) {
        navigateTo('/login')
    } else {
        Message.error(res.msg || '点赞失败')
    }
}
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
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                margin-bottom: 10px;

                .ThreadInfo {
                    position: relative;

                    h1 {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 10px;
                        margin-top: 0;
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

                    padding-bottom: 10px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #ebeff3;

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

                    .Read {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        color: #444;
                    }

                    .Time {
                        font-size: 12px;
                        color: #444;
                        line-height: 20px;
                    }

                    .ButtonSection {
                        position: absolute;
                        right: 0px;
                        top: 0px;
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

                    .active {

                        .icon,
                        span {
                            color: #ff5100;

                        }
                    }
                }
            }

            .comment {
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                margin-bottom: 10px;

                .ButtonSection {
                    margin-top: 10px;
                    position: relative;

                    .send-btn {
                        border-radius: 7px;
                        background-color: rgb(0, 209, 129);

                    }
                }

                .road {
                    border-radius: 10px;
                }
            }

        }

        .Right {
            margin-left: 10px;
            width: 300px;

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
            width: calc(100%);
            margin: 0 auto;

            /* 隐藏滚动条 */
            &::-webkit-scrollbar {
                display: none;
            }

            .MainContent {
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                margin-bottom: 10px;

                .ThreadInfo {
                    position: relative;

                    h1 {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 10px;
                        margin-top: 0;
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

                    padding-bottom: 10px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #ebeff3;

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

                    .Read {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        color: #444;
                    }

                    .Time {
                        font-size: 12px;
                        color: #444;
                        line-height: 20px;
                    }

                    .ButtonSection {
                        position: absolute;
                        right: 0px;
                        top: 0px;
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

                    .active {

                        .icon,
                        span {
                            color: #ff5100;

                        }
                    }
                }
            }

            .comment {
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                margin-bottom: 10px;

                .ButtonSection {
                    margin-top: 10px;
                    position: relative;

                    .send-btn {
                        border-radius: 7px;
                        background-color: rgb(0, 209, 129);


                    }
                }

                .road {
                    border-radius: 10px;
                }
            }

        }

        .Right {
            width: calc(100%);
            margin: 10px auto;

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