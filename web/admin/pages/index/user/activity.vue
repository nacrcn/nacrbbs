<template>
    <div>
        <div class="Page">
            <a-page-header title="活动管理" :show-back="false">
                <template #subtitle>
                    <a-space>

                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetUserList()">检索</a-button>
                        <a-button type="primary" @click="type = 1, info = {}, visible = true">新增活动</a-button>
                    </a-space>
                </template>

            </a-page-header>
            <div class="Pagecontent">
                <a-table :columns="columns" :data="UserList" :pagination="false" :loading="loading" :scroll="{
                    y: 'calc(100vh - 190px)',
                    x: '100%'
                }"   @change="handleSecondNavChange" :draggable="{ type: 'handle', width: 40 }">
                    <template #n_icon="{ record }">
                        <a-avatar :size="24">
                            <img alt="avatar" :src="record.n_icon" />
                        </a-avatar>
                    </template>
                    <template #n_off="{ record }">
                        <a-tag v-if="record.n_off === '1'" color="arcoblue">正常</a-tag>
                        <a-tag v-if="record.n_off === '2'" color="red">已关闭</a-tag>
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
        }" unmountOnClose title="新增活动信息">
            <div>
                <a-form style="margin: 0 auto;" :model="form">
                    <a-form-item field="name" label="图标">
                        <Upimg :src="info.n_icon" width="100" height="100" @success="(e) => {
                            info.n_icon = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="name" label="名称">
                        <a-input v-model="info.n_name" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="编码">
                        <a-input v-model="info.n_code" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="简介">
                        <a-input v-model="info.n_note" placeholder="请输入" />
                    </a-form-item>

                    <a-form-item field="post" label="活动路径">
                        <a-input v-model="info.n_path" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="按钮文字">
                        <a-input v-model="info.n_buttext" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item label="状态">
                        <a-radio-group v-model="info.n_off">
                            <a-radio value="1">开启</a-radio>
                            <a-radio value="2">关闭</a-radio>
                        </a-radio-group>
                    </a-form-item>

                    <a-divider orientation="center">奖励设置</a-divider>
                    <a-form-item label="类型">
                        <a-radio-group v-model="info.n_reward_type">
                            <a-radio value="1">积分</a-radio>
                            <a-radio value="2">余额</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="配置信息">
                        <a-button type="primary" @click="() => {
                            if (info.n_reward_config) {
                                info.n_reward_config.push({})
                            } else {
                                info.n_reward_config = [{}]
                            }
                        }">新增配置</a-button>
                    </a-form-item>
                    <a-table :columns="columnsConfig" :data="info.n_reward_config" :pagination="false"
                        :loading="loading" :scroll="{
                            x: '100%'
                        }">
                        <template #min="{ record }">
                            <a-input v-model="record.min" placeholder="请输入" />
                        </template>
                        <template #max="{ record }">
                            <a-input v-model="record.max" placeholder="请输入" />
                        </template>
                        <template #price="{ record }">
                            <a-input v-model="record.price" placeholder="请输入" />
                        </template>
                        <template #float="{ record }">
                            <a-input v-model="record.float" placeholder="请输入" />
                        </template>
                        <template #console="{ record, rowIndex }">
                            <a-space>
                                <a-popconfirm content="确认要删除此数据？删除后将无法恢复" type="error"
                                    @ok="() => { info.n_reward_config.splice(rowIndex, 1) }" position="bottom">
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
    const res = await useApiFetch().post('/api/getActivityList', GetFrom.value)
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
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '编码',
        dataIndex: 'n_code',
        width: 120,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '状态',
        slotName: 'n_off',
        width: 80,
    },
    {
        title: '简介',
        dataIndex: 'n_note',
        width: 200,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '活动路径',
        dataIndex: 'n_path',
        width: 150,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '按钮文字',
        dataIndex: 'n_buttext',
        width: 100,
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
    const res = await useApiFetch().post('/api/deleActivity', {
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
        res = await useApiFetch().post('/api/addActivity', {
            ...info.value,
            n_reward_config: JSON.stringify(info.value.n_reward_config)
        })
    } else {
        res = await useApiFetch().post('/api/editActivity', {
            ...info.value,
            n_reward_config: JSON.stringify(info.value.n_reward_config)
        })
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
            ..._data[a], n_index: a, n_reward_config: JSON.stringify(_data[a].n_reward_config)
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
