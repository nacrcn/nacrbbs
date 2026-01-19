<template>
    <div class="PageBox">
        <!-- 动态背景装饰 -->
        <div class="bg-decoration">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>

        <div class="Page">
            <div>
                <div class="Navlist">
                <div :class="['Item', {
                    active: Key === 1
                }]" @click="goPage('/user/home', 1)">
                    <p>我的信息</p>
                </div>
                 <div :class="['Item', {

                    active: Key === 2
                }]" @click="goPage('/user/myInfo', 2)">
                    <p>我的动态</p>
                </div>
                <div :class="['Item', {
                    active: Key === 3
                }]" @click="goPage('/user/bill', 3)">
                    <p>我的账单</p>
                </div>
            </div>
            </div>
            <div class="Content">
                <NuxtPage />
            </div>
        </div>
    </div>

</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const UserInfo = useUserInfo()
UserInfo.init((res) => {
    if (!res) {
        Message.error('请先登录')
        navigateTo('/login')
    }
})


/* 获取活动列表 /api/getActivity */
const ActivityList = ref([])
const getActivity = async () => {
    const res = await useApiFetch().post('/api/getActivity')
    if (res.code === 200) {
        ActivityList.value = res.data
    }
}

onMounted(() => {
    getActivity()
})

const Key = ref(1)
const goPage = (path, key) => {
    Key.value = key
    navigateTo(path)
}

</script>

<style lang="scss" scoped>
.PageBox {
    width: calc(100%);
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 80px);
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
}

// 动态背景装饰
.bg-decoration {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;

    .circle {
        position: absolute;
        border-radius: 50%;
        opacity: 0.3;
        filter: blur(80px);
        animation: float 5s ease-in-out infinite;

        &.circle-1 {
            width: 600px;
            height: 600px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            top: -200px;
            right: -100px;
            animation-delay: 0s;
        }

        &.circle-2 {
            width: 500px;
            height: 500px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            top: -150px;
            left: -100px;
            animation-delay: -5s;
        }

        &.circle-3 {
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-delay: -10s;
        }
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    33% {
        transform: translateY(-30px) rotate(5deg);
    }

    66% {
        transform: translateY(20px) rotate(-5deg);
    }
}

.Page {
    width: 100%;
    padding: 80px 0px 30px;
    position: relative;
    z-index: 12;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;

    .Navlist {
        width: 160px;
        border-radius: 20px;
        background-color: #fff;
        padding: 20px;
        margin-right: 10px;

        .Item {
            line-height: 40px;
            cursor: pointer;
            text-align: center;
            transition: all 0.3s;
            border-radius: 20px;
            margin-bottom: 10px;
        }

        .active {
            background-color: #e9f5eb;
            color: #007940;
        }
    }

    .Content {
        width: calc(100% - 200px);
        overflow: hidden;
        overflow-y: auto;
        height: calc(100vh - 110px);
    }


}

/* 视口小于1024px时，隐藏导航栏 */
@media (max-width: 1024px) {
    .Page .Navlist {
        display: none;
    }
    .Page .Content {
        width: calc(100% - 20px);
        margin: 0 auto;
    }
}
</style>