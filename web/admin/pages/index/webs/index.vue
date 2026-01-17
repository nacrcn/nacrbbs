<template>
    <div>
        <div class="Page">
            <a-page-header title="站点信息管理" :show-back="false"></a-page-header>
            <div class="Pagecontent">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" title="基础配置">
                        <a-form :model="form" :style="{ width: '600px' }">
                            <a-form-item field="name" label="站点ICO">
                                <Upimg :src="form.n_web_icon" width="100" height="100" @success="(e) => {
                                    form.n_web_icon = e
                                }"></Upimg>
                            </a-form-item>
                            <a-form-item field="name" label="站点logo">
                                <Upimg :src="form.n_web_logo" width="200" height="100" @success="(e) => {
                                    form.n_web_logo = e
                                }"></Upimg>
                            </a-form-item>
                            <a-form-item field="name" label="站点名称">
                                <a-input v-model="form.n_web_title" />
                            </a-form-item>
                            <a-form-item field="name" label="站点简介">
                                <a-input v-model="form.n_web_desc" />
                            </a-form-item>
                            <a-form-item field="name" label="站点关键词">
                                <a-input v-model="form.n_web_keys" />
                            </a-form-item>
                            <a-form-item field="name" label="版权标注">
                                <a-input v-model="form.n_web_copyright" />
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="editwebinfo()">确认修改</a-button>
                            </a-form-item>
                        </a-form>
                    </a-tab-pane>
                    <a-tab-pane key="4" title="联系方式">
                        <a-form :model="form" :style="{ width: '600px' }">
                            <a-form-item field="name" label="联系QQ">
                                <a-input v-model="form.n_contact_qqnumber" />
                            </a-form-item>
                            <a-form-item field="name" label="联系微信">
                                <a-input v-model="form.n_contact_wxnumber" />
                            </a-form-item>
                            <a-form-item field="name" label="联系手机">
                                <a-input v-model="form.n_contact_iponenumebr" />
                            </a-form-item>
                            <a-form-item field="name" label="联系邮箱">
                                <a-input v-model="form.n_contact_email" />
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="editwebinfo()">确认修改</a-button>
                            </a-form-item>
                        </a-form>
                    </a-tab-pane>
                    <a-tab-pane key="2" title="上传配置">
                        <a-form :model="form" :style="{ width: '600px' }">
                            <a-form-item field="name" label="图片大小">
                                <a-input v-model="form.n_upload_image_size" placeholder="请输入">
                                    <template #append>
                                        MB
                                    </template>
                                </a-input>
                            </a-form-item>
                            <a-form-item field="name" label="文件大小">
                                <a-input v-model="form.n_upload_file_size" placeholder="请输入">
                                    <template #append>
                                        MB
                                    </template>
                                </a-input>
                            </a-form-item>
                            <a-form-item field="name" label="图片后缀">
                                <a-textarea v-model="form.n_upload_image_suffix" cols="30" rows="20" allow-clear />
                            </a-form-item>
                            <a-form-item field="name" label="文件后缀">
                                <a-textarea v-model="form.n_upload_file_suffix" cols="30" rows="20" allow-clear />
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="editwebinfo()">确认修改</a-button>
                            </a-form-item>
                        </a-form>
                    </a-tab-pane>
                    <a-tab-pane key="3" title="安全配置">
                        <a-form :model="form" :style="{ width: '600px' }">
                            <a-form-item field="name" label="后台账号">
                                <a-input v-model="form.username" placeholder="请输入" />
                            </a-form-item>
                            <a-form-item field="name" label="后台密码">
                                <a-input v-model="form.password" placeholder="请输入" />
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="restuserpass()">确认修改</a-button>
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

/* 重置用户密码 */
const restuserpass = async () => {
    const res = await useApiFetch().post('/api/changeadminpass', form.value)
    if (res.code == 200) {
        Message.success(res.msg)
        getwebinfo()
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
