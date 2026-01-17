<template>
    <div>
        <div class="Page">
            <a-page-header title="支付方式配置" :show-back="false">
                <template #subtitle>
                    <a-space>

                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetPayPluglist()">检索</a-button>
                        <a-button type="primary" @click="type = 1, info = {}, visible = true">新增方式</a-button>
                    </a-space>
                </template>

            </a-page-header>
            <div class="Pagecontent">
                <a-table :columns="columns" :data="PayPluglist" :pagination="false" :loading="loading" :scroll="{
                    y: 'calc(100vh - 190px)',
                    x: '100%'
                }">
                    <template #n_icon="{ record }">
                        <a-image alt="avatar" width="30" :src="record.n_icon"></a-image>
                    </template>
                    <template #n_off="{ record }">
                        <a-tag v-if="record.n_off === '1'" color="arcoblue">正常</a-tag>
                        <a-tag v-else color="red">禁用</a-tag>
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

                    </template>
                </a-table>
            </div>
        </div>

        <a-drawer :width="540" :visible="visible" @ok="editfun" @cancel="() => {
            visible = false
        }" unmountOnClose title="支付配置详情">
            <div>
                <a-form style="margin: 0 auto;" :model="form">
                    <a-form-item label="图标">
                        <Upimg :src="info.n_icon" width="50px" height="50px" @success="(e) => {
                            info.n_icon = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item label="名称">
                        <a-input v-model="info.n_name" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item label="编码">
                        <a-input v-model="info.n_code" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item label="权限">
                        <a-input v-model="info.n_index" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item label="状态">
                        <a-radio-group v-model="info.n_off">
                            <a-radio value="1">正常</a-radio>
                            <a-radio value="0">禁用</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-form>
            </div>
        </a-drawer>

    </div>
</template>

<script setup>
// import { getepayconfig, editepayconfig } from "@/Request/http";
import { Message } from '@arco-design/web-vue';

const columns = [
    {
        title: '图标',
        slotName: 'n_icon',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '名称',
        dataIndex: 'n_name',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '编码',
        dataIndex: 'n_code',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '权重',
        dataIndex: 'n_index',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '状态',
        slotName: 'n_off',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '操作',
        dataIndex: 'console',
        slotName: 'console',
        width: 130,
        fixed: 'right',
    },
];

const PayPluglist = ref([])
const GetFrom = ref({
    page: 1,
    pagesize: 20,
    xu_exstatus: 2
})
const GetPayPluglist = async () => {
    const res = await useApiFetch().post('/api/GetPayMethodAdmin', GetFrom.value);
    if (res.code == 200) {
        PayPluglist.value = res.data;
        GetFrom.value.total = res.total
    } else {
        Message.error(res.msg);
    }
}

onMounted(() => {
    GetPayPluglist()
})

const visible = ref(false)
const info = ref({})
const type = ref(1)

/* 编辑用户信息 */
const editfun = async () => {

    let res;
    if (type.value == 1) {
        res = await useApiFetch().post('/api/addPaymethod', {
            ...info.value,
        });
    } else {
        res = await useApiFetch().post('/api/editPayMethod', {
            ...info.value,
        });
    }

    visible.value = false
    if (res.code == 200) {
        Message.success('成功！')
    } else {
        Message.error(res.msg);
    }
    GetPayPluglist()

}
/* 删除应用信息 delapp */
const delUser = async (id) => {
    const res = await useApiFetch().post('/api/delPayMethod', {
        id
    })
    if (res.code === 200) {
        Message.success('删除成功')
        GetPayPluglist()
    } else {
        Message.error(res.msg)
    }
}

</script>

<style scoped lang="scss">
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