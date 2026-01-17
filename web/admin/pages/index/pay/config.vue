<template>
    <div>
        <div class="Page">
            <a-page-header title="支付配置" :show-back="false">
                <template #subtitle>
                    <a-space>

                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetPayPluglist()">检索</a-button>
                        <a-button type="primary" @click="type = 1, info = {}, visible = true">新增配置</a-button>
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
                    <template #n_qq="{ record }">
                        <a-tag v-if="record.n_qq === '1'" color="arcoblue">正常</a-tag>
                        <a-tag v-else color="red">禁用</a-tag>
                    </template>
                    <template #n_wx="{ record }">
                        <a-tag v-if="record.n_wx === '1'" color="arcoblue">正常</a-tag>
                        <a-tag v-else color="red">禁用</a-tag>
                    </template>
                    <template #n_ali="{ record }">
                        <a-tag v-if="record.n_ali === '1'" color="arcoblue">正常</a-tag>
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

        <a-drawer :width="740" :visible="visible" @ok="editfun" @cancel="() => {
            visible = false
        }" unmountOnClose title="支付配置详情">
            <div>
                <a-form style="margin: 0 auto;" :model="form">
                    <a-form-item label="名称">
                        <a-input v-model="info.n_name" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item label="编码">
                        <a-input v-model="info.n_code" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item label="状态">
                        <a-radio-group v-model="info.n_off">
                            <a-radio value="1">正常</a-radio>
                            <a-radio value="0">禁用</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="qq支付">
                        <a-radio-group v-model="info.n_qq">
                            <a-radio value="1">正常</a-radio>
                            <a-radio value="0">禁用</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="微信支付">
                        <a-radio-group v-model="info.n_wx">
                            <a-radio value="1">正常</a-radio>
                            <a-radio value="0">禁用</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="支付宝支付">
                        <a-radio-group v-model="info.n_ali">
                            <a-radio value="1">正常</a-radio>
                            <a-radio value="0">禁用</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-divider orientation="center">配置信息</a-divider>
                    <a-form-item label="配置信息">
                        <a-button type="primary" @click="()=>{
                            if(info.n_config){
                                info.n_config.push({})
                            }else{
                                info.n_config = [{}]
                            }
                        }">新增配置</a-button>
                    </a-form-item>
                    <a-table :columns="columnsConfig" :data="info.n_config" :pagination="false" :loading="loading"
                        :scroll="{
                            x: '100%'
                        }">
                        <template #name="{ record }">
                              <a-input v-model="record.name" placeholder="请输入" />
                        </template>
                         <template #key="{ record }">
                              <a-input v-model="record.key" placeholder="请输入" />
                        </template>
                         <template #value="{ record }">
                              <a-input v-model="record.value" placeholder="请输入" />
                        </template>
                        <template #console="{ record,rowIndex }">
                            <a-space>
                                <a-popconfirm content="确认要删除此数据？删除后将无法恢复" type="error"
                                    @ok="() => { info.n_config.splice(rowIndex, 1)}" position="bottom">
                                    <a-button size="mini" type="primary" status="danger">删除</a-button>
                                </a-popconfirm>
                            </a-space>
                        </template>
                        <template #footer>

                        </template>
                    </a-table>
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
        title: '修改时间',
        dataIndex: 'n_time',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '是否启用',
        slotName: 'n_off',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: 'QQ启用',
        slotName: 'n_qq',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '微信启用',
        slotName: 'n_wx',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '支付宝启用',
        slotName: 'n_ali',
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



const columnsConfig = [
    {
        title: '名称',
        slotName: 'name',
        width: 100,
    },
    {
        title: '编码',
        slotName: 'key',
        width: 100,
    },
    {
        title: '内容',
        slotName: 'value',
        width: 200,
    },
    {
        title: '操作',
        dataIndex: 'console',
        slotName: 'console',
        width: 70,
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
    const res = await useApiFetch().post('/api/getPayConfig', GetFrom.value);
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
        res = await useApiFetch().post('/api/addPayConfig', {
            ...info.value,
            n_config: JSON.stringify(info.value.n_config)
        });
    } else {
        res = await useApiFetch().post('/api/editPayConfig', {
            ...info.value,
            n_config: JSON.stringify(info.value.n_config)
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
    const res = await useApiFetch().post('/api/delPayConfig', {
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