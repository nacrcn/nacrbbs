<template>
    <div>
        <div>
            <UserHeader title="我的动态"></UserHeader>
        </div>
        <div class="PageTop">
            <div class="Pagecontent">
                <div class="useravatar">
                    <img :src="UserInfo.$state.UserInfo.n_avatar" />
                </div>
                <div class="userinfo">
                    <p class="userinfoname">{{ UserInfo.$state.UserInfo.n_nickname }}</p>
                    <p class="usersignature">{{ UserInfo.$state.UserInfo.n_signature }}</p>
                </div>
            </div>
            <NavBox :Item="[
                {
                    value: '1',
                    name: `帖子（${TBBSInfo.posts}）`
                },
                {
                    value: '2',
                    name: `回复（${TBBSInfo.n_comment}）`
                },
                {
                    value: '3',
                    name: `粉丝（${TBBSInfo.followers}）`
                },
                {
                    value: '4',
                    name: `关注（${TBBSInfo.following}）`
                },
            ]" v-model:modelValue="ShowIndex" style="margin-top: 20px;"></NavBox>
            <!-- 底部区域 n_balance -->

        </div>
        <div class="Page">
            <!-- 我的帖子 -->
            <div v-if="ShowIndex === '1'">
                <FlexBox :data="ThreadsList" :columns="2" :gap="10" :loading="ThreadsLoading">
                    <template #item="{ item }">
                        <ItemA :data="item"></ItemA>
                    </template>
                </FlexBox>
                <div class="PageNav">
                    <a-pagination @change="GetThreads" @page-size-change="GetThreads" v-model:current="from.page"
                        v-model:pageSize="from.pagesize" :total="from.total" size="mini" show-total />
                </div>
            </div>
            <!-- 我的评论 -->
            <div v-if="ShowIndex === '2'">
                <FlexBox :data="CommentList" :columns="2" :gap="10" :loading="CommentLoading">
                    <template #item="{ item }">
                        <CommentItem :data="item" @reload="GetCommentList">
                        </CommentItem>
                    </template>
                </FlexBox>
                <div class="PageNav">
                    <a-pagination @change="GetCommentList" @page-size-change="GetCommentList"
                        v-model:current="GetCommentsFrom.page" v-model:pageSize="GetCommentsFrom.pagesize"
                        :total="GetCommentsFrom.total" size="mini" show-total />
                </div>
            </div>
            <!-- 我的粉丝 -->
            <div v-if="ShowIndex === '3'">
                <FlexBox :data="FollowerList" :columns="3" :gap="10" :loading="FollowerLoading">
                    <template #item="{ item }">
                        <UserBox :info="item" @reload="GetFollowingList">
                        </UserBox>
                    </template>
                </FlexBox>
                <div class="PageNav">
                    <a-pagination @change="GetFollowingList" @page-size-change="GetFollowingList"
                        v-model:current="FollowFrom.page" v-model:pageSize="FollowFrom.pagesize"
                        :total="FollowFrom.total" size="mini" show-total />
                </div>
            </div>
            <!-- 我的关注 -->
            <div v-if="ShowIndex === '4'">
                <FlexBox :data="FollowingList" :columns="3" :gap="10" :loading="FollowingLoading">
                    <template #item="{ item }">
                        <UserBox :info="item" @reload="GetFollowerList">
                        </UserBox>
                    </template>
                </FlexBox>
                <div class="PageNav">
                    <a-pagination @change="GetFollowerList" @page-size-change="GetFollowerList"
                        v-model:current="FollowingFrom.page" v-model:pageSize="FollowingFrom.pagesize"
                        :total="FollowingFrom.total" size="mini" show-total />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const UserInfo = useUserInfo()

/* 论坛详情 */
const TBBSInfo = ref({})

const getinfo = async () => {
    const res = await useApiFetch().post('/api/GetUser', {
        id: 'me'
    })
    if (res.code === 200) {
        TBBSInfo.value = res.data
    }
}

const ThreadsLoading = ref(false)
const CommentLoading = ref(false)
const FollowerLoading = ref(false)
const FollowingLoading = ref(false)


