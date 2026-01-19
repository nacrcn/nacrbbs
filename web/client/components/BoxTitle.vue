<template>

    <div class="title">
        <img src="/assets/1.png" alt="">
        <span>
            <slot></slot>
        </span>
    </div>

</template>

<script setup>

const props = defineProps({
    name: {
        type: Object,
        default: '',
    },
})

</script>

<style lang="scss" scoped>
.title {
    display: flex;
    line-height: 30px;
    gap: 4px;
    margin-bottom: 10px;

    img {
        width: 20px;
        height: 20px;
        margin: 5px;
    }
}
</style>