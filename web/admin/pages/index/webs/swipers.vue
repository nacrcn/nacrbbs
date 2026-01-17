<template>
    <div>
        <div class="Page">
            <a-page-header title="轮播图管理" :show-back="false">
                <template #subtitle>
                    <a-space>

                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetUserList()">检索</a-button>
                        <a-button type="primary" @click="info = {}, visible = true, type = 1">新增轮播图</a-button>
                    </a-space>
                </template>

            </a-page-header>
            <div class="Pagecontent">
                <a-table :columns="columns" :data="UserList" :pagination="false" :loading="loading" :scroll="{
                    y: 'calc(100vh - 190px)',
                    x: '100%'
                }">
                    <template #n_src="{ record }">
                        <a-image width="100" height="50" :src="record.n_src" />
                    </template>



                    <template #console="{ record }">
                        <a-space>
                            <a-button size="mini" @click="info = { ...record }, visible = true, type = 2"
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

        <a-drawer :width="940" :visible="visible" @ok="editUserInfo" @cancel="() => {
            visible = false
        }" unmountOnClose title="轮播图信息管理">
            <div>
                <a-form style="margin: 0 auto;" :model="form">
                    <a-form-item field="name" label="图标">
                        <Upimg :src="info.n_src" width="100" height="100" @success="(e) => {
                            info.n_src = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="name" label="名称">
                        <a-input v-model="info.n_name" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="介绍">
                        <a-input v-model="info.n_dosc" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="权重">
                        <a-input v-model="info.n_sort" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="地址">
                        <a-input v-model="info.n_url" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="name" label="位置">
                        <a-select v-model="info.n_pos" placeholder="Please select ...">
                            <a-option value="1">首页位置</a-option>
                            <a-option value="2">位置2</a-option>
                            <a-option value="3">位置3</a-option>
                            <a-option value="4">位置4</a-option>
                            <a-option value="5">位置5</a-option>
                        </a-select>
                        <a-input v-model="info.n_pos" placeholder="请输入" />
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
    const res = await useApiFetch().post('/api/swipers', GetFrom.value)
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
        title: '图/视频',
        dataIndex: 'n_src',
        slotName: 'n_src',
    },
    {
        title: '名称',
        dataIndex: 'n_name',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '简介',
        dataIndex: 'n_dosc',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '权重',
        dataIndex: 'n_sort',
    },
    {
        title: '跳转地址',
        dataIndex: 'n_url',
    },
    {
        title: '操作',
        dataIndex: 'console',
        slotName: 'console',
        width: 220,
        fixed: 'right',
    },
];



/* 删除应用信息 delapp */
const delUser = async (id) => {
    const res = await useApiFetch().post('/api/delswipers', {
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
        res = await useApiFetch().post('/api/addswipers', info.value)
    } else {
        res = await useApiFetch().post('/api/editswipers', info.value)
    }
    if (res.code === 200) {
        Message.success('编辑成功')
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
