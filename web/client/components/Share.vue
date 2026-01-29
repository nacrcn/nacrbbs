<template>
    <div class="Share">
        <div class="share-poster" ref="posterRef">
            <!-- 海报头部 -->
            <div class="poster-header">
                <img :src="data?.user?.n_avatar" class="avatar" alt="用户头像" />
                <div class="user-info">
                    <div class="nickname">{{ data?.user?.n_nickname }}</div>
                    <div class="time">{{ formatTime(data?.n_time) }}</div>
                </div>
            </div>

            <!-- 内容区域 -->
            <div class="poster-content">
                <div class="title">{{ data?.n_name }}</div>
                <div class="desc" v-if="data?.n_profile">{{ data?.n_profile }}</div>

                <!-- 图片展示 -->
                <div class="images" v-if="images && images.length > 0">
                    <div v-for="(img, index) in images" :key="index" class="image-item"
                        :class="{ 'single-image': images.length === 1 }">
                        <img :src="img.url" alt="帖子图片" />
                    </div>
                </div>

                <!-- 统计信息 -->
                <div class="stats">
                    <div class="stat-item">
                        <span class="stat-value">{{ data?.n_read || 0 }}</span>
                        <span class="stat-label">阅读</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ data?.n_msgs || 0 }}</span>
                        <span class="stat-label">评论</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ data?.n_starts || 0 }}</span>
                        <span class="stat-label">点赞</span>
                    </div>
                </div>
            </div>

            <!-- 海报底部 -->
            <div class="poster-footer">
                <div class="qr-code">
                    <QRCodeVue :value="shareUrl" :size="80" level="L" />
                </div>
                <div class="footer-info">
                    <div class="app-name">{{SiteConfig.$state.Config.n_web_title}}</div>
                    <div class="scan-tip">扫码查看详情</div>
                </div>
            </div>
        </div>

        <!-- 操作按钮 -->
        <div class="share-actions">
            <button class="action-btn" @click="downloadPoster">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                保存海报
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import QRCodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'
const SiteConfig = useSiteConfig()

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
})

const posterRef = ref(null)
let shareUrl = ref('')
onMounted(() => {
    shareUrl.value = window.location.href

})

const images = computed(() => {
    try {
        if (props.data?.n_resources) {
            const resources = JSON.parse(props.data.n_resources)
            return resources.filter(item => item.type === 1)
        }
    } catch (e) {
        console.error('解析资源失败:', e)
    }
    return []
})

const formatTime = (time) => {
    if (!time) return ''
    return new Date(time).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
}

const downloadPoster = async () => {
    if (!posterRef.value) return

    try {
        const canvas = await html2canvas(posterRef.value, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
        })

        const link = document.createElement('a')
        link.download = `share-poster-${props.data?.id || Date.now()}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
    } catch (error) {
        console.error('生成海报失败:', error)
        alert('生成海报失败，请重试')
    }
}
</script>

<style lang="scss" scoped>
.Share {}

.share-poster {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
}

.poster-header {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;

    .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #e0e0e0;
    }

    .user-info {
        margin-left: 12px;
        flex: 1;

        .nickname {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
        }

        .time {
            font-size: 12px;
            color: #999;
        }
    }
}

.poster-content {
    padding: 10px;

    .title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        line-height: 1.5;
        margin-bottom: 12px;
    }

    .desc {
        font-size: 14px;
        color: #666;
        line-height: 1.6;
        margin-bottom: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

    .images {
        display: grid;
        gap: 8px;
        margin-bottom: 20px;

        &.images {
            grid-template-columns: repeat(3, 1fr);
        }

        .image-item {
            border-radius: 8px;
            overflow: hidden;
            background: #f5f5f5;
            aspect-ratio: 1;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            &.single-image {
                aspect-ratio: 16/9;
                grid-column: span 3;
            }
        }
    }

    .stats {
        display: flex;
        justify-content: space-around;
        padding: 16px 0;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;

        .stat-item {
            text-align: center;

            .stat-value {
                display: block;
                font-size: 20px;
                font-weight: 600;
                color: #333;
                margin-bottom: 4px;
            }

            .stat-label {
                font-size: 12px;
                color: #999;
            }
        }
    }
}

.poster-footer {
    display: flex;
    align-items: center;
    padding: 10px;
    background: linear-gradient(135deg, #00ad88 0%, #00ad88 100%);

    .qr-code {
        width: 80px;
        height: 80px;
        background: #ffffff;
        padding: 4px;
        border-radius: 8px;
    }

    .footer-info {
        margin-left: 16px;
        color: #ffffff;

        .app-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 6px;
        }

        .scan-tip {
            font-size: 14px;
            opacity: 0.9;
        }
    }
}

.share-actions {
    margin-top: 20px;
    text-align: center;

    .action-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 32px;
        background: linear-gradient(135deg, #00ad88 0%, #00ad88 100%);
        color: #ffffff;
        border: none;
        border-radius: 24px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        &:active {
            transform: translateY(0);
        }
    }
}
</style>
