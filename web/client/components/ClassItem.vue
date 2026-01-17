<template>

    <div class="Itemlist" @click="navigateTo('/plate/' + data.id)">
        <div class="Avatar">
            <img :src="data.n_icon" alt="">
        </div>
        <div class="UserDetail">
            <p class="nickname">{{ data.n_name }}</p>
            <div class="Interactions">
                <span class="item">
                    <span class="label">热度：</span>
                    <span class="value">{{ formatNumber(data.n_hotnum || 0) }}</span>
                </span>
                <span class="item">
                    <span class="label">动态：</span>
                    <span class="value">{{ formatNumber(data.n_threads || 0 ) }}</span>
                </span>

            </div>
        </div>

    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
})

/* 数字格式化 自动识别转换 K W */
const formatNumber = (num) => {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    }
    return num
}

</script>

<style lang="scss" scoped>
.Itemlist {
    width: calc(100%);
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    display: flex;
    &:hover {
        .UserDetail{
            .nickname{
                color: rgb(0, 209, 129);
            }
        }
    }

    .Avatar {
        width: 50px;
        margin: 5px;

        img {
            width: 50px;
            height: 50px;
            border-radius: 10px;
        }
    }

    .UserDetail {
        padding-top: 10px;
        margin-left: 7px;
        width: calc(100% - 80px);

        .nickname {
            color: #000000;
            font-size: 16px;
            font-weight: 800;
        }

        .time {
            margin-top: 5px;
            font-size: 12px;
            color: #444;
        }
    }

    .Interactions {

        display: flex;
        align-items: center;
        margin-top: 3px;
        margin-bottom: 10px;
        gap: 10px;

        .item {
            display: flex;
            align-items: center;
            width: 100%;
            line-height: 20px;
            white-space: nowrap;
            .label {
                font-size: 12px;
                color: #444;
            }

            .value {
                font-size: 12px;
                color: #797979;
            }
        }
    }
}
</style>