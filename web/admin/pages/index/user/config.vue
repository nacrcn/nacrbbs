<template>
    <div>
        <div class="Page">
            <a-page-header title="用户信息配置" :show-back="false"></a-page-header>
            <div class="Pagecontent">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" title="注册登录">
                        <a-form :model="form" :style="{ width: '600px' }">
                            <a-form-item field="name" label="允许注册">
                                <a-select v-model="form.n_allow_register" placeholder="请选择">
                                    <a-option value="1">允许</a-option>
                                    <a-option value="0">不允许</a-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="editwebinfo()">确认修改</a-button>
                            </a-form-item>
                        </a-form>
                    </a-tab-pane>
                    <a-tab-pane key="2" title="充值提现">
                        <a-form :model="form" :style="{ width: '600px' }">
                            <a-form-item field="recharge" label="允许充值">
                                <a-select v-model="form.n_wallet_topup_off" placeholder="请选择">
                                    <a-option value="1">允许</a-option>
                                    <a-option value="0">不允许</a-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item field="withdraw" label="允许提现">
                                <a-select v-model="form.n_wallet_withdraw_off" placeholder="请选择">
                                    <a-option value="1">允许</a-option>
                                    <a-option value="0">不允许</a-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="editwebinfo()">确认修改</a-button>
                            </a-form-item>
                        </a-form>
                    </a-tab-pane>
                </a-tabs>


            </div>

        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const form = ref({})

/* 获取配置信息 getwebinfo */
const getwebinfo = async () => {
    const res = await useApiFetch().post('/api/getweb')
    if (res.code == 200) {
        form.value = res.data
    } else {
        Message.error(res.msg)
    }
}
/* 编辑配置信息 editwebinfo */
const editwebinfo = async () => {
    const res = await useApiFetch().post('/api/editweb', form.value)
    if (res.code == 200) {
        Message.success(res.msg)
    } else {
        Message.error(res.msg)
    }
}

onMounted(() => {
    getwebinfo()
})

</script>

<style lang="scss" scoped>
.Page {
    background-color: #fff;
    margin: 1px;
    width: calc(100% - 2px);
    min-height: calc(100vh - 100px);

    .Pagecontent {
        width: calc(100% - 20px);
        padding: 10px;
        padding-top: 20px;
    }

}
</style>
