<template>
    <div>
        <div class="page">
            <a-page-header title="邮件配置管理" :show-back="false"></a-page-header>
            <a-tabs default-active-key="/webs/email/config" @change="gopage">
                <a-tab-pane key="/webs/email/config" title="基础配置">
                </a-tab-pane>
                <a-tab-pane key="/webs/email/test" title="发信测试">
                </a-tab-pane>
                <a-tab-pane key="/webs/email/template" title="模板管理">
                </a-tab-pane>
            </a-tabs>
            <div class="page-container">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script setup>
const MobShow = ref(false)

const gopage = (path) => {
    navigateTo(path)
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    .page-container{
        margin-top: 20px;
    }
}
</style>