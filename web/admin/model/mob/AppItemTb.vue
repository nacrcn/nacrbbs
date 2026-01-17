<template>
    <div class="PageCAppItem_a_boxBox" @click="handleClick()">
        <p v-if="props.index && props.index >= 0 && props.index < 4" :class="'index index_' + props.index">
            <icon-fire class="icon" /> {{ props.index }}
        </p>
        <!-- 时间 -->
        <p v-if="props.item.xu_time && props.time" class="time">
            <span>{{ timeFun(props.item.xu_time) }}</span>
        </p>

        <!-- 按钮 -->
        <div class="lookdeft" v-if="props.but">
            <p>浏览</p>
        </div>
        <div class="Logoico">
            <img :src="props.item.xu_icon" alt="">
        </div>
        <div class="info">
            <p class="name">{{ props.item.xu_name }}</p>
            <p class="brief">{{ props.item.xu_version }} | {{ props.item.xu_size }} | <icon-download />{{
                props.item.xu_downsize }}</p>
<!-- 推荐0 -->
               <div class="tag">
                    <p class="downrank" v-for="item in props.item.ranks" :key="item.id">
                        <icon-fire class="icon" /><span>{{ item.rank_name }}{{ item.rank_position - 1 }}名</span>
                    </p>
                </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(["item", "index", 'time', 'but'])


const timeFun = (time) => {
    // 创建 Date 对象
    const date = new Date(time);

    // 提取时间，去掉年份和秒数，并补零
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 补零到两位
    const day = date.getDate().toString().padStart(2, '0'); // 补零到两位

    // 格式化输出
    const formattedDate = `${month}-${day}`;
    return formattedDate;
};

const handleClick = () => {
    // window.open(props.item.xu_url, '_blank')
    let path = ''
    if (props.item.xu_path && props.item.xu_path !== '') {
        path = props.item.xu_path
    } else {
        path = props.item.id
    }

    // if()
    /* 获取视口宽度 */
    const viewportWidth = window.innerWidth;
    let pathNuxt = viewportWidth > 768 ? '/pc/app/' + path : '/app/' + path
    navigateTo({ path: pathNuxt })
}
</script>

<style lang="scss" scoped>
.PageCAppItem_a_boxBox {
    width: calc(100% - 0px);
    height: 60px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    padding: 10px 0px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;

    &:hover {
        background-color: #f0f0f0;
    }

    .Logoico {
        width: 60px;
        height: 60px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }

    .info {
        margin-left: 10px;
        margin-top: 1px;

        .name {
            font-size: 14px;
            color: #474747;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 3px;
            font-weight: 800;
        }

        .brief {
            font-size: 13px;
            color: #999;
            margin-top: 5px;
        }

        .tag {
            white-space: nowrap;
            margin-top: 3px;
            position: relative;
            z-index: 2;

            .downrank {
                display: inline-block;
                margin-right: 3px;
                padding: 2px 3px;
                border-radius: 3px;
                font-weight: 800;
                color: #fa6328;
                overflow: hidden;

                span {
                    font-size: 10px;
                    /* 渐变文本颜色 */
                    background: linear-gradient(90deg, #fa6328, #fac928, #fa6328);
                    background-size: 200% auto;
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: transparent;
                    -webkit-text-fill-color: transparent;
                    /* 动画 */
                    animation: gradientMove 3s linear infinite;
                    margin-left: 1px;
                }

                .icon {
                    font-size: 12px;
                }

                &::after {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 18px;
                    position: relative;
                    bottom: 15px;
                    left: 0;
                    background: linear-gradient(180deg, #ffffff, #ff6d4923);
                    // opacity: 0.5;
                    z-index: -1;
                    border-radius: 3px;
                }

            }


            

            .tagitem {
                display: inline-block;
                margin-right: 5px;
                padding: 2px 3px;
                border-radius: 3px;

                span {
                    font-size: 10px;
                }
            }
        }

        @keyframes gradientMove {
            0% {
                background-position: 0% center;
            }

            100% {
                background-position: 200% center;
            }
        }

    }

    .time {
        display: flex;
        border-radius: 10px;
        padding: 2px 10px;
        background-color: #f0f0f0;
        background: linear-gradient(95.84deg, #edf6ff 5.59%, #f0f3ff 51.42%, #f5f0ff 97.24%);
        height: 20px;
        margin-top: 10px;
        margin-right: 10px;
        font-size: 12px;

        span {
            line-height: 20px;
            background: linear-gradient(90deg, #335bff, #ca37ce);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
    }

    .lookdeft {
        position: absolute;
        top: 20px;
        right: 5px;
        border-radius: 30px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        background-color: #2867FA;
        padding: 7.5px 20px;
        font-weight: 800;
        /* 字间距 */


    }

    .index {
        position: absolute;
        top: 10px;
        right: 5px;
        border-radius: 10px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        padding: 1px 4px;
        border: 2px solid #fff;
    }

    .index_1 {
        background-color: #ff6600;
    }

    .index_2 {
        background-color: #ff9900;
    }

    .index_3 {
        background-color: #ffcc00;
    }
}
</style>
