<template>


    <div>
        <img :src="src" alt="" :class="{ 'loaded': imageLoadedStates[src] }" @load="handleImageLoad(src)"
            @error="handleImageError(src)" loading="lazy" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    src: {
        type: Object,
        default: () => ({}),
    },
})
const UserInfo = useUserInfo()
UserInfo.init()

/* 图片加载状态管理 */
const imageLoadedStates = ref({})

const handleImageLoad = (url) => {
    imageLoadedStates.value[url] = true
}

const handleImageError = (url) => {
    imageLoadedStates.value[url] = true
}

/* 深度监听data */
watch(() => props.data, (newVal, oldVal) => {
    if (newVal) {
        props.data = newVal
        GetUser()
    }
}, { immediate: true, deep: true })
</script>

<style lang="scss" scoped>
img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    filter: blur(20px);
    transition: filter 0.6s ease-in-out;
    opacity: 0.9;

    &.loaded {
        filter: blur(0);
        opacity: 1;
    }
}
</style>