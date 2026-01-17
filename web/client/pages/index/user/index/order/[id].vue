<template>
    <div class="PayVerifyPage">
        <UserHeader title="订单支付核对"></UserHeader>
        <div class="Page">

            <div class="PageContent">
                <!-- 订单信息卡片 -->
                <a-card title="订单信息" class="order-card">
                    <div class="order-info">
                        <div class="info-row">
                            <span class="label">订单编号：</span>
                            <span class="value">{{ orderDetail.n_no }}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">创建时间：</span>
                            <span class="value">{{ orderDetail.n_creatertime }}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">订单金额：</span>
                            <span class="value price">¥{{ orderDetail.n_amount }}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">订单状态：</span>
                            <a-tag :color="getStatusColor(orderDetail.n_type)">
                                {{ getStatusText(orderDetail.n_type) }}
                            </a-tag>
                        </div>
                    </div>

                    <!-- 商品信息 -->
                    <a-divider>商品详情</a-divider>
                    <div class="items-list" v-if="orderDetail.n_item && orderDetail.n_item.length > 0">
                        <div v-for="item in orderDetail.n_item" :key="item.id" class="item-row">
                            <div class="item-name">{{ item.n_name }}</div>
                            <div class="item-detail">
                                <span>数量：{{ item.n_number }}</span>
                                <span class="item-price">¥{{ item.n_price }}</span>
                            </div>
                        </div>
                    </div>
                </a-card>

                <!-- 支付方式选择 -->
                <a-card title="选择支付方式" class="payment-card" v-if="orderDetail.n_type === '1'">
                    <a-radio-group v-model="selectedPayMethod" direction="vertical" class="payment-methods">
                        <div class="payment-option" v-for="method in payMethods" :key="method.id">
                            <a-radio :value="method.id">
                                <div class="payment-info">
                                    <div class="payment-icon"><img style="width: 25px;" :src="method.n_icon" alt="">
                                    </div>
                                    <div class="payment-details">
                                        <div class="payment-name">{{ method.n_name }}</div>
                                    </div>
                                </div>
                            </a-radio>
                        </div>
                    </a-radio-group>
                </a-card>

                <!-- 支付确认 -->
                <div class="payment-actions" v-if="orderDetail.n_type === '1'">
                    <div class="total-amount">
                        <span class="total-label">应付金额：</span>
                        <span class="total-value">¥{{ orderDetail.n_amount }}</span>
                    </div>
                    <a-space size="large">
                        <a-button size="large" @click="handleBack">返回</a-button>
                        <a-button type="primary" size="large" :loading="paying" @click="handlePayment">
                            确认支付
                        </a-button>
                    </a-space>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue'
const UserInfo = useUserInfo()

const route = useRoute()
const router = useRouter()
    console.log(route);
    
// 订单ID
const orderId = route.params.id

// 订单详情
const orderDetail = ref({})

// 选中的支付方式
const selectedPayMethod = ref('alipay')

// 支付中状态
const paying = ref(false)

// 支付方式选项
const payMethods = ref([

])
/* 获取支付方式 /api/GetPayMethod */
const getPayMethods = async () => {
    try {
        const res = await useApiFetch().post('/api/GetPayMethod',{
            no:orderId
        })
        if (res.code === 200) {
            payMethods.value = res.data
        } else {
            Message.error(res.msg || '获取支付方式失败')
        }
    } catch (error) {
        console.error('获取支付方式失败:', error)
        Message.error('获取支付方式失败')
    }
}
getPayMethods()
const getOrderDetail = async () => {
    try {
        const res = await useApiFetch().post('/api/GetOrder', {
            no: orderId
        })
        if (res.code === 200) {
            orderDetail.value = res.data
        } else {
            Message.error(res.msg || '获取订单详情失败')
        }
    } catch (error) {
        console.error('获取订单详情失败:', error)
        Message.error('获取订单详情失败')
    }
}

// 获取订单状态颜色
const getStatusColor = (type) => {
    const colorMap = {
        '1': 'orange',    // 待支付
        '2': 'green',     // 已支付
        '3': 'red',       // 已取消
        '4': 'blue'       // 已完成
    }
    return colorMap[type] || 'gray'
}

