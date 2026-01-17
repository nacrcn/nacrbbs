<template>
    <div class="">

        <div class="UserInfo" @click="navigateTo('/upinfo/' + Users.id)">
            <div :style="{ backgroundImage: `url(${Users?.n_userback})` }" class="UserBack">

            </div>
            <img :src="Users.n_avatar" alt="用户头像" />
            <p class="nickname">{{ Users?.n_nickname }}</p>

            <div class="UserDetail">
                <div class="Item">
                    <p class="Value">{{ Users?.posts || 0 }}</p>
                    <p class="Label">发帖数</p>
                </div>
                <div class="Item">
                    <p class="Value">{{ Users?.followers || 0 }}</p>
                    <p class="Label">粉丝数</p>
                </div>
                <div class="Item">
                    <p class="Value">{{ Users?.following || 0 }}</p>
                    <p class="Label">关注数</p>
                </div>
            </div>

            <!-- 关注按钮 -->
            <div class="Follow" v-if="UserInfo.$state.UserInfo?.id !== Users.id">
                <a-button :loading="loading" @click.stop="LikeUser()" :class="['FollowBtn', { 'Close': Users.isLiked }]"
                    type="primary">
                    {{ Users.isLiked ? '取消关注' : '关注' }}
                </a-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Message } from '@arco-design/web-vue';
const UserInfo = useUserInfo()

const route = useRoute()

const props = defineProps(['id', 'info'])
let id = props.id
const Users = ref({})
/* 获取用户信息 GetUser */
const GetUser = async () => {
    try {
        const res = await useApiFetch().post('/api/GetUser', {
            id: id
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


onMounted(() => {
    if (props.info) {
        Users.value = props.info
        id = props.info.id
    } else {
        GetUser()
    }
})

const loading = ref(false)

/* 关注用户 LikeUser */
const LikeUser = async () => {
    try {
        loading.value = true
        const res = await useApiFetch().post('/api/LikeUser', {
            id: Users.value.id
        })
        loading.value = false
        if (res.code == 200) {
            Message.success(res.msg)
            Users.value.isLiked = true
            GetUser()
        } else {
            Message.error(res.msg || '关注失败')
        }
    } catch (error) {
        Message.error(error.message)
    }
}   
</script>


<style lang="scss" scoped>
.UserInfo {
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    width: 100%;

    .UserBack {
        width: 100%;
        height: 150px;
        background-size: cover;
        background-position: center;
    }

    img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: -35px;
        border: 2px solid #fff;
        display: block;
    }

    .nickname {
        text-align: center;
        font-size: 15px;
        color: #333;
        margin-top: 10px;
    }

    .UserDetail {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        background-color: #f5f9fc;
        border-radius: 10px;
        width: calc(100% - 40px);
        margin: 10px;
        padding: 10px;
        justify-content: center;

        .Item {
            text-align: center;
            width: 100%;

            .Value {
                font-size: 14px;
                color: #333;
            }

            .Label {
                font-size: 12px;
                color: #666;
                margin-top: 7px;
            }
        }
    }

    .Follow {
        width: calc(100% - 20px);
        padding: 10px;

        .FollowBtn {
            width: 100%;
            border-radius: 20px;
        }

        .Close {
            background-color: #999999;
        }
    }
}
</style>