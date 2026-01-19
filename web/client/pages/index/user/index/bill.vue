<template>
    <div>
        <div class="Page">
            <a-page-header title="我的账单" :show-back="false">
                <template #subtitle>
                    <a-space>
                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetUserList()">检索</a-button>
                    </a-space>
                </template>

            </a-page-header>
            <div class="Pagecontent">
                <a-tabs v-model:active-key="GetFrom.status" @change="handleTabChange">
                    <a-tab-pane key="1" title="积分账单"></a-tab-pane>
                    <a-tab-pane key="2" title="余额账单"></a-tab-pane>
                    <a-tab-pane key="3" title="提现记录"></a-tab-pane>
                </a-tabs>
                <!-- 积分/余额账单 -->
                <a-table v-if="GetFrom.status != '3'" style="height: calc(100vh - 230px);" :columns="columns" :data="UserList" :pagination="false"
                    :loading="loading" class="bill-table">
                    <template #n_type="{ record }">
                        <a-tag v-if="record.n_type == 1" color="arcoblue">
                            <template #icon>
                                <icon-arrow-rise />
                            </template>
                            收入
                        </a-tag>
                        <a-tag v-else color="orangered">
                            <template #icon>
                                <icon-arrow-fall />
                            </template>
                            支出
                        </a-tag>
                    </template>
                    <template #n_amount="{ record }">
                        <span :class="record.n_type == 1 ? 'amount-income' : 'amount-expense'">
                            {{ record.n_type == 1 ? '+' : '-' }}{{ record.n_amount }}
                        </span>
                    </template>
                    <template #footer>
                        <a-pagination @change="GetUserList" @page-size-change="GetUserList"
                            v-model:current="GetFrom.page" v-model:pageSize="GetFrom.pagesize" :total="GetFrom.total"
                            size="mini" show-total show-page-size :page-size-options="[50, 100, 200, 500, 1000]" />
                    </template>
                </a-table>

                <!-- 提现记录 -->
                <a-table v-if="GetFrom.status == '3'" style="height: calc(100vh - 230px);" :columns="withdrawColumns" :data="Wlist" :pagination="false"
                    :loading="loading" class="bill-table">
                    <template #n_type="{ record }">
                        <a-tag v-if="record.n_type == '1'" color="blue">待审核</a-tag>
                        <a-tag v-else-if="record.n_type == '2'" color="green">已打款</a-tag>
                        <a-tag v-else-if="record.n_type == '3'" color="red">已驳回</a-tag>
                        <a-tag v-else color="gray">未知</a-tag>
                    </template>
                    <template #footer>
                        <a-pagination @change="GetWithdrawList" @page-size-change="GetWithdrawList"
                            v-model:current="Getrom.page" v-model:pageSize="Getrom.pagesize" :total="Getrom.total"
                            size="mini" show-total show-page-size :page-size-options="[20, 50, 100]" />
                    </template>
                </a-table>
            </div>
        </div>

    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
/* 获取应用列表信息 */
const UserList = ref([])
const GetFrom = ref({
    page: 1,
    pagesize: 20,
    status: 1,
    total: 0
})
const loading = ref(false)
const GetUserList = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/getuserbill', GetFrom.value)
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
        title: '时间',
        dataIndex: 'n_time',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '金额',
        dataIndex: 'n_amount',
    },
    {
        title: '去向',
        dataIndex: 'n_name',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '权重',
        slotName: 'n_type',
    },

];

/* 获取提现记录 GetWithdrawList */
const Wlist = ref([])
const Getrom = ref({
    page: 1,
    pagesize: 20,
    total: 0
})
const GetWithdrawList = async () => {
    const res = await useApiFetch().post('/api/GetWithdrawList', Getrom.value)
    if (res.code === 200) {
        Wlist.value = res.data
        Getrom.value.total = res.total
    } else {
        Message.error(res.msg)
    }
}

// 提现记录表格列
const withdrawColumns = [
    {
        title: '申请时间',
        dataIndex: 'n_time',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '订单号',
        dataIndex: 'n_no',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '提现金额',
        dataIndex: 'n_amount',
    },
    {
        title: '手续费',
        dataIndex: 'n_handling_fee',
    },
    {
        title: '实际到账',
        dataIndex: 'n_received',
    },
    {
        title: '收款账号',
        dataIndex: 'n_acc',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '状态',
        slotName: 'n_type',
    },
    {
        title: '到账时间',
        dataIndex: 'n_oktime',
        ellipsis: true,
        tooltip: true,
    },
];

// 切换 tab
const handleTabChange = (key) => {
    GetFrom.value.status = key
    if (key === '3') {
        GetWithdrawList()
    } else {
        GetFrom.value.page = 1
        GetUserList()
    }
}
onMounted(() => {
    GetUserList()
    GetWithdrawList()
})
</script>

<style lang="scss" scoped>
.Page {
    background-color: #fff;
    margin: 1px;
    width: calc(100% - 2px);
    border-radius: 20px;

    .Pagecontent {
        width: calc(100% - 20px);
        padding: 10px;
    }
}

// 表格样式优化
:deep(.bill-table) {
    .arco-table {
        border-radius: 12px;
        overflow: hidden;

        thead {
            background: linear-gradient(135deg, #f5f7fa, #ffffff);

            .arco-table-th {
                background-color: transparent;
                font-weight: 600;
                color: #333;
                padding: 16px 12px;

                &:first-child {
                    border-top-left-radius: 12px;
                }

                &:last-child {
                    border-top-right-radius: 12px;
                }
            }
        }

        tbody {
            tr {
                transition: all 0.3s ease;

                &:hover {
                    background-color: #f5f7fa;
                    transform: scale(1.005);
                }

                td {
                    padding: 14px 12px;
                    border-bottom: 1px solid #f0f0f0;
                }

                &:last-child {
                    td {
                        border-bottom: none;
                    }
                }
            }
        }

        .arco-table-empty {
            padding: 60px 20px;
            color: #999;
            font-size: 14px;

            .arco-empty-icon {
                font-size: 48px;
                margin-bottom: 16px;
                opacity: 0.3;
            }
        }
    }
}

// 金额样式
.amount-income {
    color: #00b42a;
    font-weight: 600;
    font-size: 15px;
}

.amount-expense {
    color: #f53f3f;
    font-weight: 600;
    font-size: 15px;
}
</style>
