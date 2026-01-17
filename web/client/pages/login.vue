<template>
    <div>
        <div class="LoginTop">
        </div>
        <!-- 移动端标题栏 -->
        <div class="MobileHeader">
            <a-button type="text" class="back-btn" @click="goHome">
                <template #icon>
                    <icon-arrow-left />
                </template>
                返回首页
            </a-button>
        </div>
        <!-- 登录按钮 -->
        <div class="LoginBox" v-if="showIndex == 0">
            <div class="LoginTopInfo">
                <p class="LoginTopInfocs">Hi! User!</p>
                <p class="LoginTopInfoTitle">欢迎回来，尊敬的用户</p>
            </div>

            <a-form :model="form" layout="vertical" @submit="login">
                <a-input placeholder="请输入账号" type="text" allow-clear v-model="form.username" class="input">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
                <a-input placeholder="请输入密码" allow-clear type="password" v-model="form.password" class="input">
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input>

                <a-form-item :hideLabel="true">
                    <a-button class="loginbut" type="primary" html-type="submit">立即登录</a-button>
                </a-form-item>

                <p>
                    <span>没有账号？</span>
                    <a-button type="text" @click="showIndex = 1">立即注册</a-button>
                    <a-button type="text" v-if="SiteConfig.$state.Config.n_captcha_type == '1'" @click="showIndex = 2">忘记密码?</a-button>
                </p>

            </a-form>
        </div>
        <!-- 注册 -->
        <div class="LoginBox" v-if="showIndex == 1">
            <div class="LoginTopInfo">
                <p class="LoginTopInfocs">Hi! User!</p>
                <p class="LoginTopInfoTitle">欢迎注册！</p>
            </div>
            <a-form :model="form" layout="vertical" @submit="register">
                <a-input placeholder="请输入昵称" type="text" allow-clear v-model="form.nickname" class="input">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
                <a-input placeholder="请输入邮箱" type="text" allow-clear v-model="form.username" class="input">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
                <a-input placeholder="请输入密码" allow-clear type="password" v-model="form.password" class="input">
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input>
                <a-input v-if="SiteConfig.$state.Config.n_captcha_type == '1'" placeholder="请输入验证码" allow-clear
                    type="text" v-model="form.code" class="input">
                    <template #prefix>
                        <icon-lock />
                    </template>
                    <template #suffix>
                        <a-button type="text"  :loading="loading" @click="SendVerificationCode" :disabled="countdown > 0">{{ countdownText }}</a-button>
                    </template>
                </a-input>


                <a-form-item :hideLabel="true">
                    <a-button class="loginbut" type="primary" html-type="submit">立即登录</a-button>
                </a-form-item>

                <p>
                    <span>已有账号？</span>
                    <a-button type="text" @click="showIndex = 0">返回登录</a-button>
                </p>

            </a-form>
        </div>
        <!-- 注册 -->
        <div class="LoginBox" v-if="showIndex == 2">
            <div class="LoginTopInfo">
                <p class="LoginTopInfocs">Hi! User!</p>
                <p class="LoginTopInfoTitle">下次可不能忘记密码了哦！</p>
            </div>
            <a-form :model="form" layout="vertical" @submit="RetrievePassword">

                <a-input placeholder="请输入邮箱" type="text" allow-clear v-model="form.username" class="input">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
                <a-input v-if="SiteConfig.$state.Config.n_captcha_type == '1'" placeholder="请输入验证码" allow-clear
                    type="text" v-model="form.code" class="input">
                    <template #prefix>
                        <icon-lock />
                    </template>
                    <template #suffix>
                        <a-button type="text" :loading="loading" @click="SendVerificationCode" :disabled="countdown > 0">{{ countdownText }}</a-button>
                    </template>
                </a-input>
                <a-input placeholder="请输入新密码" allow-clear type="password" v-model="form.password" class="input">
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input>
                <a-form-item :hideLabel="true">
                    <a-button class="loginbut" type="primary" html-type="submit">立即登录</a-button>
                </a-form-item>

                <p>
                    <span>已有账号？</span>
                    <a-button type="text" @click="showIndex = 0">返回登录</a-button>
                </p>

            </a-form>
        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const UToken = useCookie('UToken')
const SiteConfig = useSiteConfig()

const showIndex = ref(0)


const form = ref({

})
const login = async () => {
    const res = await useApiFetch().post('/api/login', form.value)
    if (res.code == 200) {
        Message.success('登录成功')
        UToken.value = res.data
        navigateTo('/')
    } else {
        Message.error(res.msg)
    }
}

/* 注册函数 /api/register */
const register = async () => {
    const res = await useApiFetch().post('/api/register', form.value)
    if (res.code == 200) {
        Message.success('注册成功')
        showIndex.value = 0

    } else {
        Message.error(res.msg)
    }
}

/* 找回密码函数  */
const RetrievePassword = async () => {
    const res = await useApiFetch().post('/api/RetrievePassword', form.value)
    if (res.code == 200) {
        Message.success('找回成功')
        showIndex.value = 0
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

    if(!form.value.username || form.value.username.length < 1){
        Message.warning('请输入邮箱')
        return
    }
    loading.value = true
    const res = await useApiFetch().post('/api/sendVerificationCode', {
        to: form.value.username
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

const goHome = () => {
    navigateTo('/')
}




</script>

<style lang="scss" scoped>
.LoginTop {
    width: 100%;
    position: relative;
    background-color: #f7f7f7;
    height: 100vh;
    background-size: cover;
    background: url(/assets/bj.jpg);
}

.MobileHeader {
    display: none;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1000;
    background-color: #fff;
    width: calc(100% - 40px);
    padding: 10px;
    border-radius: 30px;

    .back-btn {
        padding: 12px 16px;
        color: #333;
        font-size: 14px;
    }
}

.LoginBox {
    background-color: #fff;
    overflow: hidden;
    width: calc(100% - 100px);
    padding: 40px;
    position: fixed;
    top: 50%;
    max-width: 400px;
    // right: ;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(243, 243, 243, 0.1);
    border-radius: 20px;

    .LoginTopInfo {
        margin-bottom: 30px;

        .LoginTopInfocs {
            font-size: 34px;
            font-weight: 800;
        }

        .LoginTopInfoTitle {
            font-size: 14px;
            font-weight: 800;
            margin-top: 10px;
        }
    }

    .loginbut {
        border-radius: 30px;
        height: 45px;
        width: 100%;
        margin-top: 20px;
    }

    .input {
        width: 100%;
        height: 45px;
        border-radius: 30px;
        margin-bottom: 20px;
        padding: 0 10px;
        font-size: 14px;
        color: #000;
    }
}

/* 移动端适配 */
@media (max-width: 768px) {
    .MobileHeader {
        display: flex;
        align-items: center;
    }

    .LoginBox {
        width: calc(100% - 40px);
        padding: 30px 20px;
        top: 70px;
        transform: translate(-50%, 0);
    }
}
</style>
