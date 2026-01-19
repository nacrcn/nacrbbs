<template>
    <div class="MainBox">
        <div class="MainContent">
            <div class="TopB">
                <BoxTitle>热门UP主 谁的最爱</BoxTitle>
                <div class="TopBox">
                    <a-input class="search-input" v-model="from.search" placeholder="UP主昵称" allow-clear @press-enter="GetThreads">
                        <template #prefix>
                            <icon-search />
                        </template>
                    </a-input>
                    <a-button type="primary" class="send-btn" @click="navigateTo('/add')">
                        <template #icon>
                            <icon-send />
                        </template>
                        <template #default>搜一下</template>
                    </a-button>
                </div>
            </div>
            <FlexBox :data="ThreadsList" :columns="3" :gap="10" :loading="loading">
                <template #item="{ item }">
                    <UserBox :info="item"></UserBox>
                </template>
            </FlexBox>

            <div class="PageNav">
                <a-pagination @change="GetThreads" @page-size-change="GetThreads" v-model:current="from.page"
                    v-model:pageSize="from.pagesize" :total="from.total" size="mini" show-total />
            </div>
        </div>
        <div class="SidebarRight">
            <div class="NavBar">
                <BoxTitle>热门圈子</BoxTitle>
                <ClassItem v-for="value in CategoryList" :key="value.n_name" :data="value"></ClassItem>
            </div>
            <div class="NavBar">
                <BoxTitle>热门话题</BoxTitle>
                <TopicItem v-for="value in TopicList" :key="value.n_name" :data="value"></TopicItem>
            </div>
            <div class="NavBar">
                <NeedStar></NeedStar>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue';
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
    pagesize: 9,
    total: 0,
    search: ''
})
const loading = ref(false)
const GetThreads = async () => {
    try {
        loading.value = true

        const res = await useApiFetch().post('/api/GetUser', from.value)
        if (res.code == 200) {
            ThreadsList.value = res.data
            from.value.total = res.total
        } else {
            // Message.error(res.message || '获取文章列表失败')
        }
        loading.value = false
    } catch (error) {
        Message.error(error.message)
    }
}

onMounted(() => {
    GetCategory()
    GetTopicList()
    GetThreads()
})
</script>


<style lang="scss" scoped>
/* 视口大于768px时的样式 */
@media (min-width: 768px) {
    .MainBox {
        display: flex;
        width: 100%;

        .MainContent {
            width: calc(100% - 250px);

            .TopB {
                width: calc(100% - 20px);
                padding: 10px;
                background-color: #fff;
                border-radius: 10px;
                margin-bottom: 10px;

                .select {
                    margin-top: 10px;
                    margin-left: 4px;
                }

                .TopBox {

                    display: flex;

                    .search-input {
                        width: calc(100% - 120px);
                        border-radius: 7px;
                    }

                    .send-btn {
                        border-radius: 7px;
                        margin-left: 10px;
                        background-color: rgb(0, 209, 129);
                    }
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

        .SidebarRight {
            max-height: calc(100vh - 180px);
            overflow: hidden;
            overflow-y: auto;
            margin-left: 10px;

            /* 隐藏滚动条 */
            &::-webkit-scrollbar {
                display: none;
            }

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

/* 视口小于768px时的样式 */
@media (max-width: 768px) {
    .MainBox {
        display: flex;
        width: 100%;

        .MainContent {
            width: calc(100%);


            .TopB {
                width: calc(100% - 20px);
                padding: 10px;
                background-color: #fff;
                border-radius: 10px;
                margin-bottom: 10px;

                .select {
                    margin-top: 10px;
                    margin-left: 4px;
                }

                .TopBox {

                    display: flex;

                    .search-input {
                        width: calc(100% - 120px);
                        border-radius: 7px;
                    }

                    .send-btn {
                        border-radius: 7px;
                        margin-left: 10px;
                        background-color: rgb(0, 209, 129);
                    }
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

        .SidebarRight {
            max-height: calc(100vh - 180px);
            overflow: hidden;
            overflow-y: auto;
            margin-left: 10px;
            display: none;

            /* 隐藏滚动条 */
            &::-webkit-scrollbar {
                display: none;
            }

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
</style>