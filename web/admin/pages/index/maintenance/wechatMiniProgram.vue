<template>
    <div>
        <div class="Page">
            <a-page-header title="微信小程序配置" :show-back="false"></a-page-header>
            <div class="Pagecontent">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" title="基础配置">
                        <a-form :model="form" :style="{ width: '600px' }">
                           
                            <a-form-item field="name" label="APPID">
                                <a-input v-model="form.n_wechat_miniProgram_appid" />
                            </a-form-item>
                            <a-form-item field="name" label="SECRET">
                                <a-input v-model="form.n_wechat_miniProgram_secret" />
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

    .Pagecontent {
        width: calc(100% - 20px);
        padding: 10px;
        padding-top: 20px;
    }

}
</style>
