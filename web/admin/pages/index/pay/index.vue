<template>
    <div>
        <div class="Page">
            <a-page-header title="支付订单" :show-back="false">
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
                }">
                    <template #n_type="{ record }">
                        <a-tag v-if="record.n_type === '1'" color="red">待支付</a-tag>
                        <a-tag v-if="record.n_type === '2'" color="arcoblue">已支付</a-tag>
                    </template>

                    <template #console="{ record }">
                        <a-space>
                            <a-button size="mini" @click="GetOrderInfo(record.id)" type="primary">订单详情</a-button>
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
        <!-- 订单详情抽屉 -->
        <a-drawer :width="800" :visible="orderVisible" @cancel="() => {
            orderVisible = false
        }" :footer="false" unmountOnClose title="订单详情">
            <div v-if="OrderInfo.id" class="order-detail">
                <!-- 订单基本信息 -->
                <a-card title="订单信息" class="order-card">
                    <a-descriptions :column="2" bordered>
                        <a-descriptions-item label="订单号">
                            <a-typography-text copyable>{{ OrderInfo.n_no }}</a-typography-text>
                        </a-descriptions-item>
                        <a-descriptions-item label="订单状态">
                            <a-space>
                                <a-tag v-if="OrderInfo.n_type === '1'" color="red">待支付</a-tag>
                                <a-tag v-if="OrderInfo.n_type === '2'" color="arcoblue">已支付</a-tag>

                                <a-popconfirm content="确认要删除此数据？删除后将无法恢复" type="error"
                                    @ok="() => { upPayNotify(OrderInfo.n_no) }" position="bottom">
                                    <a-button v-if="OrderInfo.n_type === '1'" size="mini" type="primary">
                                        <template #icon>
                                            <icon-loop />
                                        </template>
                                        重新回调</a-button>
                                </a-popconfirm>

                            </a-space>

                        </a-descriptions-item>
                        <a-descriptions-item label="订单金额">
                            <a-typography-text type="danger" strong>¥{{ OrderInfo.n_amount }}</a-typography-text>
                        </a-descriptions-item>

                        <a-descriptions-item label="支付设备">
                            <a-tag v-if="OrderInfo.n_paydevice === '1'">PC端</a-tag>
                            <a-tag v-if="OrderInfo.n_paydevice === '2'">移动端</a-tag>
                        </a-descriptions-item>
                        <a-descriptions-item label="支付编码">
                            <a-typography-text>{{ OrderInfo.n_paycode }}</a-typography-text>
                        </a-descriptions-item>
                        <a-descriptions-item label="创建时间">
                            <a-typography-text>{{ OrderInfo.n_creatertime }}</a-typography-text>
                        </a-descriptions-item>
                        <a-descriptions-item label="支付时间">
                            <a-typography-text :type="OrderInfo.n_paytime ? 'success' : 'secondary'">
                                {{ OrderInfo.n_paytime || '未支付' }}
                            </a-typography-text>
                        </a-descriptions-item>
                        <a-descriptions-item label="用户昵称">
                            <a-typography-text strong>{{ OrderInfo.n_user_nickname }}</a-typography-text>
                        </a-descriptions-item>
                        <a-descriptions-item label="用户邮箱">
                            <a-typography-text strong>{{ OrderInfo.n_user_username }}</a-typography-text>
                        </a-descriptions-item>
                    </a-descriptions>
                </a-card>

                <!-- 订单商品信息 -->
                <a-card title="商品信息" class="order-card">
                    <a-table :data="OrderInfo.n_item || []" :pagination="false" :columns="itemColumns" size="small">
                        <template #n_type="{ record }">
                            <a-tag v-if="record.n_type === '1'" color="blue">积分充值</a-tag>
                            <a-tag v-if="record.n_type === '2'" color="green">会员开通</a-tag>
                            <a-tag v-if="record.n_type === '3'" color="orange">购买商品</a-tag>
                        </template>
                        <template #n_price="{ record }">
                            <a-typography-text type="danger">¥{{ record.n_price }}</a-typography-text>
                        </template>
                    </a-table>
                </a-card>

                <!-- 订单原始数据 -->
                <a-card title="原始数据" class="order-card">
                    <a-tabs default-active-key="formatted">
                        <a-tab-pane key="formatted" title="格式化数据">
                            <div class="data-display">
                                <pre>{{ JSON.stringify(parseOrderFrom(), null, 2) }}</pre>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="raw" title="原始数据">
                            <div class="data-display">
                                <pre>{{ OrderInfo.n_from }}</pre>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </a-card>


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
    const res = await useApiFetch().post('/api/getPayOrder', GetFrom.value)
    if (res.code === 200) {
        UserList.value = res.data
        GetFrom.value.total = res.total
    } else {
        Message.error(res.msg)
    }
    loading.value = false
}


