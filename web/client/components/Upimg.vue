<template>
    <div class="UPDATE" :style="{ width: width + 'px', height: height + 'px' }">
        <input type="file" name="" id="" @change="customRequest">
        <img v-if="src && getFileType(src) === 'image'" class="images" :src="src" alt="">
        <video class="AppImagesVideo" v-else :src="src" muted autoplay playsinline loop></video>
        <a-progress v-if="percent.show" :percent="percent.num" type="circle" size="small" :style="{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            zIndex: 9999
        }" />
        <div class="zhez" v-if="percent.show"></div>
        <div class="zhezs" v-if="!percent.show">
            <div class="icon_box">
                <input type="file" name="" id="" @change="customRequest">
                <icon-upload class="icon" :size="20" style="color: #ffffff;" />
            </div>
            <div class="url_box" @click.stop="showchange = true">
                <icon-link class="icon" :size="20" style="color: #ffffff;" />
            </div>

        </div>


        <a-modal v-model:visible="showchange" @ok="addfun" @cancel="() => { showchange = false }" width="300px">
            <template #title>
                手填链接
            </template>
            <div>
                <a-form :model="from" style="max-width: 600px;">
                    <a-form-item field="name" label="直链">
                        <a-input v-model="from.xu_url" placeholder="请输入" />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script setup>
import { upimg } from '~/Tools/update.js';
const props = defineProps(["src", "width", "height"])
const emit = defineEmits(['success', 'error'])
const percent = ref({
    show: false,
    num: 0
})
const customRequest = async (option) => {

    const fileItem = option.target.files[0];
    percent.value.show = true
    const res = await upimg(fileItem, (e) => {
        percent.value.num = e / 100
    });
    percent.value.show = false
    percent.value.num = 0
    if (res.code === 200) {
        emit('success', res.data.url)
    } else {
        emit('error', res.msg)
    }

};
function getFileType(url) {
    console.log(url);
    if (!url) {
        return 'image'
    }

    // 提取后缀（忽略大小写）
    const ext = url.split('.').pop().toLowerCase().split('?')[0].split('#')[0];

    // 常见图片后缀
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff', 'avif'];

    // 常见视频后缀
    const videoExts = ['mp4', 'mkv', 'flv', 'avi', 'mov', 'wmv', 'm4v', '3gp', 'webm'];

    if (imageExts.includes(ext)) {
        return 'image';
    } else if (videoExts.includes(ext)) {
        return 'video';
    } else {
        return 'other'; // 其他类型
    }
}
const showchange = ref(false)
const from = ref({
    xu_url: ""
})
const addfun = () => {
    emit('success', from.value.xu_url)
    showchange.value = false
}


</script>

<style scoped lang="scss">
.UPDATE {
    background-color: #e2e2e2;
    border-radius: 5px;
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

    .AppImagesVideo {
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
        opacity: 0;
        transition: all 0.3s;
        cursor: pointer;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon_box {
            width: 100%;
            cursor: pointer;
            overflow: hidden;
        }

        .url_box {
            width: 100%;
            cursor: pointer;
            z-index: 223;
        }

        .icon {
            display: block;
            margin: 0px auto;
        }
    }

    &:hover .zhezs {
        opacity: 1;
    }
}
</style>