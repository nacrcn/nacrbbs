<template>
    <div>
        <UserHeader title="我的信息编辑"></UserHeader>
        <div class="Page">
            <div class="Pagecontent">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" title="我的基础信息">
                        <a-form :model="form" :style="{ width: '600px' }">
                            <a-form-item field="name" label="我的头像">
                                <Upimg :src="form.n_avatar" width="100" height="100" @success="(e) => {
                                    form.n_avatar = e
                                }"></Upimg>
                            </a-form-item>
                            <a-form-item field="name" label="我的背景">
                                <Upimg :src="form.n_userback" width="200" height="100" @success="(e) => {
                                    form.n_userback = e
                                }"></Upimg>
                            </a-form-item>
                            <a-form-item field="name" label="我的昵称">
                                <a-input v-model="form.n_nickname" />
                            </a-form-item>
                            <a-form-item field="name" label="我的签名">
                                <a-input v-model="form.n_signature" />
                            </a-form-item>
                            <a-form-item field="name" label="QQ号码">
                                <a-input v-model="form.n_qqnumber" />
                            </a-form-item>
                            <a-form-item field="name" label="微信号码">
                                <a-input v-model="form.n_wxnumber" />
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="editwebinfo()">确认修改</a-button>
                            </a-form-item>
                        </a-form>
                    </a-tab-pane>
                    <a-tab-pane key="2" title="重置密码">
                        <a-form :model="form" :style="{ width: '600px' }">
                            <a-form-item field="name" label="我的邮箱">
                                <a-input v-model="form.n_username" disabled />
                            </a-form-item>
                            <!-- 验证码 -->
                            <a-form-item field="name" label="邮件验证码">
                                <a-input v-model="form.n_captcha" placeholder="请输入验证码" />
                                <a-button type="text" :loading="loading" @click="SendVerificationCode"
                                    :disabled="countdown > 0">{{ countdownText }}</a-button>
                            </a-form-item>
                            <a-form-item field="password" label="新密码">
                                <a-input v-model="form.n_password" placeholder="请输入新密码" type="password" />
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
const UserInfo = useUserInfo()

UserInfo.init()
/* 获取用户信息 getuserinfo */
const getuserinfo = async () => {
    const res = await useApiFetch().post('/api/myinfo')
    if (res.code == 200) {
        form.value = res.data
    } else {
        Message.error(res.msg)
    }
}
/* 编辑配置信息 editwebinfo */
const editwebinfo = async () => {
    delete form.value.VipInfo
    const res = await useApiFetch().post('/api/editinfo', form.value)
    if (res.code == 200) {
        Message.success(res.msg)
        UserInfo.init()
    } else {
        Message.error(res.msg)
    }
}

/* 发送验证码函数 */
const loading = ref(false)
const SendVerificationCode = async () => {
    if (countdown.value > 0) {
        Message.warning(`请等待 ${countdown.value} 秒后重试`)
        return
    }

    if (!form.value.n_username || form.value.n_username.length < 1) {
        Message.warning('请输入邮箱')
        return
    }
    loading.value = true
    const res = await useApiFetch().post('/api/sendVerificationCode', {
        to: form.value.n_username
    })
    loading.value = false
    if (res.code == 200) {
        Message.success('发送成功')
        startCountdown()
    } else {
        Message.error(res.msg)
    }
}

const countdown = ref(0)
const countdownText = ref('获取验证码')

const startCountdown = () => {
    countdown.value = 60
    const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timer)
            countdownText.value = '获取验证码'
        } else {
            countdownText.value = `${countdown.value}秒后重试`
        }
    }, 1000)
}


/* 重置用户密码 */
const restuserpass = async () => {
    const res = await useApiFetch().post('/api/RetrievePassword', {
        username: form.value.n_username,
        code: form.value.n_captcha,
        password: form.value.n_password
    })
    if (res.code == 200) {
        Message.success(res.msg)
        getuserinfo()
    } else {
        Message.error(res.msg)
    }
}
onMounted(() => {
    getuserinfo()
})

</script>

<style lang="scss" scoped>
.Page {
    background-color: #fff;
    margin: 1px;
    width: calc(100% - 2px);
    border-radius: 20px;

    .Pagecontent {
        width: calc(100% - 20px);
        padding: 10px;
        padding-top: 20px;
    }

}
</style>
