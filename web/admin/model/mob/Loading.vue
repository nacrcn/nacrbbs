<template>
  <div class="LoadingBox">
      <a-skeleton :animation="true">
        <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-shape />
            <a-skeleton-line :rows="3" />
        </a-space >
          <a-space style="margin-top: 20px;" direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-shape />
            <a-skeleton-line :rows="3" />
        </a-space>
        <a-space style="margin-top: 20px;" direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-shape />
            <a-skeleton-line :rows="3" />
        </a-space>
    </a-skeleton>
  </div>
</template>

<script setup>


</script>

<style lang="scss" scoped>

.LoadingBox{
    width: calc(100% - 20px);
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    margin-top: 5px;
}
</style>
