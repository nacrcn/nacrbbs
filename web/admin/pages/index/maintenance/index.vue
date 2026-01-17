<template>
    <div>
        <div class="Page">
            <a-page-header title="导航维护管理" :show-back="false">
                <template #subtitle>
                </template>
            </a-page-header>
            <div class="Pagecontent">
                <div>

                    <a-space style="margin-bottom: 10px;">
                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetNavList()">检索</a-button>
                        <a-button type="primary" @click="type = 1, info = { n_fid: 0 }, visible = true">新增导航</a-button>
                    </a-space>

                    <a-table :columns="columns" :data="NavList" :pagination="false" :loading="loading"
                        @row-click="changeNav" :draggable="{ type: 'handle', width: 40 }" @change="handleNavListChange"
                        :scroll="{
                            y: 'calc(100vh - 190px)',
                            x: '100%'
                        }">
                        <template #n_avatar="{ record }">
                            <a-avatar :size="24">
                                <img alt="avatar" :src="record.n_avatar" />
                            </a-avatar>
                        </template>
                        <template #xu_downsize="{ record }">
                            <a-tag color="arcoblue">
                                <template #icon>
                                    <icon-to-bottom />
                                </template>
                                {{ record.xu_downsize ?? 0 }}
                            </a-tag>
                        </template>

                        <template #console="{ record }">
                            <a-space @click.stop>
                                <a-button size="mini" @click="type = 2, info = { ...record }, visible = true"
                                    type="primary">编辑</a-button>
                                <a-popconfirm content="确认要删除此数据？删除后将无法恢复" type="error"
                                    @ok="() => { delUser(record.id) }" position="bottom">
                                    <a-button size="mini" type="primary" status="danger">删除</a-button>

                                </a-popconfirm>
                            </a-space>
                        </template>
                        <template #footer>
                            <a-pagination @change="GetNavList" @page-size-change="GetNavList"
                                v-model:current="GetFrom.page" v-model:pageSize="GetFrom.pagesize"
                                :total="GetFrom.total" size="mini" show-total show-page-size
                                :page-size-options="[50, 100, 200, 500, 1000]" />
                        </template>
                    </a-table>
                </div>

                <div>
                    <a-space style="margin-bottom: 10px;">
                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="getSecondNav()">检索</a-button>
                        <a-button type="primary"
                            @click="type = 1, info = { n_fid: SecondFrom.fid }, visible = true">新增导航</a-button>
                    </a-space>

                    <a-table :columns="columns" :data="SecondNav" :pagination="false" :loading="loading"
                        @change="handleSecondNavChange" :draggable="{ type: 'handle', width: 40 }" :scroll="{
                            y: 'calc(100vh - 190px)',
                            x: '100%'
                        }">
                        <template #n_avatar="{ record }">
                            <a-avatar :size="24">
                                <img alt="avatar" :src="record.n_avatar" />
                            </a-avatar>
                        </template>
                        <template #xu_downsize="{ record }">
                            <a-tag color="arcoblue">
                                <template #icon>
                                    <icon-to-bottom />
                                </template>
                                {{ record.xu_downsize ?? 0 }}
                            </a-tag>
                        </template>

                        <template #console="{ record }">
                            <a-space>
                                <a-button size="mini" @click="type = 2, info = { ...record }, visible = true"
                                    type="primary">编辑</a-button>
                                <a-popconfirm content="确认要删除此数据？删除后将无法恢复" type="error"
                                    @ok="() => { delUser(record.id) }" position="bottom">
                                    <a-button size="mini" type="primary" status="danger">删除</a-button>

                                </a-popconfirm>
                            </a-space>
                        </template>
                        <template #footer>
                            <a-pagination @change="GetNavList" @page-size-change="GetNavList"
                                v-model:current="GetFrom.page" v-model:pageSize="GetFrom.pagesize"
                                :total="GetFrom.total" size="mini" show-total show-page-size
                                :page-size-options="[50, 100, 200, 500, 1000]" />
                        </template>
                    </a-table>
                </div>
            </div>
        </div>

        <a-drawer :width="540" :visible="visible" @ok="editUserInfo" @cancel="() => {
            visible = false
        }" unmountOnClose title="导航信息设置">
            <div>
                <a-form style="margin: 0 auto;" :model="form">
                    <a-form-item field="name" label="图标">
                        <Upimg :src="info.n_icon" width="100" height="100" @success="(e) => {
                            info.n_avatar = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="name" label="名称">
                        <a-input v-model="info.n_name" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="类型">
                        <a-select v-model="info.n_type" placeholder="请选择">
                            <a-option value="1">内部页面</a-option>
                            <a-option value="2">外部页面</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="post" label="路径">
                        <a-input v-model="info.n_path" placeholder="请输入" />
                    </a-form-item>
                </a-form>
            </div>
        </a-drawer>

    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
import { data } from 'autoprefixer';
/* 获取应用列表信息 */
const NavList = ref([])
const GetFrom = ref({
    fid: 0
})
const loading = ref(false)
const GetNavList = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/getNavList', GetFrom.value)
    if (res.code === 200) {
        NavList.value = res.data
        SecondFrom.value.fid = res.data[0].id
        getSecondNav()
        GetFrom.value.total = res.total
    } else {
        Message.error(res.msg)
    }
    loading.value = false
}
const handleNavListChange = (_data) => {
    console.log(_data);
    NavList.value = _data

    for (let a in _data) {
        useApiFetch().post('/api/editNavigation', {
            ..._data[a], n_index: a
        })
    }
}

/* 切换 */
const changeNav = (info) => {
    SecondFrom.value.fid = info.id
    getSecondNav()
}

/* 获取子菜单 */
const SecondFrom = ref({
    fid: 0,
    search: ''
})
const SecondNav = ref([])
const getSecondNav = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/getNavList', SecondFrom.value)
    if (res.code == 200) {
        SecondNav.value = res.data
    }
    loading.value = false
}
const handleSecondNavChange = (_data) => {
    console.log(_data);
    SecondNav.value = _data

    for (let a in _data) {
        useApiFetch().post('/api/editNavigation', {
            ..._data[a], n_index: a
        })
    }
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
        title: '类型',
        dataIndex: 'n_type',
        width: 150,
    },
    {
        title: '路径',
        dataIndex: 'n_path',
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
    const res = await useApiFetch().post('/api/delNavigation', {
        id
    })
    if (res.code === 200) {
        Message.success('删除成功')
        GetNavList()
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
    delete info.value.n_fid_list
    if (type.value == 1) {
        res = await useApiFetch().post('/api/addNavigation', info.value)
    } else {
        res = await useApiFetch().post('/api/editNavigation', info.value)
    }
    if (res.code === 200) {
        Message.success('成功')
        visible.value = false
        GetNavList()
        getSecondNav()
    } else {
        Message.error(res.msg)
    }

}



onMounted(() => {
    GetNavList()
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
        display: flex;
        gap: 10px;
    }

}
</style>
