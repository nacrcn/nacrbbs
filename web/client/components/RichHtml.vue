<template>
  <div class="rich-html" v-html="html" />
</template>

<script setup>
import { onMounted, watch, nextTick } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

const props = defineProps({ html: String })

const highlight = async () => {
  await nextTick()
  document.querySelectorAll('.rich-html pre code').forEach((block) => {
    hljs.highlightElement(block)
  })
}

onMounted(highlight)
watch(() => props.html, highlight)
</script>

<style lang="scss">

.rich-html{
  /* 行高 */
  line-height: 1.6;

  li{
    margin-left: 20px;
  }

  h1,h2,h3{
    margin: 10px 0;
  }

  hr{
    margin: 10px 0;
  }
  
  p {
  white-space: wrap;

  img {
    width: 100%;
    border-radius: 10px;
    margin: 10px auto;
  }

  video {
    width: 100%;
    border-radius: 10px;
    margin: 10px auto;
  }
}

img {
  width: 100%;
  border-radius: 10px;
  height: auto;
  margin: 10px auto;
}

video {
  width: 100%;
  border-radius: 10px;
  margin: 10px auto;
  height: auto;
}

pre code {
  background-color: #ececec;
  /* GitHub 风格 */
  padding: 1em;
  border-radius: 8px;
  margin: 10px auto;
  display: block;
  overflow-x: auto;
}

/* 让表格横向滚动 */
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 1em 0;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  /* 不自动换行，保持结构 */
}

/* 表头 */
thead {
  background-color: #f8f8f8;
}

/* 单元格通用样式 */
th,
td {
  padding: 10px;
  border: 1px solid #e0e0e0;
  text-align: left;
  vertical-align: middle;
}

/* 鼠标悬停高亮行 */
tbody tr:hover {
  background-color: #f2f2f2;
}

/* 手机端字体稍微小一点 */
@media (max-width: 768px) {
  table {
    font-size: 13px;
  }
}
}

</style>