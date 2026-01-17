<template>
    <div class="TopUpPage">
        <UserHeader title="余额充值"></UserHeader>
        <div class="Page">
            <div class="PageHeader">
                <h2>余额充值</h2>
                <p class="current-balance">当前余额：<span class="amount">¥{{ currentBalance }}</span></p>
            </div>

            <div class="Pagecontent">
                <!-- 充值金额选择 -->
                <div class="section">
                    <h3>选择充值金额</h3>
                    <div class="amount-grid">
                        <div v-for="item in presetAmounts" :key="item.amount"
                            :class="['amount-item', { active: from.price === item.amount }]"
                            @click="from.price = item.amount">
                            <div class="amount-value">¥{{ item.amount }}</div>
                        </div>
                    </div>

                    <!-- 自定义金额 -->
                    <div class="custom-amount">
                        <a-input v-model="from.price" placeholder="自定义金额" :min="1" :max="10000"
                            style="width: 200px" />
                        <span class="unit">元</span>
                    </div>
                </div>


                <!-- 提交按钮 -->
                <div class="section">
                    <a-button type="primary" size="large" :loading="loading" @click="handleSubmit" class="submit-btn">
                        立即充值 ¥{{ from.price }}
                    </a-button>

                    <div class="tips">
                        <p>• 充值成功后余额将立即到账</p>
                        <p>• 如遇问题请联系客服</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';

// 获取用户信息
const UserInfo = useUserInfo()
UserInfo.init()

// 响应式数据
const currentBalance = ref(UserInfo.$state.UserInfo?.n_balance || '0.00')
const selectedAmount = ref(0)
const customAmount = ref(null)
const loading = ref(false)

// 预设充值金额
const presetAmounts = ref([
    { amount: 10, bonus: 0 },
    { amount: 50, bonus: 5 },
    { amount: 100, bonus: 12 },
    { amount: 200, bonus: 30 },
    { amount: 500, bonus: 80 },
    { amount: 1000, bonus: 200 }
])



// 计算最终金额
const finalAmount = computed(() => {
    if (selectedAmount.value > 0) {
        return selectedAmount.value
    }
    if (customAmount.value && customAmount.value > 0) {
        return customAmount.value
    }
    return 0
})

// 计算赠送金额
const finalBonus = computed(() => {
    const amount = finalAmount.value
    const matched = presetAmounts.value.find(item => item.amount === amount)
    return matched ? matched.bonus : 0
})



const from = ref({
    type: 1,
    price: 10
})

// 提交充值
const handleSubmit = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/CreateOrder', {
        from: JSON.stringify([from.value]),
        path: window.location.href
    })
    if (res.code === 200) {
        navigateTo('/user/order/' + res.data.order)
    } else {
        Message.error(res.msg)
    }
    loading.value = false
}
</script>

<style lang="scss" scoped>
.TopUpPage {}

.Page {
    background-color: #fff;
    margin: 1px;
    width: calc(100% - 2px);
    border-radius: 20px;
    overflow: hidden;
    margin: 0px auto;

    .PageHeader {
        padding: 30px;
        background: linear-gradient(135deg, #00c451 0%, #00dd88 100%);
        color: white;
        text-align: center;

        h2 {
            margin: 0 0 10px 0;
            font-size: 24px;
            font-weight: 600;
        }

        .current-balance {
            margin: 0;
            font-size: 16px;
            opacity: 0.9;

            .amount {
                font-weight: 600;
                font-size: 20px;
            }
        }
    }

    .Pagecontent {
        padding: 30px;
        width: calc(100% - 60px);

        .section {
            margin-bottom: 40px;

            h3 {
                margin: 0 0 20px 0;
                font-size: 18px;
                font-weight: 600;
                color: #333;
            }
        }
    }

    // 充值金额网格
    .amount-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 15px;
        margin-bottom: 30px;

        .amount-item {
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;

            &:hover {
                border-color: #00c451;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
            }

            &.active {
                border-color: #00c451;
                // background: linear-gradient(135deg, #0e6eff 0%, #0e6eff 100%);
                // color: white;

                .amount-bonus {
                    color: rgba(255, 255, 255, 0.9);
                }
            }

            .amount-value {
                font-size: 24px;
                font-weight: 700;
            }

        }
    }

    // 自定义金额
    .custom-amount {
        display: flex;
        align-items: center;
        gap: 10px;

        .unit {
            font-size: 16px;
            color: #666;
        }
    }

    // 支付方式
    .payment-methods {
        .payment-item {
            display: flex;
            align-items: center;
            padding: 20px;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            margin-bottom: 15px;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                border-color: #00c451;
                background: #f9fafb;
            }

            &.active {
                border-color: #00c451;
                background: #f0f4ff;
            }

            .payment-icon {
                margin-right: 15px;
                font-size: 24px;
                color: #00c451;
            }

            .payment-info {
                flex: 1;

                .payment-name {
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 4px;
                }

                .payment-desc {
                    font-size: 14px;
                    color: #666;
                }
            }

            .payment-radio {
                font-size: 20px;
                color: #00c451;
            }
        }
    }

    // 订单摘要
    .order-summary {
        background: #f9fafb;
        border-radius: 12px;
        padding: 25px;

        .summary-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            font-size: 16px;

            &.bonus {
                color: #f59e0b;
            }

            &.total {
                font-weight: 600;
                font-size: 18px;
                color: #333;
                margin-top: 10px;
            }

            .value {
                font-weight: 600;
            }
        }

        .summary-divider {
            height: 1px;
            background: #e5e7eb;
            margin: 20px 0;
        }
    }

    // 提交按钮
    .submit-btn {
        width: 100%;
        height: 50px;
        font-size: 18px;
        font-weight: 600;
        border-radius: 25px;
        background: linear-gradient(135deg, #00c451 0%, #00c451 100%);
        border: none;
        margin-bottom: 20px;

        &:hover {
            opacity: 0.9;
        }
    }

    .tips {
        text-align: center;
        color: #666;
        font-size: 14px;
        line-height: 1.6;

        p {
            margin: 5px 0;
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .Page {
        max-width: none;
        width: calc(100%);

        .PageHeader {
            padding: 20px;

            h2 {
                font-size: 20px;
            }

            .current-balance {
                font-size: 14px;

                .amount {
                    font-size: 18px;
                }
            }
        }

        .Pagecontent {

            padding: 20px;

            .amount-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;

                .amount-item {
                    padding: 15px 10px;

                    .amount-value {
                        font-size: 20px;
                    }
                }
            }

            .payment-item {
                padding: 15px;

                .payment-icon {
                    margin-right: 12px;
                    font-size: 20px;
                }
            }
        }
    }
}
</style>
