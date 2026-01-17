<template>
    <div class="PageCAppItem_a_boxBox">
        <img :src="props.item.xu_backimg" alt="">
        <div class="info">
            <p class="name">{{ props.item.xu_name }}</p>
            <p class="brief">{{ props.item.xu_brief }}</p>

            <!-- 应用列表 -->
            <div class="appList">   
                <div class="appItem" v-for="(item, index) in props.item.app" :key="index">
                    <img :src="item.xu_icon" alt="">
                </div>
                <div class="appItem" >
                    <p>更多</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(["item", "index"])


const timeFun = (time) => {
    // 创建 Date 对象
    const date = new Date(time);

    // 提取时间，去掉年份和秒数，并补零
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 补零到两位
    const day = date.getDate().toString().padStart(2, '0'); // 补零到两位
    const hours = date.getHours().toString().padStart(2, '0'); // 补零到两位
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 补零到两位

    // 格式化输出
    const formattedDate = `${month}-${day}`;
    return formattedDate;
};
</script>

<style lang="scss" scoped>
.PageCAppItem_a_boxBox {
    width: calc(100%);
    height: 170px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }

 
    .info {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        padding: 20px;
        background: linear-gradient(180deg, #000000c4, #ffffff7e);
        .name {
            font-size: 16px;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 800;
            margin-bottom: 10px;
        }

        .brief {
            font-size: 12px;
            color: #cecece;
            margin-top: 2px;
        }
        .appList{
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            .appItem{
                width: 33px;
                height: 33px;
                margin-right: 10px;
                margin-bottom: 10px;
                border-radius: 5px;
                background-color: #ffffff88;
                line-height: 33px;
                text-align: center;
                font-size: 12px;

                &:hover{
                    transform: scale(1.1);
                }
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                }
            }
        }
    }

}
</style>
