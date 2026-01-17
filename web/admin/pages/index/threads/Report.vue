<!-- GetReportAdmin -->
 <!-- GetCommentsAdmin -->
 <template>
    <div>
        <div class="Page">
            <a-page-header title="举报列表" :show-back="false">
                <template #subtitle>
                    <a-space>
                        <a-input v-model="GetFrom.search" placeholder="模糊搜索" allow-clear />
                        <a-button type="primary" @click="GetUserList()">检索</a-button>
                    </a-space>
                </template>

            </a-page-header>
            <div class="Pagecontent">
                <a-table :columns="columns" :data="UserList" :pagination="false" :loading="loading" :scroll="{
                    y: 'calc(100vh - 190px)',
                    x: '100%'
                }">
                    <template #n_html="{ record }">
                        <div class="comment-content" v-html="record.n_html" />
                    </template>
                    <template #thread_name="{ record }">
                        <div class="thread-info">
                            <div class="thread-name">{{ record.thread?.n_name }}</div>
                            <div class="thread-meta">
                                <span>阅读: {{ record.thread?.n_read }}</span>
                                <span>回复: {{ record.thread?.n_msgs }}</span>
                                <span>点赞: {{ record.thread?.n_starts }}</span>
                            </div>
                        </div>
                    </template>
                    <template #n_permission="{ record }">
                        <a-tag color="arcoblue" v-if="record.thread?.n_permission === '1'">免费</a-tag>
                        <a-tag color="arcoblue" v-if="record.thread?.n_permission === '2'">积分</a-tag>
                        <a-tag color="orange" v-if="record.thread?.n_permission === '3'">余额</a-tag>
                        <a-tag v-if="!record.thread?.n_permission">-</a-tag>
                    </template>
                    <template #n_price="{ record }">
                        {{ record.thread?.n_price ? `¥${record.thread.n_price}` : '-' }}
                    </template>
                    <template #console="{ record }">
                        <a-space>
                            <a-popconfirm content="确认要删除此回复？删除后将无法恢复" type="error" @ok="() => { delUser(record.id) }"
                                position="bottom">
                                <a-button size="mini" type="primary" status="danger">删除</a-button>
                            </a-popconfirm>
                        </a-space>
                    </template>
                    <template #footer>
                        <a-pagination @change="GetUserList" @page-size-change="GetUserList"
                            v-model:current="GetFrom.page" v-model:pageSize="GetFrom.pagesize" :total="GetFrom.total"
                            size="mini" show-total show-page-size :page-size-options="[50, 100, 200, 500, 1000]" />
                    </template>
                </a-table>
            </div>
        </div>


    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
/* 获取工具列表信息 */
const UserList = ref([])
const GetFrom = ref({
    page: 1,
    pagesize: 20,
})



/* 会员配置 */
const loading = ref(false)
const GetUserList = async () => {
    loading.value = true
    const res = await useApiFetch().post('/api/GetReportAdmin', GetFrom.value)
    if (res.code === 200) {
        UserList.value = res.data
        GetFrom.value.total = res.total
    } else {
        Message.error(res.msg)
    }
    loading.value = false
}
const columns = [

    {
        title: '举报内容',
        slotName: 'n_html',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '所属帖子',
        slotName: 'thread_name',
        ellipsis: true,
        tooltip: true,
    },
    {
        title: '帖子类型',
        slotName: 'n_permission',
        width: 100,
    },
    {
        title: '帖子价格',
        slotName: 'n_price',
        width: 100,
    },
    {
        title: '举报时间',
        dataIndex: 'n_time',
        width: 180,
    },
    {
        title: '操作',
        dataIndex: 'console',
        slotName: 'console',
        width: 150,
        fixed: 'right',
    },
];



/* 删除工具 */
const delUser = async (id) => {
    const res = await useApiFetch().post('/api/DelCommentsAdmin', {
        id
    })
    if (res.code === 200) {
        Message.success('删除成功')
        GetUserList()
    } else {
        Message.error(res.msg)
    }
}




onMounted(() => {
    GetUserList()
})
</script>

<style lang="scss" scoped>
.Page {
    background-color: #fff;
    margin: 1px;
    width: calc(100% - 2px);

    .Pagecontent {
        width: calc(100% - 20px);
        padding: 10px;
    }

}

.comment-content {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.5;
}

.thread-info {
    .thread-name {
        font-weight: 500;
        margin-bottom: 4px;
    }

    .thread-meta {
        font-size: 12px;
        color: #86909c;

        span {
            margin-right: 8px;
        }
    }
}
</style>
