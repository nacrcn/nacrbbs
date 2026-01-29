<template>

    <div>
        <div class="Tabbar">
            <div :class="['TabbarItem', { active: ShowIndex == '/' }]" @click="ChangePage('/')">
                <icon-home class="icon" />
                <p>瓜子</p>
            </div>
            <div :class="['TabbarItem', { active: ShowIndex == '/class' }]" @click="ChangePage('/class')">
                <icon-relation class="icon" />
                <p>圈子</p>
            </div>
            <div :class="['TabbarItem', { active: ShowIndex == '/user' }]" @click="ChangePage('/user')">
                <icon-user class="icon" />
                <p>我的</p>
            </div>
        </div>
        <div class="He">

        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
})

const ShowIndex = ref('/')
const ChangePage = (index) => {
    ShowIndex.value = index
    navigateTo(index)
}
</script>

<style lang="scss" scoped>
.Tabbar {
    display: none;
}

/* 视口小于768px时显示 */
@media (max-width: 768px) {
    .Tabbar {
        display: block;
        position: fixed;
        bottom: 10px;
        left: 10px;
        width: calc(100% - 40px);
        height: 35px;
        background-color: #ffffffc0;
        border-radius: 30px;
        padding: 10px;
        display: flex;
        z-index: 999;
        backdrop-filter: blur(10px);
        box-shadow: inset 0 0 10px rgba(8, 255, 140, 0.068);

        .TabbarItem {
            text-align: center;
            width: 100%;
            color: #494949;

            .icon {
                width: 20px;
                height: 20px;
            }

            p {
                font-size: 12px;
            }
        }

        .active {
            color: #00a36d;
        }
    }

    .He {
        height: 100px;
    }
}
</style>