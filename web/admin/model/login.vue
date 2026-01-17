<template>

    <div :class="{ LoginBox: true, show: Show.count }" @click="Show.increment()">
        <div class="loginBoxTw" @click.stop="() => { }">
            <div class="right" v-if="showindex == 1">
                <p class="title">Welcome</p>
                <a-form :model="form" layout="vertical" @submit="login">
                    <a-form-item field="name" label="用户名" :hideLabel="true">
                        <a-input placeholder="请输入邮箱" type="text" allow-clear v-model="form.xu_username">
                            <template #prefix>
                                <icon-user />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item field="name" style="margin-top: -7px;" :hideLabel="true">
                        <a-input placeholder="请输入密码" allow-clear type="password" v-model="form.xu_password">
                            <template #prefix>
                                <icon-lock />
                            </template>
                        </a-input>
                    </a-form-item>
                    <p class="loginphert">
                        <a href="javascript:;" @click="showindex = 2">立即注册</a>
                        <a href="javascript:;" style="float: right;" @click="showindex = 3">忘记密码</a>
                    </p>
                    <a-form-item :hideLabel="true">
                        <a-button class="loginbut" type="primary" html-type="submit">立即登录</a-button>
                    </a-form-item>
                    <!-- <div class="alipaylogin" @click="createAuthLogin()">
                        <img  src="https://imgsbad.semoun.com/uploads/2025/07/08/686cc4ecef235.png" alt="">
                        <p>使用支付宝自动注册登录</p>
                    </div> -->
                </a-form>
            </div>
            <div class="right" v-if="showindex == 2">
                <p class="title">Welcome Sign</p>
                <a-form :model="form" layout="vertical" @submit="login">
                    <a-form-item field="name" label="昵称" :hideLabel="true">
                        <a-input placeholder="请输入昵称" type="text" allow-clear v-model="form.xu_nickname">
                            <template #prefix>
                                <icon-user />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item field="name" label="用户名" style="margin-top: -7px;" :hideLabel="true">
                        <a-input placeholder="请输入邮箱" type="text" allow-clear v-model="form.xu_username">
                            <template #prefix>
                                <icon-user />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item field="name" style="margin-top: -7px;" :hideLabel="true">
                        <a-input placeholder="请输入邮箱验证码" allow-clear type="password" v-model="form.code">
                            <template #prefix>
                                <icon-lock />
                            </template>
                        </a-input>
                        <a-button type="primary" :loading="code_load" style="width: 100px;" @click="startCountdown()">{{
                            code_state ? code_time : '发送验证码' }}</a-button>
                    </a-form-item>
                    <a-form-item field="name" style="margin-top: -7px;" :hideLabel="true">
                        <a-input placeholder="请输入密码" allow-clear type="password" v-model="form.xu_password">
                            <template #prefix>
                                <icon-lock />
                            </template>
                        </a-input>
                    </a-form-item>

                    <p class="loginphert">
                        <a href="javascript:;" @click="showindex = 1">返回登录</a>
                    </p>
                    <a-form-item :hideLabel="true">
                        <a-button class="loginbut" type="primary" @click="register()">立即注册</a-button>
                    </a-form-item>
                </a-form>

            </div>
            <div class="right" v-if="showindex == 3">
                <p class="title">Welcome</p>
                <a-form :model="form" layout="vertical" @submit="login">
                    <a-form-item field="name" label="用户名" :hideLabel="true">
                        <a-input placeholder="请输入用户名" type="text" allow-clear v-model="form.xu_username">
                            <template #prefix>
                                <icon-user />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item field="name" style="margin-top: -7px;" :hideLabel="true">
                        <a-input placeholder="请输入密码" allow-clear type="password" v-model="form.xu_password">
                            <template #prefix>
                                <icon-lock />
                            </template>
                        </a-input>
                    </a-form-item>
                    <p class="loginphert">
                        <a href="javascript:;" @click="showindex = 1">返回登录</a>
                    </p>
                    <a-form-item :hideLabel="true">
                        <a-button class="loginbut" type="primary" @click="retrieve()">重置密码</a-button>
                    </a-form-item>
                </a-form>
                <div class="loginphert">

                </div>
            </div>
        </div>
    </div>
    <!-- 登录弹窗 -->
</template>

<script setup>
const Show = UserLoginShow()
import { Message } from '@arco-design/web-vue';
const UToken = useCookie('UToken')


const showindex = ref(1)

