<template>
    <div class="">

        <div :class="['NavLisbox', { authWidth: authWidth }]">
            <div v-for="value in Item" :class="['Item', { active: modelValue === value.value }]"
                @click="ChangeNav(value.value)">
                <span>{{ value.name }}</span>
            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const emit = defineEmits(['change'])
const active = ref(1)
const box = ref(null)
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    Item: {
        type: Array,
        default: []
    },
    authWidth: {
        type: Boolean,
        default: false
    }
})

/* 切换导航 */
const ChangeNav = (value) => {
    active.value = value
    /* em */
    emit('update:modelValue', value)
    emit('change', value)


}
</script>

<style lang="scss" scoped>
.NavLisbox {
    background-color: #fff;
    border-radius: 10px;
    white-space: nowrap;
    overflow-x: auto;

    .Item {
        display: inline-block;
        line-height: 20px;
        padding: 10px 0;
        cursor: pointer;
        color: #888888;
        margin-right: 20px;

        .icon {
            width: 17px;
            height: 17px;
            margin-right: 10px;
            display: inline-block;
            margin-top: 6.5px;
        }

    }

    .active {
        color: rgb(0, 209, 129);
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 15px;
            bottom: 1px;
            width: calc(100% - 30px);
            height: 5px;

            background-color: rgb(0, 209, 129);
        }

        p {
            color: rgb(0, 209, 129);
        }
    }
}

.authWidth {
    display: flex!important;
    justify-content: center;
    
    .Item {
        width: 100%!important;
        display: block!important;
        text-align: center;
        margin-right: 0px!important;
    }

}
</style>