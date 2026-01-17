<template>
    <div class="comment-item">
        <div class="comment-avatar">
            <img :src="data.user?.n_avatar || '/default-avatar.png'" :alt="data.user?.n_nickname">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">{{ data.user?.n_nickname || '匿名用户' }}</span>
                <a-tag v-if="isAuthor" size="mini" color="arcoblue">作者</a-tag>
                <span class="comment-time">{{ formatTime(data.n_time) }}</span>
            </div>
            <div class="comment-body" v-html="data.n_html"></div>

            <div v-if="data.thread" class="Hbs">
                回复帖子：<span @click="navigateTo('/threads/' +  data.thread.id)">{{ data.thread.n_name }}</span>
            </div>
            <div class="comment-actions">
                <a-popconfirm @ok="DelComments(data.id)" content="确定删除吗?" type="error">
                    <a-button status="danger" v-if="UserInfo.$state.UserInfo?.id == data.n_uid" class="action-btn"
                        size="mini" style="border-radius: 20px;">
                        <template #icon>
                            <icon-delete />
                        </template>
                        删除评论
                    </a-button>
                </a-popconfirm>

            </div>
            <div class="comment-reply">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const UserInfo = useUserInfo()
const props = defineProps({
    data: {
        type: Object,
        required: true,
        default: () => ({}),
    },
    isAuthor: {
        type: Boolean,
        default: false,
    }
})
const emit = defineEmits(['reply', 'like'])

const formatTime = (timeStr) => {
    if (!timeStr) return ''
    const date = new Date(timeStr)
    const now = new Date()
    const diff = now - date

    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour

    if (diff < minute) {
        return '刚刚'
    } else if (diff < hour) {
        return Math.floor(diff / minute) + '分钟前'
    } else if (diff < day) {
        return Math.floor(diff / hour) + '小时前'
    } else if (diff < day * 7) {
        return Math.floor(diff / day) + '天前'
    } else {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }
}

/* 删除评论 DelComments */
const DelComments = async (id) => {

    try {
        const res = await useApiFetch().post('/api/DelComments', { id })
        if (res.code == 200) {
            Message.success('删除评论成功')
            emit('reload')
        } else {
            Message.error(res.message || '删除评论失败')
        }

    } catch (error) {

        Message.error(error.message)

    }

}
</script>

<style lang="scss" scoped>
.comment-item {
    display: flex;
    gap: 12px;
    padding: 16px;
    background-color: #fff;
    border-radius: 12px;
    margin-bottom: 12px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f8f9fa;
    }

    .comment-avatar {
        flex-shrink: 0;

        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #f0f0f0;
        }
    }

    .comment-content {
        flex: 1;
        min-width: 0;

        .comment-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;

            .comment-author {
                font-size: 14px;
                font-weight: 600;
                color: #333;
            }

            .comment-time {
                font-size: 12px;
                color: #999;
            }
        }

        .comment-body {
            font-size: 14px;
            line-height: 1.6;
            color: #555;
            margin-bottom: 12px;
            word-break: break-word;

            :deep(img) {
                max-width: 100%;
                border-radius: 8px;
            }

            :deep(a) {
                color: #00d181;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
        .Hbs{
            font-size: 12px;
            background-color: #f7f7f7;
            padding: 10px;
            border-radius: 10px;
            span{
                color: #00d181;
                cursor: pointer;
            }
        }

        .comment-actions {
            display: flex;
            gap: 8px;

            .action-btn {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 6px 12px;
                border: none;
                background-color: #f5f5f5;
                border-radius: 16px;
                font-size: 12px;
                color: #666;
                cursor: pointer;
                transition: all 0.2s;

                &:hover {
                    background-color: #e0e0e0;
                    color: #333;
                }

                &:active {
                    transform: scale(0.98);
                }

                svg {
                    flex-shrink: 0;
                }
            }
        }
    }
}
</style>