<template>
    <div class="PageBox">
        <div class="PageContent">
          
            <div class="Content">
                <NuxtPage />
                <Tabbar></Tabbar>
            </div>
        </div>



    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const SiteConfig = useSiteConfig()

useSeoSet({
    title: SiteConfig.$state.Config.n_web_title,
    description: SiteConfig.$state.Config.n_web_desc,
    keywords: SiteConfig.$state.Config.n_web_keys,

})



const IndexShow = ref(2)
/* 切换页面 */
const changeIndexShow = (index, path) => {
    IndexShow.value = index
    navigateTo(path)
}


</script>
<style lang="scss" scoped>
/* 视口小于768px时的样式 */
@media (min-width: 768px) {

    .PageBox {
        width: calc(100%);
        height: calc(100vh);
        position: relative;
        overflow: hidden;



    }

}

/* 视口小于768px时的样式 */
@media (max-width: 768px) {

    .PageBox {
        width: calc(100%);
        min-height: calc(100vh);
        position: relative;
        overflow: hidden;

       


    }

}
</style>
