<template>
    <div>
        <div class="Page">
            <a-page-header title="用户管理" :show-back="false">
                <template #subtitle>
                    <a-space>
                        
                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetUserList()">检索</a-button>
                        <!-- <a-button type="primary" @click="navigateTo('/app/Create/add')">发布应用</a-button> -->
                    </a-space>
                </template>

            </a-page-header>
            <div class="Pagecontent">
                <a-table :columns="columns" :data="UserList" :pagination="false" :loading="loading" :scroll="{
                    y: 'calc(100vh - 190px)',
                    x: '100%'
                }">
                    <template #n_avatar="{ record }">
                        <a-avatar :size="24">
                            <img alt="avatar" :src="record.n_avatar" />
                        </a-avatar>
                    </template>
                    <template #user_name="{ record }">
                        <a-tooltip :content="record.user_name">

                        </a-tooltip>
                    </template>
                    <template #xu_downsize="{ record }">
                        <a-tag color="arcoblue">
                            <template #icon>
                                <icon-to-bottom />
                            </template>
                            {{ record.xu_downsize ?? 0 }}
                        </a-tag>
                    </template>
                    <template #vipinfo="{ record }">
                        <!-- {{ record.vipinfo.vipname }} -->
                    </template>
                    <template #xu_recommendation="{ record }">
                        <a-tag color="arcoblue">
                            <template #icon>
                                <icon-thumb-up-fill />
                            </template>
                            {{ record.xu_recommendation ?? 0 }}
                        </a-tag>
                    </template>
                    <template #console="{ record }">
                        <a-space>
                            <a-button size="mini" @click="info = { ...record }, visible = true"
                                type="primary">编辑</a-button>
                            <a-popconfirm content="确认要删除此数据？删除后将无法恢复" type="error" @ok="() => { delUser(record.id) }"
                                position="bottom">
                                <a-button size="mini" type="primary" status="danger">删除</a-button>

                            </a-popconfirm>
                        </a-space>
                    </template>
                    <template #footer>
                        <a-pagination @change="GetUserList" @page-size-change="GetUserList" v-model:current="GetFrom.page"
                            v-model:pageSize="GetFrom.pagesize" :total="GetFrom.total" size="mini" show-total
                            show-page-size :page-size-options="[50, 100, 200, 500, 1000]" />
                    </template>
                </a-table>
            </div>
        </div>

        <a-drawer :width="540" :visible="visible" @ok="editUserInfo" @cancel="() => {
            visible = false
        }" unmountOnClose title="用户详情信息">
            <div>
                <a-form style="margin: 0 auto;" :model="form">
                    <a-form-item field="name" label="头像">
                        <Upimg :src="info.n_avatar" width="100" height="100" @success="(e) => {
                            info.n_avatar = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="name" label="背景">
                        <Upimg :src="info.n_userback" width="300" height="100" @success="(e) => {
                            info.n_userback = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="name" label="昵称">
                        <a-input v-model="info.n_nickname" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="签名">
                        <a-input v-model="info.n_signature" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="邮箱">
                        <a-input v-model="info.n_username" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="积分">
                        <a-input v-model="info.n_points" placeholder="请输入" />
                    </a-form-item>
                     <a-form-item field="post" label="余额">
                        <a-input v-model="info.n_balance" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="编码">
                        <a-input v-model="info.n_encoding" placeholder="请输入" />
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
    const res = await useApiFetch().post('/api/userlist', GetFrom.value)
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
        title: '头像',
        slotName: 'n_avatar',
        width: 60,
    },
    {
        title: '名称',
        dataIndex: 'n_nickname',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
{
        title: '邮箱',
        dataIndex: 'n_username',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '注册时间',
        dataIndex: 'n_registertime',
        width: 150,
    },
    {
        title: '用户积分',
        dataIndex: 'n_points',
        width: 150,
    },
    {
        title: '编码',
        dataIndex: 'n_encoding',
        width: 150,
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
    const res = await useApiFetch().post('/api/deluser', {
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
/* 编辑用户信息 edituserinfo */
const editUserInfo = async () => {
    const res = await useApiFetch().post('/api/edituser', info.value)
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
