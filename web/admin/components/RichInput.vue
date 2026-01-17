<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { upimg, upfile } from '@/Tools/update' // 你的上传函数
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '请输入内容...',
    },
    height: {
        type: Number,
        default: 300,
    },
})

const emit = defineEmits(['update:modelValue'])

const editorRef = ref(null)
const toolbarRef = ref(null)
let editorInstance = null

onMounted(async () => {
    if (!process.client) return

    const { createEditor, createToolbar } = await import('@wangeditor/editor')

    editorInstance = createEditor({
        selector: editorRef.value,
        config: {
            placeholder: props.placeholder,
            onChange(editor) {
                const html = editor.getHtml()
                emit('update:modelValue', html)
            },
            MENU_CONF: {
                // 可在这里配置上传图片等功能
                uploadImage: {
                    async customUpload(file, insertFn) {
                        const res = await upimg(file, () => { })
                        insertFn(res.data.url)
                    }
                },
                uploadVideo: {
                    async customUpload(file, insertFn) {
                        const res = await upfile(file, () => { })
                        insertFn(res.data.url)
                    }
                }
            },
        },
        html: props.modelValue,
        mode: 'default',
    })

    createToolbar({
        editor: editorInstance,
        selector: toolbarRef.value,
        config: {},
        mode: 'default',
    })
})

onBeforeUnmount(() => {
    if (editorInstance) {
        editorInstance.destroy()
        editorInstance = null
    }
})
</script>

<template>
    <div>
        <div ref="toolbarRef" style="border-bottom: 1px solid #ccc;" />
        <div ref="editorRef" :style="`min-height: ${height}px; padding: 10px;`" />
    </div>
</template>
