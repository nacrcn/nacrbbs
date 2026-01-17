<template>
    <div class="PageCAppItem_a_boxBox" @click="handleClick()">
        <p v-if="props.index && props.index >= 0 && props.index < 4" :class="'index index_' + props.index">
            <icon-fire class="icon" /> {{ props.index }}
        </p>

        <div class="Logoico">
            <img :src="props.item.xu_icon" alt="">
        </div>
        <p class="name">{{ props.item.xu_name }}</p>
    </div>
</template>

<script setup>

const props = defineProps(["item", "index"])

const handleClick = () => {
    // window.open(props.item.xu_url, '_blank')
    let path= ''
    if(props.item.xu_path && props.item.xu_path !== '') {
        path = props.item.xu_path
    }else{
        path = props.item.id
    }
    const viewportWidth = window.innerWidth;
    let pathNuxt = viewportWidth > 768 ? '/pc/app/' + path : '/app/' + path
    navigateTo({ path: pathNuxt })
}
</script>

<style lang="scss" scoped>
.PageCAppItem_a_boxBox {
    width: calc(100% - 20px);
    height: 80px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;

    &:hover{
        background-color: #f0f0f0;
    }

    .Logoico {
        width: 60px;
        height: 60px;
        margin: 0 auto;

        img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }

    .name {
        font-size: 14px;
        text-align: center;
        color: #474747;
        width: 60px;
        margin: 0 auto;
        /* 防止换行 */
        white-space: nowrap;

        /* 超出部分隐藏 */
        overflow: hidden;

        /* 添加省略号表示隐藏的文本 */
        text-overflow: ellipsis;
        margin-top: 10px;
    }

    .index {
        position: absolute;
        top: 10px;
        right: 5px;
        border-radius: 10px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        padding: 1px 4px;
        border: 2px solid #fff;
    }

    .index_1{
        background-color: #ff6600;
    }
    .index_2{
        background-color: #ff9900;
    }
    .index_3{
        background-color: #ffcc00;
    }
}
</style>
