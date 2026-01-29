<template>

    <div class="Itemlist" @click="navigateTo('/threads/' + data.id)">
        <!-- 按钮部分 -->
        <div class="ButtonSection">
            <a-button @click.stop="PopShow = true">
                <template #icon>
                    <icon-more />
                </template>
            </a-button>
        </div>
        <div class="UserInfo">
            <div class="Avatar">
                <Lazimg class="AvatarImg" :src="Users?.n_avatar" alt="" />
                <!-- <img :src="Users?.n_avatar" alt=""> -->
            </div>
            <div class="UserDetail">
                <div class="UserInfoBox">
                    <p class="nickname">
                        {{ Users?.n_nickname }}
                    </p>
                    <a-tooltip v-for="(value, index) in Users?.medals || []" :key="index" :content="value.n_name"
                        position="bottom">
                        <img :src="value.n_src" alt="勋章" class="medal-icon" />
                    </a-tooltip>
                </div>
                <p class="time">{{ data.n_time }}</p>
            </div>
        </div>
        <div class="Content">
            <div class="PostContent">
                <p class="Title">{{ data.n_name }}</p>
                <p class="word">{{ data.n_profile }}</p>
            </div>
            <div :class="['ImageList', {
                one: data.n_resources && data.n_resources.length === 1,
                two: data.n_resources && data.n_resources.length === 2
            }]">
                <div v-for="value in data.n_resources" :key="value.url" class="media-item">
                    <img v-if="value.type === 1" :src="value.url" alt=""
                        :class="{ 'loaded': imageLoadedStates[value.url] }" @load="handleImageLoad(value.url)"
                        @error="handleImageError(value.url)" loading="lazy" />
                    <div v-if="value.type === 2" class="video-container">
                        <video :src="value.url"></video>
                        <div class="play-button">
                            <icon-play-circle-fill />
                        </div>
                    </div>
                </div>
            </div>

            <div class="PostActions" v-if="data.category && data.category.length > 0">
                <div class="Category">
                    <a-space wrap>
                        <div class="Tag" v-for="value in data.category" :key="value">
                            <span v-if="value.n_type == 2">#</span>
                            {{ value.n_name }}
                        </div>
                    </a-space>
                </div>
            </div>
            <div class="Interactions">
                <span class="item">
                    <icon-eye class="icon" />
                    <span>{{ formatNumber(data.n_read || 0) }}</span>
                </span>
                <span class="item">
                    <icon-message class="icon" />
                    <span>{{ formatNumber(data.n_msgs || 0) }}</span>
                </span>
                <span class="item">
                    <icon-thumb-up class="icon" />
                    <span>{{ formatNumber(data.n_starts || 0) }}</span>
                </span>
            </div>
        </div>

        <!-- 操作框 -->
        <popupMob v-model:modelValue="PopShow" :Title="'操作'" Nook>
            <template #content>
                <a-space wrap>
                    <a-button @click="navigateTo('/threadInfo/' + data.id)"
                        v-if="UserInfo.$state.UserInfo?.id == data.n_uid" style="border-radius: 20px;">
                        <template #icon>
                            <icon-edit />
                        </template>
                        编辑贴贴
                    </a-button>

                    <a-button status="warning" style="border-radius: 20px;" @click="reportThreadsShow = true">
                        <template #icon>
                            <icon-info-circle />
                        </template>
                        举报帖子
                    </a-button>
                    <a-popconfirm @ok="DelThreads()" content="确定删除吗?" type="error"
                        v-if="UserInfo.$state.UserInfo?.id == data.n_uid">
                        <a-button status="danger" style="border-radius: 20px;">
                            <template #icon>
                                <icon-delete />
                            </template>
                            删除贴贴
                        </a-button>
                    </a-popconfirm>

                </a-space>

            </template>
        </popupMob>

        <!-- 举报 -->
        <popupMob v-model:modelValue="reportThreadsShow" :Title="'举报'" Nook>
            <template #content>
                <a-form :model="form" :layout="'vertical'">

                    <a-form-item field="post" label="举报原因">
                        <a-textarea class="road" v-model="reportThreadsFrom.n_html" placeholder="请输入举报原因"
                            :max-length="200" allow-clear show-word-limit />
                    </a-form-item>
                    <a-form-item field="post" label="">
                        <a-button type="primary" class="road" @click="reportThreads()">提交</a-button>
                    </a-form-item>

                </a-form>

            </template>
        </popupMob>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
})
const UserInfo = useUserInfo()
UserInfo.init()

