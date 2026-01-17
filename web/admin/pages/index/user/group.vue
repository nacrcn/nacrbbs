<template>
    <div>
        <div class="Page">
            <a-page-header title="用户组管理" :show-back="false">
                <template #subtitle>
                    <a-space>

                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetUserList()">检索</a-button>
                        <a-button type="primary" @click="info = {}, visible = true, type = 1">新增用户组</a-button>
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

                    <template #n_deft="{ record }">
                        <a-tag checkable color="#00b42a" v-if="record.n_deft == 1">默认用户组</a-tag>
                        <a-tag checkable color="#0fc6c2" v-else @click="deftUserGroup(record.id)">非默认</a-tag>
                    </template>

                    <template #console="{ record }">
                        <a-space>
                            <a-button size="mini" style="background-color: #0fc6c2;"
                                @click="info = record, GetPriceList(), PriceShow = true" type="primary">价格管理</a-button>
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

        <a-drawer :width="540" :visible="visible" @ok="editUserInfo" @cancel="() => {
            visible = false
        }" unmountOnClose title="用户组信息管理">
            <div>
                <a-form style="margin: 0 auto;" :model="form">
                    <a-form-item field="name" label="图标">
                        <Upimg :src="info.n_icon" width="100" height="100" @success="(e) => {
                            info.n_icon = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="name" label="名侧小图标">
                        <Upimg :src="info.n_mini_icon" width="100" height="100" @success="(e) => {
                            info.n_mini_icon = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="name" label="信侧大图标">
                        <Upimg :src="info.n_info_icon" width="100" height="100" @success="(e) => {
                            info.n_info_icon = e
                        }"></Upimg>
                    </a-form-item>
                    <a-form-item field="name" label="背景图片">
                        <Upimg :src="info.n_back_image" width="300" height="100" @success="(e) => {
                            info.n_back_image = e
                        }"></Upimg>
                    </a-form-item>


                    <a-form-item field="name" label="名称">
                        <a-input v-model="info.n_name" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="手续费(%)">
                        <a-input v-model="info.n_withdrawal_fee" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="提现单笔最小">
                        <a-input v-model="info.n_withdrawal_min" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="提现单笔最大">
                        <a-input v-model="info.n_withdrawal_max" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="背景颜色">
                        <a-color-picker defaultValue="#165DFF" showHistory showPreset v-model="info.n_back" />
                    </a-form-item>
                    <a-form-item field="post" label="字体颜色">
                        <a-color-picker defaultValue="#FFFFFF" showHistory showPreset v-model="info.n_text_color" />
                    </a-form-item>
                    <a-form-item field="post" label="简介">
                        <a-input v-model="info.n_note" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="post" label="权重">
                        <a-input v-model="info.n_sort" placeholder="请输入" />
                    </a-form-item>
                </a-form>
            </div>
        </a-drawer>


        <a-drawer :width="1240" :visible="PriceShow" @ok="() => { PriceShow = false }" @cancel="() => {
            PriceShow = false
        }" unmountOnClose title="价格管理">
            <div>
                <!-- 添加价格 -->
                <a-button type="primary" @click="addPrice()">添加价格</a-button>
                <a-table :columns="Pricecolumns" :data="PriceList" :pagination="false" :loading="Priceloading">
                    <template #n_price="{ record }">
                        <a-input v-model="record.n_price" placeholder="请输入" />
                    </template>
                    <template #n_strikethroughprice="{ record }">
                        <a-input v-model="record.n_strikethroughprice" placeholder="请输入" />
                    </template>
                    <template #n_points="{ record }">
                        <a-input v-model="record.n_points" placeholder="请输入" />
                    </template>
                    <template #n_give="{ record }">
                        <a-input v-model="record.n_give" placeholder="请输入" />
                    </template>
                    <template #n_day="{ record }">
                        <a-input v-model="record.n_day" placeholder="请输入" />
                    </template>
                    <template #n_sort="{ record }">
                        <a-input v-model="record.n_sort" placeholder="请输入" />
                    </template>
                    <template #console="{ record, rowIndex }">
                        <a-space>
                            <!-- 确定编辑 -->
                            <a-button size="mini" @click="editPrice(rowIndex)" type="primary">确定</a-button>

                            <a-popconfirm content="确认要删除此数据？删除后将无法恢复" type="error" @ok="() => { delPrice(record.id) }"
                                position="bottom">
                                <a-button size="mini" type="primary" status="danger">删除</a-button>
                            </a-popconfirm>
                        </a-space>
                    </template>
                    <template #footer>

                    </template>
                </a-table>
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
    const res = await useApiFetch().post('/api/usergroup', GetFrom.value)
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
    },
    {
        title: '名称',
        dataIndex: 'n_name',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '默认',
        slotName: 'n_deft',
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
    const res = await useApiFetch().post('/api/delusergroup', {
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
        res = await useApiFetch().post('/api/addusergroup', info.value)
    } else {
        res = await useApiFetch().post('/api/editusergroup', info.value)
    }
    if (res.code === 200) {
        Message.success('编辑成功')
        visible.value = false
        GetUserList()
    } else {
        Message.error(res.msg)
    }

}

/* 设置默认用户组 deftusergroup */
const deftUserGroup = async (id) => {
    const res = await useApiFetch().post('/api/deftusergroup', {
        id
    })
    if (res.code === 200) {
        Message.success('设置成功')
        GetUserList()
    } else {
        Message.error(res.msg)
    }
}


const PriceShow = ref(false)
const Pricecolumns = [
    {
        title: '价格',
        slotName: 'n_price',
    },

    {
        title: '划线价',
        slotName: 'n_strikethroughprice',
    },
    {
        title: '积分价格',
        slotName: 'n_points',
    },
    {
        title: '赠送积分',
        slotName: 'n_give',
    },
    {
        title: '时长(天)',
        slotName: 'n_day',
    },
    {
        title: '权重',
        slotName: 'n_sort',
    },
    {
        title: '操作',
        dataIndex: 'console',
        slotName: 'console',
        width: 220,
        fixed: 'right',
    },
];

/* 获取价格列表信息 */
const PriceList = ref([])
const GetPriceFrom = ref({
    page: 1,
    pagesize: 999,
})
const Priceloading = ref(false)
const GetPriceList = async () => {
    Priceloading.value = true
    GetPriceFrom.value.n_gid = info.value.id
    const res = await useApiFetch().post('/api/usergroup_price', GetPriceFrom.value)
    if (res.code === 200) {
        PriceList.value = res.data
    } else {
        Message.error(res.msg)
    }
    Priceloading.value = false
}

/* 删除价格信息 delusergroup_price */
const delPrice = async (id) => {
    const res = await useApiFetch().post('/api/delusergroup_price', {
        id
    })
    if (res.code === 200) {
        Message.success('删除成功')
        GetPriceList()
    } else {
        Message.error(res.msg)
    }
}

/* 编辑、添加价格信息 editusergroup_price */
const editPrice = async (record) => {
    const res = await useApiFetch().post('/api/editusergroup_price', PriceList.value[record])
    if (res.code === 200) {
        Message.success('编辑成功')
        GetPriceList()
    } else {
        Message.error(res.msg)
    }
}

/* 添加价格信息 addusergroup_price */
const addPrice = async () => {
    const res = await useApiFetch().post('/api/addusergroup_price', {
        n_gid: info.value.id
    })
    if (res.code === 200) {
        Message.success('添加成功')
        GetPriceList()
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
