<template>
    <div class="UPDATE" :style="{ width: width + 'px', height: height + 'px' }">
        <input type="file" name="" id="" @change="customRequest">
        <a-progress v-if="percent.show" :percent="percent.num" type="circle" size="small" :style="{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            zIndex: 9999
        }" />
        <div class="zhez" v-if="percent.show"></div>
        <div class="zhezs" v-if="!percent.show">
            <template v-if="successText">
                <div class="upload-success">{{ successText }}</div>
            </template>
            <template v-else>
                <icon-upload class="icon" :size="30" style="color: #ffffff;" />
            </template>
        </div>
    </div>
</template>

<script setup>
import { upfile } from '~/Tools/update.js';
const props = defineProps(["src", "width", "height"])
const emit = defineEmits(['success', 'error', 'change'])
const percent = ref({
    show: false,
    num: 0
})
const successText = ref('');
const customRequest = async (option) => {

    const fileItem = option.target.files[0];
    if (!fileItem) return;
    emit('change', fileItem)

    percent.value.show = true
    const res = await upfile(fileItem, (e) => {
        percent.value.num = e / 100
    });
    percent.value.show = false
    percent.value.num = 0

    if (res.code === 200) {
        successText.value = `上传成功：${fileItem.name}`
        emit('success', res.data.url, res.msg)
    } else {
        emit('error', res.msg)
    }

};

</script>

<style scoped lang="scss">
.UPDATE {
    background-color: #e2e2e2;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 1px solid #e2e2e2;
    box-sizing: border-box;

    .images {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        z-index: 222;
    }

    .zhez {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff2c;
        z-index: 22;
    }

    .zhezs {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #0000002c;
        opacity: 1;
        transition: all 0.3s;
        cursor: pointer;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {}
    }

    &:hover .zhezs {
        opacity: 1;
    }
}

.upload-success {
    color: white;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
}
</style>