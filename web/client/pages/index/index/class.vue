<template>
    <div class="MainBox">
        <!-- 主要内容区域 -->
        <div class="MainContent">
            <div>
                <BoxTitle>热门圈子</BoxTitle>
            </div>
            <div class="ListBox">
                <ClassItem v-for="value in ThreadsList" :key="value.n_name" :data="value"></ClassItem>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/* 获取文章列表 GetThreads */
const ThreadsList = ref([])
const from = ref({
    page: 1,
    pagesize: 10,
    total: 0
})
const GetThreads = async () => {
    try {
        const res = await useApiFetch().post('/api/GetCategory', from.value)
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

onMounted(() => {
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
            width: calc(100% - 20px);
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;

            .ListBox {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                gap: 10px;
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
            width: calc(100% - 20px);
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;

            .ListBox {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                gap: 10px;
            }
        }
    }
}
</style>