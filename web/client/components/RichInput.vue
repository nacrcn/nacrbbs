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

const emit = defineEmits(['update:modelValue', 'update:resources'])

const editorRef = ref(null)
const toolbarRef = ref(null)
let editorInstance = null

// 提取HTML中的资源链接
const extractResources = (html) => {
    const resources = []

    // 提取图片链接
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g
    let match
    while ((match = imgRegex.exec(html)) !== null) {
        resources.push({
            type: 1,
            url: match[1]
        })
    }

    // 提取视频链接
    const videoRegex = /<video[^>]*>\s*<source[^>]+src=["']([^"']+)["'][^>]*>\s*<\/video>/g
    while ((match = videoRegex.exec(html)) !== null) {
        resources.push({
            type: 2,
            url: match[1]
        })
    }

    return resources.sort((a, b) => b.type - a.type)
}

// 同步资源列表到父组件
const syncResources = () => {
    if (!editorInstance) return
    const html = editorInstance.getHtml()
    const resources = extractResources(html)
    emit('update:resources', resources)
}

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
                // 同步资源列表
                syncResources()
            },
            MENU_CONF: {
                // 可在这里配置上传图片等功能
                uploadImage: {
                    async customUpload(file, insertFn) {
                        const res = await upimg(file, () => { })
                        insertFn(res.data.url)
                        // 上传后同步资源列表
                        setTimeout(() => syncResources(), 100)
                    }
                },
                uploadVideo: {
                    async customUpload(file, insertFn) {
                        const res = await upfile(file, () => { })
                        insertFn(res.data.url)
                        // 上传后同步资源列表
                        setTimeout(() => syncResources(), 100)
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

    // 初始化时同步一次资源列表
    setTimeout(() => syncResources(), 100)
})

onBeforeUnmount(() => {
    if (editorInstance) {
        editorInstance.destroy()
        editorInstance = null
    }
})
</script>

<template>
    <div class="sa">
        <div ref="toolbarRef" style="border-bottom: 1px solid #ccc;" />
        <div ref="editorRef" :style="`min-height: ${height}px; padding: 10px;`" />
    </div>
</template>

<style>
    .sa{
        z-index: 289882;
        background-color: #fff;
        max-width: 1280px;
        left: 50%;
        top: 80px;
        /* s */
    }
</style>
