<template>
    <div class="AppClassBox" :style="{paddingBottom: props.NoPaddin ? '0px' : '100px'}">
         <!-- 标题 -->
        <div class="titleBox">
            <p class="title" @click="handleClick()">
                <span>{{ props.name }}</span>
                <span class="more" v-if="props.ToUrl">查看更多<icon-right class="icon" /></span>
            </p>
            <!-- 切换列表样式 -->
            <div class="StyleSwitch" v-if="!props.NoStyleSwitch">
                <a-radio-group type="button" size="mini" v-model="showTuype">
                    <a-radio value="1"><icon-unordered-list /></a-radio>
                    <a-radio value="2"><icon-image /></a-radio>
                    <a-radio value="3"><icon-apps /></a-radio>
                </a-radio-group>
            </div>
        </div>
        <div class="divFlexbox" v-if="showTuype == '1'">
            <div v-for="(item, index) in list" :key="index">
                <AppItemTb :item="item" :but="true">
                </AppItemTb>
            </div>
        </div>
        <div class="divFlexbox" v-if="showTuype == '2'">
            <div v-for="(item, index) in list" :key="index">
                <AppItemTa :item="item" :but="true">
                </AppItemTa>
            </div>
        </div>
        <div class="TcBox" v-if="showTuype == '3'">
            <div v-for="(item, index) in list" :key="index">
                <AppItemTc :item="item" :but="true">
                </AppItemTc>
            </div>
        </div>
         <div class="Xtrue" v-if="showTuype == '4'">
            <div v-for="(item, index) in list" :key="index">
                <AppItemTb :item="item" :but="false">
                </AppItemTb>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * 应用列表组件
 * props:
 * * list: 应用列表数据
 * * name: 列表名称
 * * NoStyleSwitch: 是否隐藏样式切换按钮，默认显示
 * * ShowSwitch: 默认显示样式，1=列表，2=大图，3=小图
 * * ToUrl: 标题跳转链接1
 * * NoMore: 没有更多
 * * */ 
const props = defineProps(["list", "name","NoStyleSwitch","ShowSwitch","ToUrl","NoMore",'NoPaddin'])
import AppItemTb from '~/model/mob/AppItemTb.vue'
import AppItemTa from '~/model/mob/AppItemTa.vue'
import AppItemTc from '~/model/mob/AppItemTc.vue'

const showTuype = ref('2')

if(props.ShowSwitch){
    showTuype.value=props.ShowSwitch.toString()
}
const loading = ref(false)

const handleClick = () => {
    if(props.ToUrl){
        navigateTo(props.ToUrl)
    }
}

const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight

  if (scrollTop + clientHeight >= scrollHeight - 10 && !loading.value) {

    if(props.NoMore){
        return ;
    }
    console.log('滚动到底部了');
    
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.AppClassBox {
    width: calc(100% - 20px);
    margin: 0 auto;
    .titleBox {
        position: relative;

        .title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;

        }

        .StyleSwitch {
            position: absolute;
            right: 0;
            top: -2px;
            height: 30px;
            background-color: #fff;
        }
    }

}

.more{
    font-size: 12px;
    color: #999;
    margin-left: 10px;
    font-weight: 400;
}

.TcBox {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
}
.Xtrue {
    display: grid;
    grid-auto-flow: column;    /* 按列填充 */
    grid-template-rows: repeat(3, 1fr); /* 理论上 3 行 */
    grid-auto-columns: 280px;        /* 每列宽度 */
    gap: 5px;

    max-height: calc(1.5 * 280px + 5px); /* 控制1.5行高度 (200px 是子项高度) */
    overflow-x: auto;                /* 横向滚动 */
    overflow-y: hidden;              /* 不要竖向滚动 */
}
</style>
