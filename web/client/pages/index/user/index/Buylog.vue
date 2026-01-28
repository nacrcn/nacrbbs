<template>
    <div class="Pageas">
        <div class="PageContent">
            <UserHeader title="我的购买记录"></UserHeader>


            <FlexBox :data="ThreadsList" :columns="2" :gap="10" :loading="loading">
                <template #item="{ item }">
                    <ItemA :data="item"></ItemA>
                </template>
            </FlexBox>
            <div class="PageNav">
                <a-pagination @change="GetThreads" @page-size-change="GetThreads" v-model:current="from.page"
                    v-model:pageSize="from.pagesize" :total="from.total" size="mini" show-total />
            </div>

        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const SiteConfig = useSiteConfig()
useSeoSet({
    title: '我购买的 - ' + SiteConfig.$state.Config.n_web_title,
})


/* 获取文章列表 GetThreads */
const ThreadsList = ref([])
const from = ref({
    page: 1,
    pagesize: 10,
    total: 0,
    isMyBuy: '1'
})
const loading = ref(false)
const GetThreads = async () => {
    try {
        loading.value = true
        const res = await useApiFetch().post('/api/GetThreads', from.value)
        if (res.code == 200) {
            ThreadsList.value = res.data
            from.value.total = res.total
        } else {
        }
        loading.value = false
    } catch (error) {
        Message.error(error.message)
    }
}

onMounted(() => {
    GetThreads()
})


const ShowIndex = ref('1')
</script>

<style lang="scss" scoped>
.PageNav {
    width: calc(100% - 20px);
    margin-top: 10px;
    display: flex;
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    justify-content: center;
}
</style>
