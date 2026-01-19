<template>
	<div>
		<!-- 账户余额 -->
		<UserHeader title="我的积分"></UserHeader>

		<div>
			<div class="AccountTab">
				<div class="Account">
					<div class="Item">
						<div class="title">积分</div>
						<div class="value">{{ UserInfo.$state.UserInfo.n_points }}</div>
					</div>
					<!-- 账单按钮 -->
					 <div class="bill-button" @click="navigateTo('/user/bill?type=2')">
                        查看账单
                    </div>

				</div>
				<!-- 操作栏 -->
				<div class="content">
					<div class="Item" @click="gopage('/pages/pointsToBalance/pointsToBalance')">
						<div class="title">积分转余额</div>
					</div>
				</div>
			</div>
			<!-- 获取积分途径 -->
			<div class="get-points-way">
				<BoxTitle>获取积分途径</BoxTitle>
				<div class="Boxs">
					<div class="InfoItem" v-for="value in ActivityList">
						<img class="InfoItemIcon" :src="value.n_icon" alt="">
						<div class="InfoItemContent">
							<p class="InfoItemTitle">{{ value.n_name }}</p>
							<p class="InfoItemConte">{{ value.n_note }}</p>
						</div>


						<a-button class="ActiveBoxBut" type="primary" size="small" @click="navigateTo(value.n_path)">
							<template #icon>
								<icon-safe />
							</template>
							{{ value.n_buttext || '查看详情' }}
						</a-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';
const UserInfo = useUserInfo()
const SiteConfig = useSiteConfig()
UserInfo.init((res) => {
	if (!res) {
		Message.error('请先登录')
		navigateTo('/login')
	}
})

/* 获取我的信息 */
const userInfo = ref({})
const getUserInfo = async () => {
	const res = await useApiFetch().post('/api/myinfo')
	if (res.code == 200) {
		userInfo.value = res.data
	} else {
		navigateTo('/login')

	}
}
getUserInfo()
const gopage = (url) => {

}
/* 获取站点配置 */
const config = ref({})

const getConfig = async () => {
	const res = await useApiFetch().post('/api/webinfo')
	if (res.code == 200) {
		config.value = res.data
	}
}
getConfig()


/* 获取活动列表 /api/getActivity */
const ActivityList = ref([])
const getActivity = async () => {
	const res = await useApiFetch().post('/api/getActivity')
	if (res.code === 200) {
		ActivityList.value = res.data
	}
}
getActivity()


</script>

<style lang="scss" scoped>
.AccountTab {
	width: calc(100%);
	border-radius: 20px;
	background-color: #fff;
	overflow: hidden;

	.Account {
		overflow: hidden;
		background-color: #077bff;
		background: linear-gradient(135deg, #00c451 0%, #00dd88 100%);
		display: flex;
		width: calc(100% - 40px);
		padding: 20px 20px;
		border-radius: 20px;
		position: relative;

		.icon {
			color: #ffffff48;
			position: absolute;
			right: 10px;
			top: -10px;
			width: 200px;
			height: 200px;
		}

		.bill-button {
			position: absolute;
			right: 20px;
			top: 20px;
			color: #fff;
			font-size: 12px;

		}

		.Item {
			width: calc(100% - 20px);
			padding: 10px;

			.title {
				font-size: 13px;
				color: #dfdfdf;
			}

			.value {
				font-size: 20px;
				color: #ffffff;
				font-weight: 700;
				margin-top: 3px;
			}
		}
	}

	.content {
		width: calc(100% - 30px);
		padding: 15px;
		background-color: #ffffff;
		display: flex;

		.Item {
			text-align: center;
			width: 100%;
			font-size: 14px;
			color: #333333;
			display: flex;
			justify-content: center;

			.icon {
				width: 20px;
				height: 20px;
				margin-right: 5px;
			}
		}
	}


}

.get-points-way {
	width: calc(100% - 40px);
	background-color: #fff;
	border-radius: 10px;
	margin: 10px auto;
	padding: 20px;

	.Boxs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-top: 10px;
	}

	.InfoItem {
		position: relative;
		// background-color: #f8f8f8;
		display: flex;
		align-items: center;
		padding: 10px;
		border-radius: 10px;
		margin-bottom: 4px;

		.InfoItemIcon {
			width: 40px;
			height: 40px;
			margin-right: 20px;
			margin-left: 0px;
		}

		.InfoItemContent {
			.InfoItemTitle {
				font-size: 14px;
				color: #000000;
				margin-bottom: 5px;
				font-weight: 800;
			}

			.InfoItemConte {
				font-size: 13px;
				color: #6d6d6d;
			}
		}

		.ActiveBoxBut {
			position: absolute;
			right: 4px;
			top: 16px;
			background-color: #ff5d2b;
			border-radius: 20px;
			font-size: 12px;
			color: #fff;
			padding: 2px 15px;
		}
	}
}
</style>