// 获取订单状态文本
const getStatusText = (type) => {
    const textMap = {
        '1': '待支付',
        '2': '已支付',
        '3': '已取消',
        '4': '已完成'
    }
    return textMap[type] || '未知状态'
}

// 返回上一页
const handleBack = () => {
    router.go(-1)
}

// 处理支付
const handlePayment = async () => {
    if (!selectedPayMethod.value) {
        Message.warning('请选择支付方式')
        return
    }

    paying.value = true

    try {
        const res = await useApiFetch().post('/api/PayOrder', {
            no: orderDetail.value.n_no,
            paymethod: selectedPayMethod.value,
            /* paydevice : 1：电脑，2：手机 */
            paydevice: window.navigator.userAgent.toLowerCase().includes('mobile') ? 2 : 1

        })

        if (res.code === 200) {
            Message.success('支付请求已提交')
            // 根据支付方式处理不同逻辑
            if (res.data.payUrl) {
                // 跳转到支付页面
                window.open(res.data.payUrl, '_blank')
            } else if (res.data.qrCode) {
                // 显示二维码支付
                // 这里可以弹出二维码模态框
                Message.info('请扫码完成支付')
            } else {
                // 直接支付成功
                Message.success('支付成功')
                UserInfo.init()
                /* 获取query */
                navigateTo(route.query.return)
            }
        }

        if (!res.code) {
            /* 处理支付返回的html */
            const html = res
            const div = document.createElement('div')
            div.innerHTML = html
            document.body.appendChild(div)
            div.querySelector('form').submit()
        }
    } catch (error) {
        console.error('支付失败:', error)
        Message.error('支付失败，请重试')
    } finally {
        paying.value = false
    }
}

// 页面加载时获取订单详情
onMounted(() => {
    getOrderDetail()
})
</script>

<style lang="scss" scoped>
.PayVerifyPage {

    .Page {
        background-color: #fff;
        margin: 1px;
        width: calc(100% - 2px);
        border-radius: 20px;
        .PageContent {
            width: calc(100% - 40px);
            padding: 20px;

            .order-card,
            .payment-card {
                margin-bottom: 20px;

                .order-info {
                    .info-row {
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;

                        .label {
                            font-weight: 500;
                            color: #666;
                            min-width: 100px;
                        }

                        .value {
                            font-weight: 600;

                            &.price {
                                color: #f50;
                                font-size: 18px;
                            }
                        }
                    }
                }

                .items-list {
                    .item-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px;
                        background-color: #f9f9f9;
                        border-radius: 6px;
                        margin-bottom: 8px;

                        .item-name {
                            font-weight: 500;
                        }

                        .item-detail {
                            display: flex;
                            gap: 16px;
                            align-items: center;

                            .item-price {
                                color: #f50;
                                font-weight: 600;
                            }
                        }
                    }
                }

                .payment-methods {
                    width: 100%;

                    .payment-option {
                        padding: 16px;
                        border: 1px solid #e8e8e8;
                        border-radius: 8px;
                        margin-bottom: 12px;
                        transition: all 0.3s;

                        &:hover {
                            border-color: #1890ff;
                            background-color: #f0f9ff;
                        }

                        .payment-info {
                            display: flex;
                            align-items: center;
                            gap: 12px;

                            .payment-icon {
                                font-size: 24px;
                            }

                            .payment-details {
                                .payment-name {
                                    font-weight: 500;
                                    margin-bottom: 4px;
                                }

                                .payment-desc {
                                    font-size: 12px;
                                    color: #999;
                                }
                            }
                        }
                    }
                }
            }

            .payment-actions {
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;

                .total-amount {
                    .total-label {
                        font-size: 16px;
                        color: #666;
                    }

                    .total-value {
                        font-size: 24px;
                        font-weight: 600;
                        color: #f50;
                    }
                }
            }
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .PayVerifyPage {
        .Page {
            .PageContent {
                padding: 15px;

                .payment-actions {
                    flex-direction: column;
                    gap: 15px;
                    text-align: center;

                    .total-amount {
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
}
</style>