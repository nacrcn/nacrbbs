<template>
    <div class="vip-page">
        <UserHeader title="每日签到"></UserHeader>
        <div class="Page">

            <div class="Pagecontent">
                <p class="title">每日签到</p>

                <div class="TimeBox">
                    <div :class="['TimeBoxTitle', { active: value.Info }]" v-for="value in currentMonthDayList.days">
                        {{ value.day }}

                        <p class="signstatus">
                        <p v-if="!value.Info">未签到</p>
                        <p class="signtrue" v-else>{{ value.Info.n_reward_type === '1' ? '积分' : '余额' }}*{{
                            value.Info.n_reward_number }}</p>
                        </p>
                    </div>
                </div>

                <div>
                    <a-button :loading="loading" v-if="!isTodayCheckedIn" type="primary" class="signbutton" size="small"
                        @click="checkIn()">
                        立即签到 (奖励 {{ checkInReward?.Config?.n_reward_type === '1' ? '积分' : '余额' }}*{{ checkInReward.Today
                        }})
                    </a-button>
                    <a-result v-if="isTodayCheckedIn" status="success" title="今日已签到">
                        <template #subtitle>
                            <p class="signsta">已发放 {{ isTodayCheckedIn.n_reward_type === '1' ? '积分' : '余额' }} * {{
                                isTodayCheckedIn.n_reward_number }}</p>
                            <div class="continuousDays">
                                您已连续签到{{ isTodayCheckedIn.continuousDays ?? 1 }}天，明日签到将获得{{ checkInReward.Tomorrow }}{{
                                    checkInReward.Config.n_reward_type === '1' ? '积分' : '余额' }}
                            </div>
                        </template>
                    </a-result>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';

/* 今日是否签到 */
const isTodayCheckedIn = ref(false);


function getCurrentMonthDayList() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1 // 1-12

    // 当月天数
    const daysInMonth = new Date(year, month, 0).getDate()

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1
        const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        return {
            day,
            date
        }
    })

    return {
        year,
        month,
        days
    }
}

/* 判断今日是否签到函数 */
function isCheckedInToday(date) {
    for (let i = 0; i < checkInList.value.length; i++) {
        if (checkInList.value[i].n_time === date) {
            return checkInList.value[i]
        }
    }

    return false
}
const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}
/* 获取签到记录 /api/checkInList */
const checkInList = ref([])
const currentMonthDayList = ref([]);

const getCheckInList = async () => {
    const res = await useApiFetch().post('/api/checkInList')
    if (res.code === 200) {
        checkInList.value = res.data
        currentMonthDayList.value = getCurrentMonthDayList()
        for (let a = 0; a < currentMonthDayList.value.days.length; a++) {
            currentMonthDayList.value.days[a].Info = isCheckedInToday(currentMonthDayList.value.days[a].date)
        }

        isTodayCheckedIn.value = isCheckedInToday(getCurrentDate())
    }
}


/* 签到 /api/checkIn */
const loading = ref(false)
const checkIn = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/checkIn')
    if (res.code === 200) {
        getCheckInList()
    } else {
        Message.error(res.msg)
    }
    loading.value = false
}

/* 获取今日和明日奖励 /api/getCheckInReward */
const checkInReward = ref({})
const getCheckInReward = async () => {

    const res = await useApiFetch().post('/api/getCheckInReward')
    if (res.code === 200) {
        checkInReward.value = res.data
    }
}

onMounted(() => {
    getCheckInList()
    getCheckInReward()
})

</script>

<style lang="scss" scoped>
.vip-page {
}

.Page {
    background-color: #fff;
    width: calc(100% - 50px);
    border-radius: 8px;
    overflow: hidden;
    margin: 0px auto;
    padding: 25px;
    border-radius: 20px;

    .Pagecontent {
        .title {
            font-size: 17px;
            font-weight: 600;
            color: #333;
            text-align: center;
        }

        .TimeBox {
            display: grid;
            /* 长度自适应 */
            grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
            gap: 10px;
            margin-top: 30px;
            margin-bottom: 30px;

            .TimeBoxTitle {
                background-color: #f6f6f6;
                padding: 10px;
                border-radius: 10px;
                text-align: center;

                .signstatus {
                    margin-top: 10px;
                    font-size: 10px;
                    color: #666;

                    .signtrue {
                        color: #ff3c00;
                        white-space: nowrap;
                    }
                }
            }

            .active {
                background-color: #ff4336;
                color: #fff;

                .signstatus {
                    .signtrue {
                        color: #fff;

                    }
                }
            }
        }

        .signbutton {
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: center;
            border-radius: 20px;
            height: 40px;
            background-color: #ff3c00;
        }
    }
}

.signsta {
    font-size: 11px;
    color: #666;
}

.continuousDays {
    margin-top: 10px;
    font-size: 12px;
    color: #666;
    text-align: center;
    background-color: #fff2ee;
    display: block;
    padding: 6px 10px;
    border-radius: 10px;
    color: #ff3c00;
}
</style>
