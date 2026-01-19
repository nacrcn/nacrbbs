<template>
    <div>
        <a-spin :loading="loading" tip="正在加载" style="width: 100%;min-height: 300px;">
            <div class="flex-box" ref="containerRef">
                <div v-for="(column, colIndex) in columns" :key="colIndex" class="column">
                    <slot name="item" v-for="(item, index) in column" :item="item" :index="index" :column="colIndex">
                        {{ item }}
                    </slot>
                </div>
            </div>
            <div class="Isno" style="width: 100%;
                background-color: #fff;
                border-radius: 10px;" v-if="data.length === 0 && !loading">
                <a-result :status="null" title="无内容" subtitle="哎呀，没有内容了">
                    <template #icon>
                        <IconFaceSmileFill />
                    </template>
                </a-result>
            </div>
        </a-spin>

    </div>
</template>

<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    data: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Number,
        default: 2,
        validator: (value) => value >= 1 && value <= 10
    },
    columnWidth: {
        type: Number,
        default: 200
    },
    maxWidth: {
        type: Number,
        default: 1200
    },
    itemHeight: {
        type: Number,
        default: 200
    },
    gap: {
        type: Number,
        default: 10
    }
})
const List = ref(props.data)
const containerRef = ref(null)
const columns = ref([])

// 计算自适应列数
const calculateColumns = () => {
    if (containerRef.value) {
        const containerWidth = containerRef.value.clientWidth
        const availableWidth = Math.min(containerWidth, props.maxWidth)
        const calculatedColumns = Math.floor((availableWidth + props.gap) / (props.columnWidth + props.gap))
        return Math.max(1, Math.min(props.columns, calculatedColumns))
    }
    return props.columns
}

// 分配元素到多列（最小高度算法）
const distributeItems = () => {
    const numColumns = calculateColumns()
    const columnHeights = Array(numColumns).fill(0)
    const result = Array(numColumns).fill(null).map(() => [])

    List.value.forEach(item => {
        const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights))
        result[minHeightIndex].push(item)
        columnHeights[minHeightIndex] += item.height || props.itemHeight
    })

    columns.value = result
}

// 监听数据变化
watch(() => props.data, () => {
    List.value = props.data
    distributeItems()
}, { immediate: true, deep: true })
watch(() => props.loading, () => {
    props.loading = props.loading
}, { immediate: true })

// 监听窗口大小变化以自适应列数
let resizeObserver = null

onMounted(() => {
    resizeObserver = new ResizeObserver(() => {
        distributeItems()
    })
    if (containerRef.value) {
        resizeObserver.observe(containerRef.value)
    }
})

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
})

</script>

<style lang="scss" scoped>
.flex-box {
    display: flex;
    flex-wrap: wrap;
    gap: v-bind('props.gap + "px"');
    margin: 0 auto;
    width: 100%;

    .column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: v-bind('props.gap + "px"');
        min-width: 0;
    }
}
</style>
