<template>
    <div>
        <div class="LoginTop">
        </div>
        <div class="LoginBox">
            <div class="LoginTopInfo">
                <p class="LoginTopInfocs">Admin!</p>
                <p class="LoginTopInfoTitle">欢迎回来，尊敬的管理员</p>
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
            </a-form>

        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const AToken = useCookie('AToken')
const SiteConfig = useSiteConfig()

// await SiteConfig.init()
const form = ref({

})
const login = async () => {
    const res = await useApiFetch().post('/api/adminlogin', form.value)
    if (res.code == 200) {
        Message.success('登录成功')
        AToken.value = res.data
        navigateTo('/')
    } else {
        Message.error(res.msg)
    }
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
</style>
