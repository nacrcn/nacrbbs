<template>
    <div class="PageBox">
        <!-- 动态背景装饰 -->
        <div class="bg-decoration">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>

        <div class="Page">
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
    padding: 70px 0px 30px;
    position: relative;
    z-index: 12;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;

  
    .Content {
        width: calc(100%);
        overflow: hidden;
        overflow-y: auto;
    }


}

/* 视口小于1024px时，隐藏导航栏 */
@media (max-width: 1024px) {
    .Page .Navlist {
        position: fixed;
        top: 70px;
        left: -200px;
        z-index: 8888;
        transition: left 0.3s ease-in-out;
        background-color: #fff;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    }

    .Page .Navlist.nav-open {
        left: 10px;
    }

    .Page .Content {
        width: calc(100% - 20px);
        margin: 0 auto;
    }

    .MobileNav {
        width: 35px;
        height: 35px;
        background-color: #fff;
        position: fixed;
        top: 17px;
        left: 16px;
        z-index: 100001;
        border-radius: 10px;
        line-height: 35px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background-color: #f0f0f0;
        }
    }

    /* 手机端遮罩层 */
    .mobile-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 99;
        animation: fadeIn 0.3s ease-in-out;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>