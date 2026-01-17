<template>
    <div class="TopUpPage">
        <UserHeader title="我的API秘钥"></UserHeader>
        <div class="Page">
            <a-alert type="warning" class="AlertBox">请不要将秘钥泄露给他人，这将可能对您造成损失！</a-alert>
            <div class="KeyBox">
                <div class="KeyItem" v-for="value in keys" :key="value.id" @click="showInfo = true, form = value">
                    <div class="KeyInfo">
                        <div class="Title">{{ value.n_name || '未命名' }}</div>
                        <div class="Key">{{ replaceKey(value.n_key) }}</div>
                        <div class="Time">{{ value.n_time }}</div>
                    </div>
                    <div @click.stop class="KeyAction">
                        <a-space>
                            <a-button size="mini" type="text" @click="show = true, form = value, type = 2">编辑</a-button>
                            <a-popconfirm content="确定删除此API密钥吗？删除后秘钥将立马失效！" type="warning" @ok="deleteKey(form.id)">
                                <a-button size="mini" type="text" status="danger"
                                    >删除</a-button>
                            </a-popconfirm>
                        </a-space>
                    </div>
                </div>
                <div class="KeyItem" @click="show = true, form = {}, type = 1">
                    <div class="NewKey">
                        <div class="NewKeyBox">
                            <icon-plus />
                            <p>创建新秘钥</p>
                        </div>
                    </div>
                </div>
            </div>
            <a-pagination @change="getKeys" @page-size-change="getKeys" v-model:current="GetFrom.page"
                v-model:pageSize="GetFrom.pagesize" :total="GetFrom.total" size="mini" show-total show-page-size
                :page-size-options="[50, 100, 200, 500, 1000]" />
        </div>

        <popupMob v-model:modelValue="show" :Title="type === 1 ? '创建新秘钥' : '修改秘钥'" Nook>
            <template #content>
                <a-form :model="form" layout="vertical">
                    <a-form-item field="name" label="名称">
                        <a-input v-model="form.n_name" />
                    </a-form-item>
                    <a-form-item field="ip_whitelist" label="IP白名单">
                        <a-textarea v-model="form.n_white" placeholder="请输入IP白名单，多个IP用逗号分隔" allow-clear />
                    </a-form-item>
                    <a-form-item field="ip_blacklist" label="IP黑名单">
                        <a-textarea v-model="form.n_black" placeholder="请输入IP黑名单，多个IP用逗号分隔" allow-clear />
                    </a-form-item>
                    <a-form-item field="name" label="仅白名单访问">
                        <a-radio-group v-model="form.n_ipstatus">
                            <a-radio value="0">否</a-radio>
                            <a-radio value="1">是</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item>
                        <a-button class="btn-primary" type="primary" @click="clickNewKey()">提交</a-button>
                    </a-form-item>
                </a-form>
            </template>
        </popupMob>

        <popupMob v-model:modelValue="showInfo" Title="秘钥详情" Nook>
            <template #content>
                <div class="KeyInfo">
                    <div class="Title">{{ form.n_name || '未命名' }}</div>
                    <div class="Key">{{ form.n_key }}</div>
                    <div class="Time">{{ form.n_time }}</div>
                </div>

            </template>
        </popupMob>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';

// 获取用户信息
const UserInfo = useUserInfo()
UserInfo.init()

/* 获取秘钥列表 getApiKeys */
const keys = ref([])
const GetFrom = ref({
    page: 1,
    pagesize: 20,
    total:0
})
async function getKeys() {
    const res = await useApiFetch().post('/api/getApiKeys', GetFrom.value)
    if (res.code === 200) {
        keys.value = res.data
        GetFrom.value.total = res.total
    } else {
        Message.error(res.message)
    }
}
getKeys()

/* 秘钥中间替换为 * 函数 */
const replaceKey = (key) => {
    if (key.length <= 5) return key
    const start = key.substring(0, 3)
    const end = key.substring(key.length - 3)
    const middle = '*'.repeat(key.length - 6)
    return start + middle + end
}


const show = ref(false)
const showInfo = ref(false)
const type = ref(1)
const form = ref({})

const clickNewKey = async () => {
    let res;
    if (type.value == 1) {
        res = await useApiFetch().post('/api/addApiKey', form.value)
    } else {
        res = await useApiFetch().post('/api/editApiKey', form.value)
    }
    if (res.code === 200) {
        Message.success(res.message)
        show.value = false
        getKeys()
    } else {
        Message.error(res.message)
    }
}

/* 删除秘钥 */
const deleteKey = async (id) => {
    const res = await useApiFetch().post('/api/delApiKey', { id })
    if (res.code === 200) {
        Message.success(res.message)
        getKeys()
    } else {
        Message.error(res.message)
    }
}

</script>

<style lang="scss" scoped>
.TopUpPage {
    overflow: hidden;
    overflow-y: auto;
}

.Page {
    background-color: #fff;
    width: calc(100% - 40px);
    border-radius: 20px;
    overflow: hidden;
    margin: 0px auto;
    padding: 20px;

    .AlertBox {
        border-radius: 20px;
        margin-bottom: 10px;
    }

    .KeyBox {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
        width: 100%;
        margin-bottom: 20px;

        .KeyItem {
            width: calc(100% - 40px);
            padding: 20px;
            border-radius: 20px;
            border: 1px solid #f5f5f5;
            transition: all 0.3s ease-in-out;
            position: relative;

            &:hover {
                border-color: #e0e0e0;
                border: 1px solid #1c8b00;
            }

            .NewKey {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                width: 100%;
                height: 100%;
                justify-content: center;
                /* 自动换行 */
                white-space: wrap;

                .NewKeyBox {
                    text-align: center;

                    p {
                        font-size: 12px;
                        color: #666;
                    }
                }

            }



            .KeyAction {
                margin-top: 10px;
            }
        }
    }

    .KeyInfo {
        .Title {
            font-size: 14px;
            font-weight: 800;
        }

        .Key {
            font-size: 15px;
            color: #666;
            margin: 10px auto;
            text-align: center;
            background-color: #f7f7f7;
            border-radius: 10px;
            padding: 10px 0px;
        }

        .Time {
            font-size: 12px;
            color: #666;
        }
    }

}

.btn-primary {
    width: 100%;
    border-radius: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .Page {
        max-width: none;
        width: calc(100%);

        .PageHeader {
            padding: 20px;

            h2 {
                font-size: 20px;
            }

            .current-balance {
                font-size: 14px;

                .amount {
                    font-size: 18px;
                }
            }
        }

        .Pagecontent {

            padding: 20px;

            .amount-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;

                .amount-item {
                    padding: 15px 10px;

                    .amount-value {
                        font-size: 20px;
                    }
                }
            }

            .payment-item {
                padding: 15px;

                .payment-icon {
                    margin-right: 12px;
                    font-size: 20px;
                }
            }
        }
    }
}
</style>