/* 获取订单详情 */
const OrderInfo = ref({})
const orderVisible = ref(false)

const GetOrderInfo = async (id) => {
    const res = await useApiFetch().post('/api/getPayOrder', {
        id: id ?? OrderInfo.value.id
    })
    if (res.code === 200) {
        orderVisible.value = true
        OrderInfo.value = res.data
    } else {
        Message.error(res.msg)
    }
}

/* 商品表格列定义 */
const itemColumns = [
    {
        title: '商品ID',
        dataIndex: 'id',
        width: 80,
    },
    {
        title: '商品名称',
        dataIndex: 'n_name',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '数量',
        dataIndex: 'n_number',
        width: 80,
    },
    {
        title: '单价',
        slotName: 'n_price',
        width: 100,
    },
    {
        title: '类型',
        slotName: 'n_type',
        width: 100,
    }
]

/* 解析订单原始数据 */
const parseOrderFrom = () => {
    try {
        return JSON.parse(OrderInfo.value.n_from || '[]')
    } catch (error) {
        console.error('解析订单原始数据失败:', error)
        return []
    }
}



const columns = [
    {
        title: '订单号',
        dataIndex: 'n_no',
        width: 100,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '支付状态',
        slotName: 'n_type',
        width: 80,
    },
    {
        title: '订单金额',
        dataIndex: 'n_amount',
        width: 80,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '所属用户',
        dataIndex: 'n_user_nickname',
        width: 80,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '用户账号',
        dataIndex: 'n_user_username',
        width: 80,
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '创建时间',
        dataIndex: 'n_creatertime',
        width: 150,
    },
    {
        title: '支付时间',
        dataIndex: 'n_paytime',
        width: 150,
    },
    {
        title: '支付编码',
        dataIndex: 'n_paycode',
        width: 150,
    },
    {
        title: '操作',
        dataIndex: 'console',
        slotName: 'console',
        width: 210,
        fixed: 'right',
    },
];



/* 删除应用信息 delapp */
const delUser = async (id) => {
    const res = await useApiFetch().post('/api/delePayOrder', {
        id
    })
    if (res.code === 200) {
        Message.success('删除成功')
        GetUserList()
    } else {
        Message.error(res.msg)
    }
}

/* 手动回调 upPayNotify */
const upPayNotify = async (id) => {
    const res = await useApiFetch().post('/api/upPayNotify', {
        out_trade_no: id
    })
    if (res.code === 200) {
        Message.success('回调成功')
        GetUserList()
        GetOrderInfo()
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

.order-detail {
    .order-card {
        margin-bottom: 16px;

        :deep(.arco-card-header) {
            border-bottom: 2px solid var(--color-primary-light-3);
            background: linear-gradient(90deg, var(--color-primary-light-1) 0%, var(--color-bg-2) 100%);

            .arco-card-header-title {
                font-weight: 600;
                font-size: 16px;
            }
        }

        :deep(.arco-card-body) {
            padding: 20px;
        }
    }

    .data-display {
        background-color: var(--color-bg-2);
        border: 1px solid var(--color-border-2);
        border-radius: 6px;
        padding: 16px;
        max-height: 300px;
        overflow-y: auto;

        pre {
            margin: 0;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 12px;
            line-height: 1.5;
            color: var(--color-text-1);
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    }

    .order-actions {
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid var(--color-border-2);
        text-align: center;

        .arco-btn {
            margin: 0 8px;
            border-radius: 6px;
            font-weight: 500;

            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
        }
    }
}

:deep(.arco-descriptions-item) {
    padding: 12px 16px;

    .arco-descriptions-item-label {
        font-weight: 600;
        color: var(--color-text-2);
        background-color: var(--color-bg-2);
        border-radius: 4px;
        padding: 4px 8px;
        margin-right: 8px;
        min-width: 80px;
        text-align: center;
    }

    .arco-descriptions-item-value {
        font-weight: 500;
    }
}

:deep(.arco-table) {
    .arco-table-th {
        background-color: var(--color-bg-2);
        font-weight: 600;
    }

    .arco-table-td {
        padding: 8px 12px;
    }
}

:deep(.arco-tabs-nav-tab) {
    font-weight: 500;

    &.arco-tabs-nav-tab-active {
        color: var(--color-primary-6);
        font-weight: 600;
    }
}

@media (max-width: 768px) {
    .order-detail {
        .order-card {
            margin-bottom: 12px;

            :deep(.arco-card-body) {
                padding: 16px;
            }
        }

        .data-display {
            max-height: 200px;
            padding: 12px;

            pre {
                font-size: 11px;
            }
        }

        .order-actions {
            .arco-btn {
                margin: 4px;
                font-size: 12px;
                padding: 4px 12px;
            }
        }
    }
}
</style>
