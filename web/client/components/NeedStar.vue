<template>
    <div class="boxs">
        <div class="icon-wrapper">
            <span class="star-icon">⭐</span>
        </div>

        <h3 class="title">
            求个 Star
        </h3>

        <p class="description">
            如果您喜欢这个项目，能给我一个 Star 支持一下吗？
        </p>

        <div class="button-wrapper">
            <iframe src="https://ghbtns.com/github-btn.html?user=nacrcn&repo=nacrbbs&type=star&count=true"
                frameborder="0" scrolling="0" width="120" height="20" title="GitHub Star" class="github-btn">
            </iframe>
        </div>

        <div class="link-wrapper">
            <a href="https://github.com/nacrcn/nacrbbs" target="_blank" rel="noopener noreferrer" class="github-link">
              
                <span>GitHub 仓库</span>
            </a>
            <a href="https://gitee.com/wuaxcn/nacrbbs" target="_blank" rel="noopener noreferrer" class="gitee-link">
               
                <span>Gitee 仓库</span>
            </a>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.boxs {
    width: calc(100% - 20px);
    padding: 15px 10px;
    border-radius: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
    transition: all 0.3s ease;


    .icon-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 12px;
    }

    .star-icon {
        font-size: 36px;
        display: inline-block;
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {

        0%,
        100% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.1);
        }
    }

    .title {
        margin: 0 0 8px;
        font-size: 18px;
        font-weight: 600;
        color: #1a1a1a;
        text-align: center;
    }

    .description {
        margin: 0 0 16px;
        font-size: 14px;
        color: #666;
        text-align: center;
        line-height: 1.5;
    }

    .button-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;

        .github-btn {
            border-radius: 20px;
            overflow: hidden;
        }
    }

    .link-wrapper {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding-top: 12px;
        border-top: 1px solid #f0f0f0;

        .github-link {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 10px;
            background: #1b1b1b;
            border-radius: 8px;
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s ease;

            svg {
                flex-shrink: 0;
            }
        }

        .gitee-link {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 10px;
            background: #da0808;
            border-radius: 8px;
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s ease;

            svg {
                flex-shrink: 0;
            }
        }
    }
}
</style>