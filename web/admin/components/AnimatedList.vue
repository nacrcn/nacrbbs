<template>
  <div class="animated-list" ref="listRef">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, nextTick } from 'vue'

const listRef = ref(null)

function applyAnimation() {
  if (!listRef.value) return
  const children = [...listRef.value.children]

  // 先移除动画类，重置状态，方便重复触发动画
  children.forEach(el => {
    el.classList.remove('fade-in')
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.animationDelay = ''
  })

  // 下一次 DOM 更新完成后执行动画
  nextTick(() => {
    children.forEach((el, idx) => {
      el.style.animationDelay = `${idx * 0.05}s`
      el.classList.add('fade-in')
    })
  })
}

onMounted(() => {
  applyAnimation()
})

onUpdated(() => {
  applyAnimation()
})
</script>

<style>
.animated-list > * {
  opacity: 0;
  transform: translateY(20px);
  transition: none !important;
}

.fade-in {
  animation-name: fadeInUp;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
