<template>
    <div class="HeaderBox" @click.stop="">

        <div :class="{ downBoxTos: true, downBoxTosavtive: props.modelValue }" @click.stop="close()">
            <div class="Neibox" @click.stop="">
                <div class="AppBtnList">
                    <p class="AppBtnListTitle">
                        {{ props.Title }}
                    </p>
                    <!-- 插槽 -->
                    <slot name="content"></slot>

                    
                <!-- PC关闭按钮 -->
                <div class="closeBtn" @click="close()">
                    <icon-close class="icon" />
                </div>
                </div>
                <!-- 取消函数 -->
                <div class="BtnList">
                    <div class="cancel" @click="close()">
                        {{ props.BackText }}
                    </div>
                    <div class="success" v-if="!props.Nook" @click="ok()">
                        {{ props.SuccessText }}
                    </div>
                </div>

            </div>

        </div>

    </div>

</template>

<script setup>
// import { Title } from '#components'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    BackText: {
        type: String,
        default: '取消',
    },
    SuccessText: {
        type: String,
        default: '确定',
    },
    Nook: {
        type: Boolean,
        default: false,
    },
    Title: {
        type: String,
        default: '提示',
    },


})

const emit = defineEmits(['update:modelValue', 'close', 'ok'])

/* 关闭 */
const close = () => {
    emit('update:modelValue', false)
    emit('close')
}
/* 确定 */
const ok = () => {
    emit('update:modelValue', false)
    emit('ok')
}
</script>

<style lang="scss" scoped>
/* 视口小于768px时 */
@media screen and (max-width: 768px) {
    .downBoxTos {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 100vh;
        background-color: #55525225;
        z-index: -12;
        overflow: hidden;
        width: 100%;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: all 0.3s ease-in-out;
        .Neibox {
            position: absolute;
            bottom: -100%;
            left: 0;
            width: 100%;
            padding-bottom: 50px;



            .AppBtnList {
                width: calc(100% - 80px);
                border-radius: 28px;
                background-color: #fff;
                padding: 10px 20px;
                margin: 10px auto;
                background-color: #fff;
                border: 1px solid #fff;

                .AppBtnListTitle {
                    font-size: 14px;
                    font-weight: 500;
                    color: #212225;
                    text-align: center;
                    margin-bottom: 20px;
                    margin-top: 10px;
                }
            }

            .BtnList {
                margin: 10px auto;
                width: calc(100% - 40px);
                border-radius: 28px;
                overflow: hidden;
                display: flex;
                border: 1px solid #fff;
                margin-top: 20px;

                .cancel {
                    background-color: #ffffffc4;
                    padding: 5px 20px;
                    line-height: 35px;
                    text-align: center;
                    color: #212225;
                    cursor: pointer;
                    font-size: 14px;
                    width: 100%;
                }

                .success {
                    background-color: #1164ffcb;
                    padding: 5px 20px;
                    line-height: 35px;
                    text-align: center;
                    color: #ffffff;
                    width: 100%;
                    cursor: pointer;
                    font-size: 14px;
                }
            }
        }

    }

    .closeBtn {
        display: none;
    }

}

/* 视口大于768px时 */
@media screen and (min-width: 768px) {
    .downBoxTos {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        background-color: #00000017;
        z-index: -12;
        overflow: hidden;
        width: 100%;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: all 0.3s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;

        .Neibox {
            width: 100%;
            max-width: 450px;
            overflow: hidden;


            .AppBtnList {
                width: calc(100% - 80px);
                border-radius: 17px;
                background-color: #fff;
                padding: 10px 20px;
                margin: 10px auto;
                background-color: #fff;
                box-shadow: 0 4px 8px rgba(136, 136, 136, 0.1);
                cursor: pointer;
                position: relative;

                .AppBtnListTitle {
                    font-size: 14px;
                    font-weight: 500;
                    color: #212225;
                    text-align: center;
                    margin-bottom: 20px;
                    margin-top: 10px;
                }

                .closeBtn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    background-color: #fff;
                    cursor: pointer;
                    border: 1px solid #f5f5f5;
                    box-shadow: inset 10 10 10 11px #afafaf;

                    &:hover {
                        background-color: #ffd8d8;
                        color: #ff5f5f;
                    }
                }

            }

            .BtnList {
                margin: 10px auto;
                width: calc(100% - 40px);
                border-radius: 28px;
                overflow: hidden;
                display: flex;
                margin-top: 20px;
                cursor: pointer;

                .cancel {
                    background-color: #ffffffc4;
                    padding: 5px 20px;
                    line-height: 35px;
                    text-align: center;
                    color: #212225;
                    cursor: pointer;
                    font-size: 14px;
                    width: 100%;
                    display: none;
                }

                .success {
                    background-color: #1164ffcb;
                    padding: 5px 20px;
                    line-height: 35px;
                    text-align: center;
                    color: #ffffff;
                    width: 100%;
                    cursor: pointer;
                    font-size: 14px;
                }
            }
        }

    }

}

/* 视口小于768px时 */
@media screen and (max-width: 768px) {
    .downBoxTosavtive {
        opacity: 1;
        z-index: 99;


        .Neibox {
            bottom: 0;
        }
    }
}

/* 视口大于768px时 */
@media screen and (min-width: 768px) {
    .downBoxTosavtive {
        opacity: 1;
        z-index: 99;

        .Neibox {
            bottom: 50%;
        }
    }
}
</style>
