<template>
    <div id="chart" ref="HourIPRef" style="width: 100%; height: 300px"></div>
</template>

<script setup>
import * as echarts from "echarts";
const props = defineProps(["time", "data"]);
/* 图表渲染 */
const HourIPRef = ref(null);
let HourIPData = null;

const colorList = ['#9E87FF', '#d5cbff']

const initChart = () => {
    HourIPData = echarts.init(HourIPRef.value);
    const option = {
        backgroundColor: '#fff',
        title: {
            text: '15 日下载统计',
            textStyle: {
                fontSize: 12,
                fontWeight: 400
            },
            left: 'left',
            top: '3%'
        },
        legend: {
            icon: 'circle',
            bottom: '0%',
            right: 'center',
            itemWidth: 6,
            itemGap: 20,
            textStyle: {
                color: '#556677'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    show: true,
                    backgroundColor: '#fff',
                    color: '#556677',
                    borderColor: 'rgba(0,0,0,0)',
                    shadowColor: 'rgba(0,0,0,0)',
                    shadowOffsetY: 0
                },
                lineStyle: {
                    width: 0
                }
            },
            backgroundColor: '#fff',
            textStyle: {
                color: '#5c6c7c'
            },
            padding: [10, 10],
            extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
        },
        grid: {
            top: '15%',
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: props.time ?? [],

            axisLine: {
                show: true,
                lineStyle: {
                    color: '#f4f4f4'
                }
            },
            splitLine: {
                show: true,
                color: '#f0f0f0'
            },
            axisTick: {
                show: true,
                alignWithLabel: true,
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#556677'
                },
                // 默认x轴字体大小
                fontSize: 10,
                // margin:文字到x轴的距离
                margin: 35,
                align: 'center',
                rotate: 45 
            },
            axisPointer: {
                label: {
                    padding: [0, 0, 10, 0],
                    margin: 15,
                    fontSize: 12,
                    backgroundColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#fff' // 0% 处的颜色
                        }, {
                            offset: 0.86,
                            color: '#fff' // 0% 处的颜色
                        }, {
                            offset: 0.86,
                            color: '#33c0cd' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#33c0cd' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            },

            boundaryGap: false
        }],

        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#DCE2E8'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#556677'
                }
            },
            // 分割线
            splitLine: {
                lineStyle: {
                    type: "dashed",
                    color: "#E9E9E9"
                }
            }
        }, {
            type: 'value',
            // position: 'right',
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#556677'
                },
                formatter: '{value}'
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#DCE2E8'
                }
            },
            splitLine: {
                show: false
            }
        }],
        series: [{
            name: '当日下载',
            type: 'line',
            data: props.data ?? [],
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
                width: 2,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: colorList[0]
                },
                {
                    offset: 1,
                    color: colorList[0]
                }
                ]),

            },
            itemStyle: {
                normal: {
                    color: colorList[0],
                    borderColor: colorList[0]
                }
            }
        },
        ]
    }
    HourIPData.setOption(option);
};

import { nextTick } from 'vue';

onMounted(() => {
    nextTick(() => {
       setTimeout(() => {
        initChart();
       }, 100);
    });
});
/* 监听数据变化 */
watch(() => props.data, () => {
     nextTick(() => {
       setTimeout(() => {
        initChart();
       }, 100);
    });
}, {
    deep: true,
    immediate: true
});

</script>

<style scoped lang="scss">
#chart {
  color: #bdd4f7;
}
</style>