/* 获取文章列表 GetThreads */
const ThreadsList = ref([])
const from = ref({
    page: 1,
    pagesize: 10,
    total: 0,
    ismy: 1
})
const GetThreads = async () => {
    try {
        ThreadsLoading.value = true
        const res = await useApiFetch().post('/api/GetThreads', from.value)
        if (res.code == 200) {
            ThreadsList.value = res.data
            from.value.total = res.total
        } else {
        }
        ThreadsLoading.value = false;
    } catch (error) {
        Message.error(error.message)
    }
}

/* 获取评论列表 */
const GetCommentsFrom = ref({
    page: 1,
    pagesize: 20,
    ismy: 1,
    total: 0
})
const CommentList = ref([])
const GetCommentList = async () => {
    try {
        CommentLoading.value = true
        const res = await useApiFetch().post('/api/GetComments', GetCommentsFrom.value)
        if (res.code == 200) {
            CommentList.value = res.data
            GetCommentsFrom.value.total = res.total
        } else {
        }
        CommentLoading.value = false
    } catch (error) {
        Message.error(error.message)
    }
}

/* 获取粉丝列表 */
const FollowFrom = ref({
    page: 1,
    pagesize: 9,
    total: 0,
    followers: 1,
    uid: 'me'
})
const FollowerList = ref([])
const GetFollowerList = async () => {
    try {
        FollowerLoading.value = true
        const res = await useApiFetch().post('/api/GetUser', FollowFrom.value)
        if (res.code == 200) {
            FollowerList.value = res.data
            FollowFrom.value.total = res.total
        } else {
        }
        FollowerLoading.value = false
    } catch (error) {
        Message.error(error.message)
    }
}

/* 获取关注列表 */
const FollowingFrom = ref({
    page: 1,
    pagesize: 9,
    total: 0,
    following: 1,
    uid: 'me'
})
const FollowingList = ref([])
const GetFollowingList = async () => {
    try {
        FollowingLoading.value = true
        const res = await useApiFetch().post('/api/GetUser', FollowingFrom.value)
        if (res.code == 200) {
            FollowingList.value = res.data
            FollowingFrom.value.total = res.total
        } else {

        }
        FollowingLoading.value = false
    } catch (error) {
        Message.error(error.message)
    }
}
onMounted(() => {
    GetCommentList()
    GetThreads()
    getinfo()
    GetFollowingList()
    GetFollowerList()
})


/* 查看页面 */
const ShowIndex = ref('1')
</script>

<style lang="scss" scoped>
.PageTop {
    width: calc(100% - 40px);
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    margin-bottom: 10px;

    .Pagecontent {
        width: calc(100%);
        background-color: #fff;
        display: flex;
        position: relative;
        margin: 5px auto;

        .useravatar {
            width: 80px;
            height: 80px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px solid #ccc;
            }
        }

        .userinfo {
            margin-left: 30px;
            margin-top: 10px;

            .userinfoname {
                font-size: 24px;
                font-weight: 800;
                color: #000;
            }

            .usersignature {
                font-size: 14px;
                color: #666;
                margin-top: 10px;
                line-height: 20px;
                max-width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .right-buttons {
            position: absolute;
            right: 0px;
            top: 0px;
            border-radius: 20px;
            overflow: hidden;
        }
    }





    @media (max-width: 780px) {

        /* 视口小于 780px 时*/
        .Content {
            // flex-direction: column;
            flex-wrap: wrap;

            .VipBox {
                width: calc(100% - 40px);
            }

            .BanBox {
                margin-left: 0px;
                margin-top: 5px;
                width: calc(50% - 42.5px);

                &:last-child {
                    margin-left: 5px;
                }

                .BanBoxButtons {

                    display: none;
                }
            }
        }

        .Infobox,
        .ActiveBox {
            grid-template-columns: 1fr !important;

        }
    }

}

.Page {
    .content-box {
        width: calc(100%);
        margin-top: 10px;
        column-count: 2;
        column-gap: 10px;

        :deep(.Itemlist) {
            margin-bottom: 10px;
            break-inside: avoid;
        }
    }

    .PageNav {
        width: calc(100% - 20px);
        margin-top: 10px;
        display: flex;
        padding: 10px;
        border-radius: 10px;
        background-color: #fff;
        justify-content: center;
    }

}
</style>
