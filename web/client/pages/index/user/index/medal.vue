<template>
    <div>
        <div>
            <UserHeader title="勋章中心"></UserHeader>
        </div>
        <div class="Page">
            <div v-if="MedalList.length > 0" class="medal-grid">
                <div v-for="item in MedalList" :key="item.id" class="medal-item" :class="{ earned: item.isEarned }">
                    <div class="medal-img-wrapper">
                        <img :src="item.n_src" :alt="item.n_name" class="medal-img" :class="{ 'dimmed': !item.isEarned }" />
                    </div>
                    <div class="medal-info">
                        <h3 class="medal-name">{{ item.n_name }}</h3>
                        <p class="medal-desc">{{ item.n_nots }}</p>
                        <div class="medal-status">
                            <span :class="item.isEarned ? 'status-earned' : 'status-unearned'">
                                {{ item.isEarned ? '已获得' : '未获得' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="empty-state">
                <div class="empty-icon">🏅</div>
                <p>暂无勋章数据</p>
            </div>

            <a-pagination @change="getMedalList" @page-size-change="getMedalList" v-model:current="GetFrom.page"
                v-model:pageSize="GetFrom.pagesize" :total="GetFrom.total" size="mini" show-total show-page-size
                :page-size-options="[50, 100, 200, 500, 1000]" class="pagination" />
        </div>

    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';

/* 列表 getMedalList */
const MedalList = ref([])
const GetFrom = ref({
    page: 1,
    pagesize: 50,
    total: 0
})
const getMedalList = async () => {
    const res = await useApiFetch().post('/api/getMedalList', GetFrom.value)
    if (res.code === 200) {
        MedalList.value = res.data || []
        GetFrom.value.total = res.total || 0
    } else {
        Message.error(res.message || '获取勋章列表失败')
    }
}

getMedalList()

</script>
<style lang="scss" scoped>

/* 视口小于768px */
@media (min-width: 768px) {
    .Page {
    width: calc(100% - 40px);
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    min-height: 400px;

    .medal-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    }

    .medal-item {
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        border-radius: 16px;
        padding: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;
        border: 2px solid transparent;

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        &.earned {
            border-color: #ff9800;
            background: linear-gradient(135deg, #fff8e1 0%, #ffffff 100%);
        }
    }

    .medal-img-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 16px;
    }

    .medal-img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        transition: all 0.3s ease;

        &.dimmed {
            filter: grayscale(100%);
            opacity: 0.6;
        }
    }

    .lock-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 32px;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .medal-info {
        text-align: center;
    }

    .medal-name {
        font-size: 16px;
        font-weight: 600;
        color: #1d1d1f;
        margin: 0 0 8px 0;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .medal-desc {
        font-size: 13px;
        color: #86868b;
        margin: 0 0 12px 0;
    }

    .medal-status {
        margin-top: 8px;
    }

    .status-earned,
    .status-unearned {
        display: inline-block;
        padding: 4px 16px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }

    .status-earned {
        background-color: #e3f2fd;
        color: #1976d2;
    }

    .status-unearned {
        background-color: #f5f5f5;
        color: #9e9e9e;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 20px;
        color: #86868b;

        .empty-icon {
            font-size: 64px;
            margin-bottom: 16px;
        }

        p {
            font-size: 16px;
            margin: 0;
        }
    }

    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
}
}
@media (max-width: 768px) {
   .Page {
    width: calc(100% - 40px);
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;

    .medal-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 10px;
    }

    .medal-item {
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        border-radius: 16px;
        padding: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;
        border: 2px solid transparent;

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        &.earned {
            border-color: #ff9800;
            background: linear-gradient(135deg, #fff8e1 0%, #ffffff 100%);
        }
    }

    .medal-img-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 16px;
    }

    .medal-img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        transition: all 0.3s ease;

        &.dimmed {
            filter: grayscale(100%);
            opacity: 0.6;
        }
    }

    .lock-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 32px;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .medal-info {
        text-align: center;
    }

    .medal-name {
        font-size: 14px;
        font-weight: 600;
        color: #1d1d1f;
        margin: 0 0 8px 0;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .medal-desc {
        font-size: 11px;
        color: #86868b;
        margin: 0 0 12px 0;
    }

    .medal-status {
        margin-top: 8px;
    }

    .status-earned,
    .status-unearned {
        display: inline-block;
        padding: 4px 16px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }

    .status-earned {
        background-color: #e3f2fd;
        color: #1976d2;
    }

    .status-unearned {
        background-color: #f5f5f5;
        color: #9e9e9e;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 20px;
        color: #86868b;

        .empty-icon {
            font-size: 64px;
            margin-bottom: 16px;
        }

        p {
            font-size: 16px;
            margin: 0;
        }
    }

    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
}

}
</style>