<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const props = defineProps({
  // 编辑器内容，支持 v-model 双向绑定
  modelValue: {
    type: String,
    default: ''
  },
  // 编辑器语言：html、javascript、typescript、css、json、python、java 等
  language: {
    type: String,
    default: 'html'
  },
  // 编辑器主题：'vs'（浅色）、'vs-dark'（深色）、'hc-black'（高对比度）
  theme: {
    type: String,
    default: 'vs-dark'
  },
  // 编辑器高度：可传入数字（如 400）或带单位的字符串（如 '400px'、'50vh'）
  height: {
    type: [String, Number],
    default: 400
  },
  // 是否只读模式：true 时无法编辑，仅查看
  readonly: {
    type: Boolean,
    default: false
  },
  // Monaco Editor 配置选项对象，可覆盖默认配置
  // 常用选项：
  //   - fontSize: 字体大小（默认 14）
  //   - tabSize: Tab 大小（默认 4）
  //   - wordWrap: 自动换行，'on' | 'off' | 'wordWrapColumn'（默认 'on'）
  //   - lineNumbers: 行号显示，'on' | 'off' | 'relative' | 'interval'（默认 'on'）
  //   - minimap: { enabled: boolean } 小地图（默认禁用）
  //   - scrollBeyondLastLine: 是否滚动到最后一行之后（默认 false）
  //   - automaticLayout: 自动调整布局（默认 true）
  //   - formatOnPaste: 粘贴时自动格式化（默认 false）
  //   - formatOnType: 输入时自动格式化（默认 false）
  options: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'ready'])

const editorContainer = ref(null)
let editor = null
let monaco = null
const loading = ref(true)
const isClient = ref(false)

const computedHeight = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height
})

const initMonaco = async () => {
  if (!isClient.value) return

  try {
    loading.value = true

    // 动态导入Monaco Editor
    const monacoModule = await import('monaco-editor')
    monaco = monacoModule.default

    await nextTick()

    if (!editorContainer.value) return

    const defaultOptions = {
      value: props.modelValue,
      language: props.language,
      theme: props.theme,
      readOnly: props.readonly,
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: false,
      padding: { top: 10 },
      wordWrap: 'on',
      ...props.options
    }

    editor = monaco.editor.create(editorContainer.value, defaultOptions)

    // 监听内容变化
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue()
      emit('update:modelValue', value)
      emit('change', value)
    })

    emit('ready', editor)
    loading.value = false
  } catch (error) {
    console.error('Monaco Editor 初始化失败:', error)
    loading.value = false
  }
}

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  if (editor && editor.getValue() !== newValue) {
    editor.setValue(newValue)
  }
})

// 监听语言变化
watch(() => props.language, (newLanguage) => {
  if (editor && monaco) {
    const model = editor.getModel()
    if (model) {
      monaco.editor.setModelLanguage(model, newLanguage)
    }
  }
})

// 监听主题变化
watch(() => props.theme, (newTheme) => {
  if (editor && monaco) {
    monaco.editor.setTheme(newTheme)
  }
})

// 监听只读状态变化
watch(() => props.readonly, (readonly) => {
  if (editor) {
    editor.updateOptions({ readOnly: readonly })
  }
})

onMounted(() => {
  isClient.value = true
  nextTick(() => {
    initMonaco()
  })
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
  }
})

// 暴露方法给父组件
defineExpose({
  getEditor: () => editor,
  getMonaco: () => monaco,
  focus: () => editor?.focus(),
  setValue: (value) => editor?.setValue(value),
  getValue: () => editor?.getValue(),
  format: () => {
    if (editor) {
      editor.getAction('editor.action.formatDocument')?.run()
    }
  }
})
</script>

<template>
  <div class="monaco-editor-wrapper">
    <div v-if="loading || !isClient" class="loading-overlay" :style="{ height: computedHeight }">
      <a-spin size="large" />
      <span class="loading-text">{{ isClient ? '编辑器加载中...' : '正在初始化编辑器...' }}</span>
    </div>
    <div v-show="isClient && !loading" ref="editorContainer" class="monaco-editor-container"
      :style="{ height: computedHeight }"></div>
  </div>
</template>

<style lang="scss" scoped>
.monaco-editor-wrapper {
  position: relative;
  width: 100%;
  border: 1px solid var(--color-border-2);
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--color-bg-1);
  transition: all 0.1s !important;

}
*{
    transition: all 0.1s !important;
}

.monaco-editor-container {
  transition: all 0.1s !important;
  width: 100%;
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-2);
  gap: 16px;
  z-index: 10;
  position: relative;

  .loading-text {
    color: var(--color-text-3);
    font-size: 14px;
  }
}

.ssr-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-2);

  .placeholder-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .placeholder-text {
      color: var(--color-text-3);
      font-size: 14px;
    }
  }
}

/* 修复 Monaco 在 Nuxt 中样式丢失的问题 */
:deep(.monaco-editor) {
  position: absolute !important;
}

:deep(.monaco-editor .margin) {
  background-color: var(--color-bg-1);
}

:deep(.monaco-editor .monaco-editor-background) {
  background-color: var(--color-bg-1);
}

/* 适配 ArcoDesign 主题 */
:deep(.monaco-editor) {

  .monaco-editor-background,
  .inputarea.ime-input {
    background-color: var(--color-bg-1);
  }

  &.vs-dark .monaco-editor-background,
  &.vs-dark .inputarea.ime-input {
    background-color: #1e1e1e;
  }
}

/* 编辑器边框优化 */
:deep(.monaco-editor .monaco-editor-background) {
  box-shadow: inset 0 0 0 1px var(--color-border-1);
}

/* 滚动条样式 */
:deep(.monaco-scrollable-element) {
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-bg-2);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border-3);
    border-radius: 4px;

    &:hover {
      background: var(--color-border-4);
    }
  }
}
</style>
