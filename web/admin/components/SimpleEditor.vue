<template>
  <div class="simple-editor-wrapper">
    <div ref="editorContainer" :style="{ height: height }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'html'
  },
  theme: {
    type: String,
    default: 'vs'
  },
  height: {
    type: String,
    default: '400px'
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'ready'])

const editorContainer = ref(null)
let editor = null

const initEditor = async () => {
  if (typeof window === 'undefined') return
  
  try {
    // 动态导入Monaco Editor
    const monaco = await import('monaco-editor')
    
    await nextTick()
    
    if (!editorContainer.value) return
    
    const defaultOptions = {
      value: props.modelValue,
      language: props.language,
      theme: props.theme,
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
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
  } catch (error) {
    console.error('Monaco Editor 初始化失败:', error)
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
  if (editor) {
    import('monaco-editor').then(monaco => {
      const model = editor.getModel()
      if (model) {
        monaco.default.editor.setModelLanguage(model, newLanguage)
      }
    })
  }
})

// 监听主题变化
watch(() => props.theme, (newTheme) => {
  if (editor) {
    import('monaco-editor').then(monaco => {
      monaco.default.editor.setTheme(newTheme)
    })
  }
})

onMounted(() => {
  // 延迟初始化，确保DOM已完全加载
  setTimeout(() => {
    initEditor()
  }, 100)
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
  }
})

// 暴露方法
defineExpose({
  getEditor: () => editor,
  focus: () => editor?.focus(),
  setValue: (value) => editor?.setValue(value),
  getValue: () => editor?.getValue()
})
</script>

<style lang="scss" scoped>
.simple-editor-wrapper {
  width: 100%;
  border: 1px solid var(--color-border-2);
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--color-bg-1);
}

:deep(.monaco-editor) {
  position: relative !important;
}

:deep(.monaco-editor .margin) {
  background-color: var(--color-bg-1);
}

:deep(.monaco-editor .monaco-editor-background) {
  background-color: var(--color-bg-1);
}
</style>