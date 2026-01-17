<template>
    <div>
        <div class="Page">
            <a-form :model="form" :style="{ width: '600px' }">
                <a-form-item field="name" label="邮件HOST">
                    <a-input v-model="form.n_email_host" />
                </a-form-item>
                <a-form-item field="name" label="邮件端口">
                    <a-input v-model="form.n_email_port" />
                </a-form-item>
                <a-form-item field="name" label="加密模式">
                    <a-radio-group v-model="form.n_email_secure">
                        <a-radio value="true">加密模式</a-radio>
                        <a-radio value="false">常规模式</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item field="name" label="邮件地址">
                    <a-input v-model="form.n_email_user" />
                </a-form-item>
                <a-form-item field="name" label="邮件密码">
                    <a-input v-model="form.n_email_pass" />
                </a-form-item>
                <a-form-item field="name" label="发件人信息">
                    <a-input v-model="form.n_email_from" />
                </a-form-item>
                 <a-form-item field="name" label="验证码模块">
                    <a-radio-group v-model="form.n_captcha_type">
                        <a-radio value="0">不开启</a-radio>
                        <a-radio value="1">开启</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="editwebinfo()">确认修改</a-button>
                </a-form-item>
            </a-form>

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

useSeoSet({
    title: '基础配置'
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
        padding-top: 20px;
    }

}
</style>