/* 账号密码登录函数 /api/login */
const form = ref({

})
const login = async () => {
    const res = await useApiFetch().post('/apis/login', form.value)
    if (res.code == 200) {
        Message.success('登录成功')
        UToken.value = res.data
        Show.increment()
        /* 刷新页面 */
        location.reload()
    } else {
        Message.error(res.msg)
    }
}
// 注册
const register = async () => {
    const res = await useApiFetch().post('/apis/register', form.value)
    if (res.code == 200) {
        Message.success('注册成功')
        showindex.value = 1
    } else {
        Message.error(res.msg)
    }
}
// 重置密码 retrieve
const retrieve = async () => {
    const res = await useApiFetch().post('/apis/RetrievePassword', form.value)
    if (res.code == 200) {
        Message.success('重置成功')
        showindex.value = 1
    } else {
        Message.error(res.msg)
    }
}
// 发送邮件 sendemail

/* 验证码发送模块 */
const code_time = ref(60)
const code_state = ref(false)
const code_load = ref(false)
const startCountdown = async () => {
    /* 判断按钮状态为加载或倒计时时，不处理操作 */
    if (code_state.value || code_load.value) return false
    code_load.value = true

    const res = await useApiFetch().post('/apis/getcaptcha', form.value)
    if (res.code == 200) {
        Message.success({ content: '发送成功' })
        code_state.value = true
        code_load.value = false

        /* 启动按钮倒计时 */
        const interval = setInterval(() => {
            code_time.value--; // 每秒减少 1
            if (code_time.value === 0) {
                clearInterval(interval); // 倒计时结束时清除定时器
                code_state.value = false
                code_time.value = 60
            }
        }, 1000); // 每秒更新一次倒计时值



    } else {
        code_load.value = false
        Message.error({ content: res.msg })
    }
};

/* 支付宝登录 createAuthLogin */
const createAuthLogin = async () => {
    const res = await useApiFetch().post('/api/getAlipayLoginUrl')
    if (res.code == 200) {
        const url = res.data.url
        /* 判断视口是否大于800 */
        if (window.innerWidth > 800) {
            window.location.href = url;
        } else {
            const alipayUrl = `alipays://platformapi/startapp?appId=20000067&url=${encodeURIComponent(url)}`;
            window.location.href = alipayUrl;
            Show.increment()
            navigateTo(`/AliAuth?state=${res.data.id}&type=1`)
        }
    }
}



</script>

<style lang="scss" scoped>
/* 视口大于800 */
@media (min-width: 800px) {
    .LoginBox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #00000017;
        z-index: -11;
        opacity: 0;

        .loginBoxTw {
            width: calc(100% - 40px);
            padding: 10px;
            margin: auto;
            background-color: #fff;
            border-radius: 5px;
            max-width: 350px;
            margin-top: calc(25% - 180px);
            display: flex;

           

            .right {
                width: calc(100% );
                padding: 0px 20px;

                .title {
                    text-align: center;
                    font-size: 16px;
                    margin-bottom: 20px;
                    margin-top: 10px;
                    color: rgb(70, 70, 70);
                }

                .loginbut {
                    width: 100%;
                }

                .loginphert {
                    padding-bottom: 10px;

                    a {
                        color: #206eff;
                    }
                }

                .alipaylogin{
                    display: flex;
                    line-height: 30px;
                    justify-content: center;
                    background-color: #f8f8f8;
                        padding: 5px 10px;
                    img{
                        width: 30px;
                        height: 30px;
                    }
                    p{
                        font-size: 14px;
                        margin-left: 10px;
                        color: #999;
                    }
                    transition: all 0.4s;
                    cursor: pointer;
                    &:hover{
                        border-radius: 10px;
                        p{
                            color: #206eff;
                        }
                    }
                }
            }
        }
    }
}

/* 视口小于800 */
@media (max-width: 800px) {
    .LoginBox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #00000017;
        z-index: -11;
        opacity: 0;

        .loginBoxTw {
            width: calc(100% - 60px);
            padding: 10px;
            margin: auto;
            background-color: #fff;
            border-radius: 5px;
            max-width: 500px;
            margin-top: 100px;
            display: flex;
            flex-wrap: wrap;

          

            .right {
                width: 100%;
                padding: 0px 20px;

                .title {
                    text-align: center;
                    font-size: 16px;
                    margin-bottom: 20px;
                    margin-top: 10px;
                    color: rgb(70, 70, 70);
                }

                .loginbut {
                    width: 100%;
                }

                .loginphert {


                    .loginpitem {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin: 5px;

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                }

                .alipaylogin{
                    display: flex;
                    line-height: 30px;
                    justify-content: center;
                    background-color: #f8f8f8;
                        padding: 5px 10px;
                    img{
                        width: 25px;
                        height: 25px;
                        margin-top: 2.5px;
                    }
                    p{
                        font-size: 14px;
                        margin-left: 10px;
                        color: #999;
                    }
                    transition: all 0.4s;
                    cursor: pointer;
                    &:hover{
                        border-radius: 10px;
                        p{
                            color: #206eff;
                        }
                    }
                }
            }
        }
    }
}

.show {
    opacity: 1;
    z-index: 999;
}
</style>
