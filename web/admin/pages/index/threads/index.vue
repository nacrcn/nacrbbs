<template>
    <div>
        <div class="Page">
            <a-page-header title="帖子列表" :show-back="false">
                <template #subtitle>
                    <a-space>

                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetUserList()">检索</a-button>
                    </a-space>
                </template>

            </a-page-header>
            <div class="Pagecontent">
                <a-table :columns="columns" :data="UserList" :pagination="false" :loading="loading" :scroll="{
                    y: 'calc(100vh - 190px)',
                    x: '100%'
                }">
                    <template #n_icon="{ record }">
                        <a-avatar :size="24">
                            <img alt="avatar" :src="record.n_icon" />
                        </a-avatar>
                    </template>
                    <template #n_nickname="{ record }">
                        {{ record.user?.n_nickname }}
                    </template>
                    <template #n_permission="{ record }">
                        <a-tag color="arcoblue" v-if="record.n_permission === '1'">免费</a-tag>
                        <a-tag color="arcoblue" v-if="record.n_permission === '2'">积分</a-tag>
                        <a-tag color="orange" v-if="record.n_permission === '3'">余额</a-tag>
                    </template>
                    <template #category="{ record }">
                        {{ getCname(record.category) }}
                    </template>
                    <template #console="{ record }">
                        <a-space>
                            <a-button size="mini" @click="navigateTo('/threads/info/' + record.id)" type="primary">编辑</a-button>
                            <a-popconfirm content="确认要删除此数据？删除后将无法恢复" type="error" @ok="() => { delUser(record.id) }"
                                position="bottom">
                                <a-button size="mini" type="primary" status="danger">删除</a-button>
                            </a-popconfirm>
                        </a-space>
                    </template>
                    <template #footer>
                        <a-pagination @change="GetUserList" @page-size-change="GetUserList"
                            v-model:current="GetFrom.page" v-model:pageSize="GetFrom.pagesize" :total="GetFrom.total"
                            size="mini" show-total show-page-size :page-size-options="[50, 100, 200, 500, 1000]" />
                    </template>
                </a-table>
            </div>
        </div>


    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
/* 获取工具列表信息 */
const UserList = ref([])
const GetFrom = ref({
    page: 1,
    pagesize: 20,
})
/* 获取分类 */
const getCname = (res) => {
    let name = ''
    for (let a in res) {
        name = name + res[a].n_name + ','
    }
    return name
}


/* 会员配置 */
const loading = ref(false)
const GetUserList = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/GetThreadsAdmin', GetFrom.value)
    if (res.code === 200) {
        UserList.value = res.data
        GetFrom.value.total = res.total
    } else {
        Message.error(res.msg)
    }
    loading.value = false
}
const columns = [
    {
        title: '名称',
        dataIndex: 'n_name',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '发布用户',
        slotName: 'n_nickname',
        ellipsis: true,
        tooltip: true,
    },
    /* category */
    {
        title: '分类',
        slotName: 'category',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '类型',
        slotName: 'n_permission',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '价格',
        slotName: 'n_price',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '回复次数',
        dataIndex: 'n_msgs',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '点赞数量',
        dataIndex: 'n_starts',
    },
    {
        title: '阅读次数',
        dataIndex: 'n_read',
    },
    {
        title: '发布时间',
        dataIndex: 'n_time',
        width: 200,
    },
    {
        title: '操作',
        dataIndex: 'console',
        slotName: 'console',
        width: 150,
        fixed: 'right',
    },
];



/* 删除工具 */
const delUser = async (id) => {
    const res = await useApiFetch().post('/api/DelThreadsAdmin', {
        id
    })
    if (res.code === 200) {
        Message.success('删除成功')
        GetUserList()
    } else {
        Message.error(res.msg)
    }
}




onMounted(() => {
    GetUserList()
})
</script>

<style lang="scss" scoped>
.Page {
    background-color: #fff;
    margin: 1px;
    width: calc(100% - 2px);

    .Pagecontent {
        width: calc(100% - 20px);
        padding: 10px;
    }

}
</style>
