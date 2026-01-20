<template>
    <div class="vip-page">
        <!-- 顶部 -->
        <UserHeader title="我的钱包"></UserHeader>

        <div>
            <div class="AccountTab">
                <div class="Account">
                    <div class="Item">
                        <div class="title">余额</div>
                        <div class="value">￥{{ UserInfo.$state.UserInfo.n_balance }}</div>
                    </div>
                    <!-- 账单按钮 -->
                    <div class="bill-button" @click="navigateTo('/user/bill?type=1')">
                        查看账单
                    </div>


                </div>
                <!-- 操作栏 -->
                <div class="content">
                    <div class="Item" v-if="SiteConfig.$state.Config.n_wallet_topup_off === '1'"
                        @click="navigateTo('/user/topup')">
                        <div class="title">余额充值</div>
                    </div>
                    <div class="Item" v-if="SiteConfig.$state.Config.n_wallet_withdraw_off === '1'"
                        @click="navigateTo('/user/withdraw')">
                        <div class="title">余额提现</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const UserInfo = useUserInfo()
const SiteConfig = useSiteConfig()
UserInfo.init((res) => {
    if (!res) {
        Message.error('请先登录')
        navigateTo('/login')
    }
})
</script>

<style lang="scss" scoped>
.AccountTab {
    width: calc(100% );
    border-radius: 20px;
    background-color: #fff;
    overflow: hidden;

    .Account {
        overflow: hidden;
        background-color: #077bff;
        background: linear-gradient(135deg, #00c451 0%, #00dd88 100%);
        display: flex;
        width: calc(100% - 40px);
        padding: 20px 20px;
        border-radius: 20px;
        position: relative;

        .icon {
            color: #ffffff48;
            position: absolute;
            right: 10px;
            top: -10px;
            width: 200px;
            height: 200px;
        }

        .bill-button {
            position: absolute;
            right: 20px;
            top: 20px;
            color: #fff;
            font-size: 12px;

        }

        .Item {
            width: calc(100% - 20px);
            padding: 10px;

            .title {
                font-size: 13px;
                color: #dfdfdf;
            }

            .value {
                font-size: 20px;
                color: #ffffff;
                font-weight: 700;
                margin-top: 3px;
            }
        }
    }

    .content {
        width: calc(100% - 30px);
        padding: 15px;
        background-color: #ffffff;
        display: flex;

        .Item {
            text-align: center;
            width: 100%;
            font-size: 14px;
            color: #333333;
            display: flex;
            justify-content: center;

            .icon {
                width: 20px;
                height: 20px;
                margin-right: 5px;
            }
        }
    }
}
</style>
