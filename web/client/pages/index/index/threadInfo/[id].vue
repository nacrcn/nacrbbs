<template>
    <div class="Pageas">
        <div class="PageContent">

            <div class="ConBox">
                <div class="title">
                    <img src="/assets/1.png" alt="">
                    <span>我有话要说</span>
                </div>
                <a-form :model="form" :layout="'vertical'">
                    <a-form-item field="name" label="标题">
                        <a-input class="road" v-model="form.n_name" placeholder="请输入标题" />
                    </a-form-item>
                    <a-form-item field="post" label="简介">
                        <a-textarea class="road" v-model="form.n_profile" placeholder="请输入简介" :max-length="200"
                            allow-clear show-word-limit />
                    </a-form-item>
                    <a-form-item field="post" label="详情">
                        <RichInput v-if="ShowEditor" v-model="form.n_html" :height="200"
                            @update:resources="handleResourcesUpdate"></RichInput>
                    </a-form-item>

                </a-form>
            </div>
            <div class="RightBox">
                <div class="Items">
                    <div class="title">
                        <img src="/assets/1.png" alt="">
                        <span>确认信息</span>
                    </div>
                    <a-form :model="form" :layout="'vertical'">
                        <a-form-item field="post" label="分类">
                            <a-select multiple class="road" :max-tag-count="2" allow-clear v-model="form.n_category"
                                placeholder="请选择分类">
                                <a-option v-for="item in CategoryList" :key="item.id" :value="item.id">{{ item.n_name
                                }}</a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item field="post" label="话题">
                            <a-select multiple class="road" :max-tag-count="2" allow-clear v-model="form.n_topic"
                                placeholder="请选择话题">
                                <a-option v-for="item in TopicList" :key="item.id" :value="item.id">{{ item.n_name
                                }}</a-option>
                            </a-select>
                        </a-form-item>
                     
                        <a-form-item field="post" label="权限">
                            <a-space>
                                <a-select class="road" v-model="form.n_permission" placeholder="请选择">
                                    <a-option value="1">免费公开</a-option>
                                    <a-option value="2">积分公开</a-option>
                                    <a-option value="3">付费公开</a-option>
                                </a-select>
                                <a-input class="road" v-if="form.n_permission !== '1'" v-model="form.n_price"
                                    placeholder="请输入价格" />
                            </a-space>
                        </a-form-item>
                        <a-form-item field="post" label="">
                            <a-button type="primary" class="road" @click="SubmitForm()">提交</a-button>
                        </a-form-item>
                    </a-form>
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
UserInfo.init((res) => {
    if (!res) {
        Message.error('请先登录')
        navigateTo('/login')
    }
})
useSeoSet({
    title: '添加内容 - ' + SiteConfig.$state.Config.n_web_title,
})
const ShowEditor = ref(false)
onMounted(() => {
    ShowEditor.value = true
})

const form = ref({
    n_name: '',
    n_profile: '',
    n_html: '',
    n_category: [],
    n_topic: [],
    n_permission: '1'
})

// 存储文章中的所有资源
const resources = ref([])

// 处理资源更新
const handleResourcesUpdate = (newResources) => {
    resources.value = newResources
    console.log('当前资源列表:', resources.value)
}

/* 提交函数 */
const SubmitForm = async () => {
    let subFrom = {
        ...form.value,
        n_category: JSON.stringify(form.value.n_category),
        n_topic: JSON.stringify(form.value.n_topic),
        n_resources: JSON.stringify(resources.value),
        n_haveimage: 2,
        n_havevideo: 2
    }

    /* 判断是否有图片 */
    if (resources.value.length > 0) {
        for (let a in resources.value) {
            if (resources.value[a].type == 1) {
                subFrom.n_haveimage = 1
            }
            if (resources.value[a].type == 2) {
                subFrom.n_havevideo = 1
            }
        }
    }

    try {
        let res;
        if (id == 'add') {
            res = await useApiFetch().post('/api/AddThreads', subFrom)
        } else {
            res = await useApiFetch().post('/api/EditThreads', subFrom)
        }
        if (res.code == 200) {
            Message.success('提交成功')

        } else {
            Message.error(res.message || '提交失败')
        }
    } catch (error) {
        Message.error(error.message)
    }
}
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

onMounted(() => {
    GetCategory()
    GetTopicList()
})

if (id == 'add') {

} else {
    const res = await useApiFetch().post('/api/GetThreads', {
        id: id
    })

    if (res.code === 200) {
        form.value = res.data
        form.value.n_category = []
        form.value.n_topic = []
        for (let a in res.data.category) {
            if (res.data.category[a].n_type == '1') {
                form.value.n_category.push(res.data.category[a].id)
            } else {
                form.value.n_topic.push(res.data.category[a].id)
            }
        }
    } else {
        navigateTo('/threads/404')
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

            .ConBox {
                width: calc(100% - 330px);
                padding: 15px;
                border-radius: 10px;
                background-color: #fff;

            }

            .RightBox {
                width: 300px;

                margin-left: 10px;

                .Items {
                    padding: 15px;
                    border-radius: 10px;
                    background-color: #fff;

                    .road {
                        border-radius: 10px !important;
                        width: 100%;
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


            .ConBox {
                width: calc(100% - 40px);
                padding: 15px;
                border-radius: 20px;
                background-color: #fff;
                margin: 0px auto;

            }
            .RightBox {
                 width: calc(100% - 40px);
                padding: 15px;
                border-radius: 20px;
                margin: 10px auto;
                background-color: #fff;
                .Items {
                    padding: 15px;
                    border-radius: 10px;
                    background-color: #fff;

                    .road {
                        border-radius: 10px !important;
                        width: 100%;
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
