<template>
    <div class="vip-page">
        <!-- 顶部 -->
         <UserHeader title="会员中心"></UserHeader>
        <div class="Page">
            <div class="Pagecontent">
                <!-- 会员类型选择 -->
                <div class="section-title">
                    <h3>选择会员类型</h3>
                    <div class="title-line"></div>
                </div>
                <div class="VipListBox">
                    <div :class="['VipList', {
                        VipListActive: VipActive === value.id
                    }]" v-for="value in Viplist" :key="value.id" @click="() => {
                        VipActive = value.id
                        from.id = value.id,
                        VipInfo = value
                        GetVipPrice()
                    }">
                        <p class="VipName">{{ value.n_name }}</p>
                        <p class="VipNote">{{ value.n_note }}</p>
                    </div>
                </div>
                <!-- 价格选择 -->
                <div class="section-title">
                    <h3>选择购买时长</h3>
                    <div class="title-line"></div>
                </div>
                <div class="VipPriceBox">
                    <div :class="['VipPrice', {
                        VipPriceActive: from.id === price.id
                    }]" @click="() => { from.id = price.id }" v-for="price in VipPrice" :key="price.id">
                        <div class="price-info">
                            <div class="duration-badge">{{ price.n_day }}天</div>
                            <div class="price-container">
                                <span class="priceold">￥{{ price.n_strikethroughprice }}</span>
                                <span class="pricenow">￥{{ price.n_price }}</span>
                            </div>
                        </div>
                        <div class="give">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            赠送 {{ price.n_give }}积分
                        </div>
                    </div>
                </div>


                <!-- 购买确认 -->
                <div class="OrderBox">
                    <div class="order-summary">
                        <div class="price-display">
                            <span class="total-label">预计支付：</span>
                            <span class="total-price">￥{{from.id ? VipPrice.find(item => item.id === from.id)?.n_price
                                : '0' }}</span>
                        </div>
                        <a-button type="primary" class="buy-button" :loading="loading" @click="BuyVip()">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                            立即购买
                        </a-button>
                    </div>
                </div>

                <!-- 会员权益 -->
                <div class="VipRightsBox">
                    <div class="section-title">
                        <h3>会员权益</h3>
                        <div class="title-line"></div>
                    </div>
                    <div class="rights-content">
                        <div class="right-item">
                            <div class="right-text">
                                <h4>免费调用</h4>
                                <p>海量接口免费调用</p>
                            </div>
                        </div>
                        <div class="right-item">
                            <div class="right-text">
                                <h4>超低折扣</h4>
                                <p>付费接口享受{{ VipInfo.n_discount }}%优惠</p>
                            </div>
                        </div>
                        <div class="right-item">
                            <div class="right-text">
                                <h4>更稳定</h4>
                                <p>VIP独立数据通道，更稳定更快速</p>
                            </div>
                        </div>
                        <div class="right-item">
                            <div class="right-text">
                                <h4>更多的QPS</h4>
                                <p>在接口原基础上，增加{{ VipInfo.n_qps }}QPS</p>
                            </div>
                        </div>
                          <div class="right-item">
                            <div class="right-text">
                                <h4>更低的手续费</h4>
                                <p>提现手续费仅需{{ VipInfo.n_withdrawal_fee }}%</p>
                            </div>
                        </div>
                        <div class="right-item">
                            <div class="right-text">
                                <h4>专业的技术支持</h4>
                                <p>提供24/7专业技术支持服务</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
/* 获取应用列表信息 */
const Viplist = ref([])
/* 获取会员列表 */
const loading = ref(false)
const GetVipList = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/getVipList')
    if (res.code === 200) {
        Viplist.value = res.data
        VipActive.value = res.data[0].id
        VipInfo.value = res.data[0]
        GetVipPrice()
    } else {
        Message.error(res.msg)
    }
    loading.value = false
}

const VipActive = ref(0)
const from = ref({
    id: '',
    type: 2
})
/* 获取会员价格 */
const VipPrice = ref([])
const VipInfo = ref({})

const GetVipPrice = async () => {
    const res = await useApiFetch().post('/api/getVipPrice', {
        n_gid: VipActive.value
    })
    if (res.code === 200) {
        VipPrice.value = res.data
        from.value.id = res.data[0]?.id || ''
    } else {
        Message.error(res.msg)
    }
}

/* 购买会员 */

const BuyVip = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/CreateOrder', {
        from: JSON.stringify([from.value])
    })
    if (res.code === 200) {
        navigateTo('/user/order/' + res.data.order)
    } else {
        Message.error(res.msg)
    }
    loading.value = false
}

GetVipList()
</script>

