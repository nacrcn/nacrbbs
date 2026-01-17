<template>
    <div>
        <div class="Page">
            <a-form :model="form" :style="{ width: '600px' }">
                <a-form-item field="to" label="测试结果">
                    <a-alert v-if="!msg.code" type="normal">
                        <template #icon>
                            <icon-exclamation-circle-fill />
                        </template>
                        等待发起测试
                    </a-alert>
                    <a-alert v-else-if="msg.code == 200" type="success">{{ msg.msg }}</a-alert>
                    <a-alert v-else-if="msg.code != 200" type="error">{{ msg.msg }}</a-alert>
                </a-form-item>

                <a-form-item field="to" label="收件邮箱" required>
                    <a-input v-model="form.to" placeholder="请输入收件人邮箱地址" :loading="loading">
                        <template #prefix>
                            <icon-email />
                        </template>
                    </a-input>

                </a-form-item>
                <a-form-item>
                    <a-button type="primary" :loading="loading" @click="editwebinfo()">测试发送</a-button>
                </a-form-item>
            </a-form>

        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const form = ref({})
const msg = ref({
    code: 0,
    msg: '',
})
const loading = ref(false)
/* 编辑配置信息 editwebinfo */
const editwebinfo = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/sendEmailTest', form.value)
    loading.value = false
    if (res.code == 200) {
        Message.success(res.msg)
        msg.value = res
    } else {
        Message.error(res.msg)
        msg.value = res
    }
}

useSeoSet({
    title: '测试邮件发送'
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