/* 图片加载状态管理 */
const imageLoadedStates = ref({})

const handleImageLoad = (url) => {
    imageLoadedStates.value[url] = true
}

const handleImageError = (url) => {
    imageLoadedStates.value[url] = true
}

/* 数字格式化 自动识别转换 K W */
const formatNumber = (num) => {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    }
    return num
}

const PopShow = ref(false)
/* 举报帖子 ReportThreads */
const reportThreadsFrom = ref({
    n_tid: props.data.id,
    n_html: ''
})
const reportThreadsShow = ref(false)
const reportThreads = async () => {
    // 举报帖子逻辑
    const res = await useApiFetch().post('/api/ReportThreads', reportThreadsFrom.value)
    if (res.code === 200) {
        reportThreadsShow.value = false
        Message.success(res.msg)
    } else {
        Message.error(res.msg)
    }
}
/* 删除帖子 DelThreads */
const DelThreads = async () => {
    try {
        const res = await useApiFetch().post('/api/DelThreads', {
            id: props.data.id
        })
        if (res.code == 200) {
            Message.success('删除成功')
            /* 刷新列表 */
            window.location.reload()
        } else {
            Message.error(res.message || '删除失败')
        }
    } catch (error) {
        Message.error(error.message)
    }
}
/* 获取用户信息 GetUser */
const Users = ref({})
const GetUser = async () => {
    try {
        const res = await useApiFetch().post('/api/GetUser', {
            id: props.data.n_uid
        })
        if (res.code == 200) {
            Users.value = res.data
        } else {
            Message.error(res.message || '获取用户信息失败')
        }
    } catch (error) {
        Message.error(error.message)
    }
}

/* 深度监听data */
watch(() => props.data, (newVal, oldVal) => {
    if (newVal) {
        props.data = newVal
        GetUser()
    }
}, { immediate: true, deep: true })
</script>

<style lang="scss" scoped>
.Itemlist {
    width: calc(100% - 20px);
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    position: relative;

    .ButtonSection {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .UserInfo {
        display: flex;

        .Avatar {
            width: 60px;
            margin: 5px;

            .AvatarImg {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
            }
        }

        .UserDetail {
            padding-top: 10px;
            margin-left: 7px;
            width: 100%;

            .nickname {
                color: #000000;
                font-size: 16px;
                font-weight: 800;
            }

            .UserInfoBox {
                display: flex;
                gap: 3px;

                .nickname {
                    color: #000000;
                    font-size: 16px;
                    font-weight: 800;
                }

                .medal-icon {
                    height: 20px;
                }
            }

            .time {
                margin-top: 5px;
                font-size: 12px;
                color: #444;
            }
        }
    }


    .Content {
        width: calc(100% - 20px);
        margin-right: 10px;
        padding: 0 10px;


        .PostContent {
            margin-top: 10px;

            .Title {
                font-size: 16px;
                color: #000;
            }

            .word {
                margin-top: 10px;
                font-size: 13px;
                color: #444;
            }

        }

        .ImageList {
            margin-top: 10px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 7px;
            width: 100%;

            .media-item {
                position: relative;
                aspect-ratio: 1;
                border-radius: 10px;
                overflow: hidden;
            }

            img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
                object-fit: cover;
                filter: blur(20px);
                transition: filter 0.6s ease-in-out;
                opacity: 0.9;

                &.loaded {
                    filter: blur(0);
                    opacity: 1;
                }
            }

            .video-container {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 10px;
                overflow: hidden;

                video {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    object-fit: cover;
                }

                .play-button {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 48px;
                    color: rgba(255, 255, 255, 0.9);
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        color: rgba(255, 255, 255, 1);
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                }
            }
        }

        .one {
            grid-template-columns: 1fr;
        }

        .two {
            grid-template-columns: 1fr 1fr;
        }

        .PostActions {
            margin-top: 20px;
            position: relative;

            .Category {

                .Tag {
                    border-radius: 20px;
                    padding: 5px 10px;
                    font-size: 12px;
                    background-color: #ecf7fc;
                    display: inline-block;
                    color: #1890ff;
                }
            }

        }

        .Interactions {

            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: center;
            margin-top: 10px;
            margin-bottom: 10px;

            .item {
                display: flex;
                align-items: center;
                gap: 5px;
                width: 100%;
                justify-content: center;
                line-height: 20px;

                span {
                    font-size: 12px;
                    color: #444;
                }

                .icon {
                    font-size: 16px;
                    color: #797979;
                }
            }
        }
    }
}
</style>