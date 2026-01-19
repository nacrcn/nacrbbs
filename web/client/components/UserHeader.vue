<template>
    <!-- 顶部 -->
    <div class="header">
        <a-button shape="circle" size="mini" @click="goBack()">
            <icon-left />
        </a-button>

        <p class="title">{{ title }}</p>
    </div>

</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '用户中心'
    }
});
/* 回退上一页 */
const goBack = () => {
    window.history.back();
};
</script>

<style lang="scss" scoped>
.header {
    width: calc(100% - 20px);
    height: 40px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    gap: 10px;
    overflow: hidden;
    max-width: calc(100% - 20px);
    margin: 0 auto;
    margin-bottom: 10px;

    .title{
        font-size: 14px;
        font-weight: 800;
    }
}

/* 视口小于768px时的样式 */
@media (max-width: 768px) {

    .header {

        width: calc(100% - 20px);

        height: 40px;

        background-color: #fff;

        border-radius: 20px;

        display: flex;

        align-items: center;

        padding: 0 10px;

        gap: 10px;

        overflow: hidden;

        max-width: calc(100% - 20px);

        margin: 0 auto;

        margin-bottom: 10px;



        .title{

            font-size: 14px;

            font-weight: 800;

        }

    }

}
</style>
