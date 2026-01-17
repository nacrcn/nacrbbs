<template>
    <div class="PageTop">
        <!-- 背景动态圆球 -->
        <div class="bg-bubble bubble-1"></div>
        <div class="bg-bubble bubble-2"></div>
        <div class="bg-bubble bubble-3"></div>
    </div>

</template>

<script setup>


</script>

<style lang="scss" scoped>
.PageTop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 700px;
    background: linear-gradient(0deg, #ffffff 0%, #e6f3ff 50%, #fce9ff 100%);
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.bg-bubble {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.7;
    z-index: 1;
}

.bubble-1 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(46, 203, 255, 0.8) 0%, rgba(173, 216, 230, 0.3) 70%);
    top: 10%;
    left: 10%;
    animation: floatBubble1 15s ease-in-out infinite;
}

.bubble-2 {
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(156, 135, 250, 0.7) 0%, rgba(135, 206, 250, 0.2) 70%);
    top: 30%;
    left: 70%;
    animation: floatBubble2 12s ease-in-out infinite;
}

.bubble-3 {
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(230, 176, 218, 0.6) 0%, rgba(176, 224, 230, 0.1) 70%);
    top: 30%;
    left: 80%;
    animation: floatBubble3 18s ease-in-out infinite;
}

@keyframes floatBubble1 {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    25% {
        transform: translate(100px, -50px) scale(1.1);
    }

    50% {
        transform: translate(50px, 80px) scale(0.9);
    }

    75% {
        transform: translate(-80px, 30px) scale(1.05);
    }
}

@keyframes floatBubble2 {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    33% {
        transform: translate(-120px, 60px) scale(1.2);
    }

    66% {
        transform: translate(80px, -40px) scale(0.8);
    }
}

@keyframes floatBubble3 {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    20% {
        transform: translate(-60px, -80px) scale(1.15);
    }

    40% {
        transform: translate(120px, 40px) scale(0.85);
    }

    60% {
        transform: translate(-40px, 100px) scale(1.1);
    }

    80% {
        transform: translate(90px, -60px) scale(0.95);
    }
}


</style>
