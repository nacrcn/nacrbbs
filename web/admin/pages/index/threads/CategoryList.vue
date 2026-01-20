<template>
    <div>
        <div class="Page">
            <a-page-header title="工具列表" :show-back="false">
                <template #subtitle>
                    <a-space>

                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetUserList()">检索</a-button>
                        <a-button type="primary"
                            @click="visible = true, type = 1, info = { n_type: GetFrom.type }">新增分类</a-button>
                    </a-space>
                </template>

            </a-page-header>
            <div class="Pagecontent">
                <a-tabs v-model:activeKey="GetFrom.type" @change=" GetUserList()">
                    <a-tab-pane key="1" title="分类列表"></a-tab-pane>
                    <a-tab-pane key="2" title="话题列表"></a-tab-pane>
                </a-tabs>
                <a-table :columns="columns" :data="UserList" :pagination="false" :loading="loading" :scroll="{
                    y: 'calc(100vh - 190px)',
                    x: '100%'
                }">
                    <template #n_icon="{ record }">
                        <a-avatar :size="24">
                            <img alt="avatar" :src="record.n_icon" />
                        </a-avatar>
                    </template>
                    <template #n_api_qps="{ record }">
                        {{ record.n_api_qps }} / {{ record.n_api_qps_time }}s
                    </template>
                    <template #n_price_type="{ record }">
                        <a-tag color="arcoblue" v-if="record.n_price_type === '1'">积分</a-tag>
                        <a-tag color="orange" v-if="record.n_price_type === '2'">余额</a-tag>
                    </template>
                    <template #n_api_vip="{ record }">
                        <a-tag color="arcoblue" v-if="record.n_api_vip === '1'">VIP</a-tag>
                        <a-tag color="orange" v-else>无限制</a-tag>
                    </template>
                    <template #console="{ record }">
                        <a-space>
                            <a-button size="mini" @click="info = { ...record }, type = 2, visible = true"
                                type="primary">编辑</a-button>
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

        <a-drawer :width="540" :visible="visible" @ok="editUserInfo" @cancel="() => {
            visible = false
        }" unmountOnClose title="分类详情">
            <div>
                <a-form style="margin: 0 auto;" :model="form">
                    <a-form-item field="name" label="图标">
                        <Upimg :src="info.n_icon" width="100" height="100" @success="(e) => {
                            info.n_icon = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="back" label="背景">
                        <Upimg :src="info.n_back" width="200" height="100" @success="(e) => {
                            info.n_back = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="name" label="名称">
                        <a-input v-model="info.n_name" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="name" label="简介">
                        <a-input v-model="info.n_note" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="name" label="权重">
                        <a-input v-model="info.n_sort" placeholder="请输入" />
                    </a-form-item>
                </a-form>
            </div>
        </a-drawer>

    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
/* 获取应用列表信息 */
const UserList = ref([])
const GetFrom = ref({
    page: 1,
    pagesize: 20,
    type: 1
})
const loading = ref(false)
const GetUserList = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/getCategoryList', GetFrom.value)
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
        title: '图标',
        slotName: 'n_icon',
        width: 60,
    },
    {
        title: '名称',
        dataIndex: 'n_name',
        ellipsis: true,
        tooltip: true,
    },
     {
        title: '简介',
        dataIndex: 'n_note',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '权重',
        dataIndex: 'n_sort',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '操作',
        dataIndex: 'console',
        slotName: 'console',
        width: 150,
        fixed: 'right',
    },
];



/* 删除应用信息 delapp */
const delUser = async (id) => {
    const res = await useApiFetch().post('/api/delCategoryAdmin', {
        id
    })
    if (res.code === 200) {
        Message.success('删除成功')
        GetUserList()
    } else {
        Message.error(res.msg)
    }
}

const visible = ref(false)
const info = ref({})
const type = ref(1)
/* 编辑用户信息 edituserinfo */
const editUserInfo = async () => {
    let res;

    if(info.value.n_sort == '' || info.value.n_sort == undefined || info.value.n_sort == null || info.value.n_sort == 'null') {
        info.value.n_sort = 0
    }
    if (type.value == 1) {
        res = await useApiFetch().post('/api/addCategoryAdmin', info.value)
    } else {
        res = await useApiFetch().post('/api/editCategoryAdmin', info.value)
    }
    if (res.code === 200) {
        Message.success('成功')
        visible.value = false
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
