<template>
    <div class="error-page">
        <div class="error-container">
            <div class="error-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#ff6b6b" stroke-width="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
            
            <h1 class="error-title">系统配置加载失败</h1>
            
            <p class="error-description">
                config接口返回错误，无法读取系统配置
            </p>
            
            <div class="error-details">
                <h3>可能的原因：</h3>
                <ul>
                    <li>服务器连接异常</li>
                    <li>配置文件不存在或损坏</li>
                    <li>网络连接问题</li>
                    <li>权限不足</li>
                </ul>
            </div>
            
            <div class="error-actions">
            
                
                <button class="btn btn-secondary" @click="handleGoHome">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    返回首页
                </button>
            </div>
            
            <div class="error-info" v-if="errorDetails">
                <details>
                    <summary>技术详情</summary>
                    <pre>{{ errorDetails }}</pre>
                </details>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const errorDetails = ref(null)

const handleRetry = async () => {
    try {
        // 重新加载页面
        window.location.reload()
    } catch (error) {
        console.error('重试失败:', error)
    }
}

const handleGoHome = () => {
    try {
        router.push('/')
    } catch (error) {
        console.error('导航失败:', error)
        window.location.href = '/'
    }
}

onMounted(() => {
    // 从路由参数或localStorage中获取错误详情
    if (typeof window !== 'undefined') {
        const storedError = localStorage.getItem('configError')
        if (storedError) {
            errorDetails.value = storedError
            localStorage.removeItem('configError')
        }
    }
})

// 设置页面标题
useHead({
    title: '系统配置错误'
})
</script>

<style lang="scss" scoped>
.error-page {
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.error-container {
    background: white;
    border-radius: 16px;
    padding: 40px;
    max-width: 500px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    margin: 0 auto;
}

.error-icon {
    margin-bottom: 24px;
    
    svg {
        filter: drop-shadow(0 4px 8px rgba(255, 107, 107, 0.2));
    }
}

.error-title {
    color: #2c3e50;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 1.2;
}

.error-description {
    color: #e74c3c;
    font-size: 16px;
    margin-bottom: 32px;
    font-weight: 500;
}

.error-details {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 32px;
    text-align: left;
    
    h3 {
        color: #495057;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 12px;
    }
    
    ul {
        margin: 0;
        padding-left: 20px;
        
        li {
            color: #6c757d;
            font-size: 14px;
            margin-bottom: 8px;
            line-height: 1.5;
            
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

.error-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    
    &:hover {
        transform: translateY(-1px);
    }
    
    &:active {
        transform: translateY(0);
    }
    
    svg {
        flex-shrink: 0;
    }
}

.btn-primary {
    background: #667eea;
    color: white;
    
    &:hover {
        background: #5a6fd8;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
}

.btn-secondary {
    background: #e9ecef;
    color: #495057;
    
    &:hover {
        background: #dee2e6;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
}

.error-info {
    margin-top: 24px;
    
    details {
        text-align: left;
        
        summary {
            cursor: pointer;
            color: #6c757d;
            font-size: 12px;
            font-weight: 600;
            padding: 8px 12px;
            background: #f8f9fa;
            border-radius: 6px;
            display: inline-block;
            transition: all 0.2s ease;
            
            &:hover {
                background: #e9ecef;
            }
        }
        
        pre {
            margin-top: 12px;
            padding: 12px;
            background: #2c3e50;
            color: #ecf0f1;
            border-radius: 6px;
            font-size: 12px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    }
}

// 响应式设计
@media (max-width: 480px) {
    .error-container {
        padding: 24px;
        margin: 12px;
    }
    
    .error-title {
        font-size: 24px;
    }
    
    .error-actions {
        flex-direction: column;
        
        .btn {
            width: 100%;
            justify-content: center;
        }
    }
}

// 动画效果
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

.error-container {
    animation: fadeInUp 0.6s ease-out;
}
</style>