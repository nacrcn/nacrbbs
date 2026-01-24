<template>
    <div>
        <div class="Page">
            <a-page-header title="勋章管理" :show-back="false">
                <template #subtitle>
                    <a-space>

                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetUserList()">检索</a-button>
                        <a-button type="primary" @click="type = 1, info = {}, visible = true">新增勋章</a-button>
                    </a-space>
                </template>

            </a-page-header>
            <div class="Pagecontent">
                <a-table :columns="columns" :data="UserList" :pagination="false" :loading="loading" :scroll="{
                    y: 'calc(100vh - 190px)',
                    x: '100%'
                }" @change="handleSecondNavChange" :draggable="{ type: 'handle', width: 40 }">
                    <template #n_icon="{ record }">
                            <img alt="avatar" :src="record.n_src" style="height:  30px;" />
                    </template>
                    <template #n_type="{ record }">
                        <a-tag v-if="record.n_type === '1'" color="arcoblue">发帖数</a-tag>
                        <a-tag v-if="record.n_type === '2'" color="orange">获赞数</a-tag>
                        <a-tag v-if="record.n_type === '3'" color="green">评论数</a-tag>
                        <a-tag v-if="record.n_type === '4'" color="purple">粉丝数</a-tag>
                    </template>
                    <template #console="{ record }">
                        <a-space>
                            <a-button size="mini" @click="type = 2, info = { ...record }, visible = true"
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

        <a-drawer :width="740" :visible="visible" @ok="editUserInfo" @cancel="() => {
            visible = false
        }" unmountOnClose title="新增勋章信息">
            <div>
                <a-form style="margin: 0 auto;" :model="form">
                    <a-form-item field="name" label="图标">
                        <Upimg :src="info.n_src" width="100" height="100" @success="(e) => {
                            info.n_src = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="name" label="阈值">
                        <a-input v-model="info.n_threshold" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="name" label="依据">
                        <a-select class="road" v-model="info.n_type" placeholder="请选择">
                            <a-option value="1">发帖数</a-option>
                            <a-option value="2">获赞数</a-option>
                            <a-option value="3">评论数</a-option>
                            <a-option value="4">粉丝数</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="post" label="名称">
                        <a-input v-model="info.n_name" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="权重">
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
})
const loading = ref(false)
const GetUserList = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/getMedal', GetFrom.value)
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
        title: '阈值',
        dataIndex: 'n_threshold',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '依据',
        slotName: 'n_type',
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
    const res = await useApiFetch().post('/api/delMedal', {
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
    if (type.value == 1) {
        res = await useApiFetch().post('/api/addMedal', info.value)
    } else {
        res = await useApiFetch().post('/api/editMedal',info.value)
    }
    if (res.code === 200) {
        Message.success('成功')
        visible.value = false
        GetUserList()
    } else {
        Message.error(res.msg)
    }

}

const handleSecondNavChange = (_data) => {
    console.log(_data);
    UserList.value = _data

    for (let a in _data) {
        useApiFetch().post('/api/editActivity', {
            ..._data[a], n_sort: a
        })
    }
}

const columnsConfig = [
    {
        title: '次/天范围(小)',
        slotName: 'min',
        width: 100,
    },
    {
        title: '次/天范围(大)',
        slotName: 'max',
        width: 100,
    },
    {
        title: '金额',
        slotName: 'price',
        width: 100,
    },
    {
        title: '金额浮动',
        slotName: 'float',
        width: 100,
    },
    {
        title: '操作',
        dataIndex: 'console',
        slotName: 'console',
        width: 70,
        fixed: 'right',
    },
];


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