<style lang="scss" scoped>
.vip-page {
    height: 100%;
    overflow: hidden;
}
.header{
    width: 100%;
    height: 40px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
}
.Page {
    background-color: #fff;
    width: calc(100% - 30px);
    border-radius: 18px;
    overflow: hidden;
    padding: 15px;
    height: calc(100% - 80px);
    overflow-y: auto;
    .page-header {
        background: linear-gradient(135deg, #ff3c00 0%, #ff6b35 100%);
        padding: 30px;
        text-align: center;
        position: relative;
        overflow: hidden;

        .page-title {
            color: #fff;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            position: relative;
            z-index: 2;
        }

        .header-decoration {
            position: absolute;
            top: -50%;
            right: -10%;
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
        }
    }

    .Pagecontent {
        width: calc(100%);

        .section-title {
            margin: 0px 0 20px;
            text-align: center;

            h3 {
                font-size: 20px;
                font-weight: 600;
                color: #333;
                margin: 0 0 10px;
            }

            .title-line {
                width: 60px;
                height: 3px;
                background: linear-gradient(90deg, #ff3c00, #ff6b35);
                margin: 0 auto;
                border-radius: 2px;
            }
        }

        .VipListBox {
            display: grid;
            grid-template-columns: repeat(auto-fill, 180px);
            grid-gap: 15px;
            margin-bottom: 30px;

            .VipList {
                background: linear-gradient(145deg, #ffffff, #f8f9fa);
                padding: 25px;
                border-radius: 16px;
                transition: all 0.3s ease;
                border: 2px solid #e9ecef;
                cursor: pointer;
                position: relative;
                overflow: hidden;

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }

                .vip-icon {
                    color: #ff3c00;
                    margin-bottom: 15px;
                    display: flex;
                    justify-content: center;
                    opacity: 0.3;
                    transition: all 0.3s ease;
                }

                .VipName {
                    font-size: 18px;
                    font-weight: 700;
                    color: #333;
                    margin: 0 0 10px;
                    text-align: center;
                }

                .VipNote {
                    font-size: 14px;
                    color: #666;
                    text-align: center;
                    line-height: 1.4;
                }

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #ff3c00, #ff6b35);
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                }

                &:hover::before {
                    transform: scaleX(1);
                }
            }

            .VipListActive {
                border-color: #ff3c00;
                background: linear-gradient(145deg, #fff5f2, #ffffff);
                box-shadow: 0 8px 20px rgba(255, 60, 0, 0.15);

                .vip-icon {
                    opacity: 1;
                    transform: scale(1.1);
                }

                .VipName {
                    color: #ff3c00;
                }

                &::before {
                    transform: scaleX(1);
                }
            }
        }

        .VipPriceBox {
            display: grid;
            grid-template-columns: repeat(auto-fill, 140px);
            grid-gap: 15px;
            margin-bottom: 30px;

            .VipPrice {
                border-radius: 16px;
                transition: all 0.3s ease;
                border: 2px solid #e9ecef;
                overflow: hidden;
                background: linear-gradient(145deg, #f8f9fa, #ffffff);
                cursor: pointer;
                position: relative;

                &:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .price-info {
                    padding: 20px 15px;
                    background-color: #fff;
                    text-align: center;

                    .duration-badge {
                        display: inline-block;
                        background: linear-gradient(135deg, #ff3c00, #ff6b35);
                        color: #fff;
                        padding: 6px 15px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        margin-bottom: 15px;
                    }

                    .price-container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;

                        .priceold {
                            font-size: 12px;
                            color: #999;
                            text-decoration: line-through;
                        }

                        .pricenow {
                            font-size: 15px;
                            font-weight: 700;
                            color: #ff3c00;
                        }
                    }
                }

                .give {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 5px 12px;
                    background-color: #f8f9fa;
                    font-size: 13px;
                    color: #666;
                    svg {
                        color: #ff6b35;
                    }
                }
            }

            .VipPriceActive {
                border-color: #ff3c00;
                background: linear-gradient(145deg, #fff5f2, #ffffff);
                box-shadow: 0 8px 20px rgba(255, 60, 0, 0.15);

                .give {
                    background: linear-gradient(135deg, #ff3c00, #ff6b35);
                    color: #fff;
                    border-top: none;
                    font-weight: 500;

                    svg {
                        color: #fff;
                    }
                }
            }
        }

        .OrderBox {
            margin: 40px 0;
            padding: 25px;
            background: linear-gradient(145deg, #f8f9fa, #ffffff);
            border-radius: 16px;
            border: 1px solid #e9ecef;

            .order-summary {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;

                .price-display {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .total-label {
                        font-size: 16px;
                        color: #666;
                    }

                    .total-price {
                        font-size: 24px;
                        font-weight: 700;
                        color: #ff3c00;
                    }
                }

                .buy-button {
                    border-radius: 25px;
                    background: linear-gradient(135deg, #ff3c00, #ff6b35);
                    border: none;
                    height: 50px;
                    padding: 0 30px;
                    font-size: 16px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    min-width: 150px;
                    justify-content: center;

                    &:hover {
                        background: linear-gradient(135deg, #ff6b35, #ff3c00);
                        transform: translateY(-2px);
                        box-shadow: 0 8px 20px rgba(255, 60, 0, 0.3);
                    }

                    svg {
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }

        .VipRightsBox {
            margin-top: 40px;

            .rights-content {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 20px;
                margin-top: 20px;

                .right-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 20px;
                    background: linear-gradient(145deg, #ffffff, #f8f9fa);
                    border-radius: 12px;
                    border: 1px solid #e9ecef;
                    transition: all 0.3s ease;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
                        border-color: #ff3c00;
                    }

                    .right-icon {
                        font-size: 24px;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, #fff5f2, #ffffff);
                        border-radius: 12px;
                        border: 1px solid #ffe0d6;
                    }

                    .right-text {
                        flex: 1;

                        h4 {
                            margin: 0 0 5px;
                            font-size: 16px;
                            font-weight: 600;
                            color: #333;
                        }

                        p {
                            margin: 0;
                            font-size: 14px;
                            color: #666;
                            line-height: 1.4;
                        }
                    }
                }
            }
        }
    }
}
</style>
