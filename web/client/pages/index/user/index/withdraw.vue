<template>
	<div class="withdraw-container">
		<UserHeader title="余额提现"></UserHeader>

		<div class="content">

			<!-- 提现表单 -->
			<div class="withdraw-form">
				<div class="form-item">
				<BoxTitle><span class="form-label">提现金额 <span style="font-size: 12px;">(可提现 ¥{{ userInfo.n_balance || 0
					}})</span></span></BoxTitle>

					<div class="amount-input-wrapper">
						<span class="currency">¥</span>
						<a-input class="amount-input" type="digit" v-model="form.amount" placeholder="请输入提现金额"
							@input="onAmountInput" />
					</div>
					<div class="tips">
						<span class="tip-span">最小提现金额：¥{{ minAmount }}</span>
						<span class="tip-span">提现手续费：{{ userInfo.VipInfo?.n_withdrawal_fee || '0' }}%</span>
					</div>
				</div>

				<div class="form-item">
				<BoxTitle>预计到账金额</BoxTitle>

					<div class="actual-amount">
						¥{{ actualAmount }}
					</div>
				</div>

				<div class="form-item">
				<BoxTitle>提现方式</BoxTitle>
					<div class="withdraw-methods">
						<div class="method-item" v-for="(value, key) in withdrawMethods" :key="key"
							:class="{ active: form.method === value.n_code }" @click="selectMethod(value)">
							<!-- <span class="method-icon">{{ value.n_icon }}</span> -->
							<image class="method-icon" :src="value.n_icon"></image>
							<span class="method-name">{{ value.n_name }}</span>
						</div>
					</div>
				</div>
				<div class="form-item" v-if="form.methodacctype === '1'">
				<BoxTitle>收款账号</BoxTitle>
					<a-input class="account-input" type="span" v-model="form.account" placeholder="请输入账号" />
				</div>
				<div class="submit-section">
					<a-button span="立即提现" class="submit-btn" type="primary" size="large" :loading="submitting"
						@click="handleSubmit"
						>
						立即提现
					</a-button>
				</div>

			</div>

			<!-- 提现规则 -->
			<div class="withdraw-rules">
				<div class="rules-title">提现规则</div>
				<div class="rules-content">
					<div class="rule-item">• 单笔提现金额不得少于{{ minAmount }}元</div>
					<div class="rule-item">• 提现手续费为{{ userInfo.VipInfo?.n_withdrawal_fee || '0' }}%</div>
					<div class="rule-item">• 提现申请将在1-3个工作日内到账</div>
					<div class="rule-item">• 请确保提现账户信息准确无误</div>
				</div>
			</div>


		</div>
	</div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue';

// 最小提现金额
const minAmount = ref(0.1)

/* 获取我的信息 */
const userInfo = ref({})
const getUserInfo = async () => {
	try {
		const res = await useApiFetch().post('/api/myinfo')
		if (res.code == 200) {
			userInfo.value = res.data
			minAmount.value = res.data.VipInfo?.n_withdrawal_min || 0.1
		} else {
			navigateTo('/login')
		}
	} catch (error) {
		Message.error('获取用户信息失败，请刷新页面重试')
	}
}
getUserInfo()

const form = ref({
	amount: '',
	method: '',
	account: ''
})

const submitting = ref(false)

// 计算实际到账金额
const actualAmount = computed(() => {
	if (!form.value.amount || isNaN(form.value.amount)) {
		return '0.00'
	}
	const amount = parseFloat(form.value.amount)
	const feeRate = (userInfo.value.VipInfo?.n_withdrawal_fee || 0) / 100
	const fee = amount * feeRate
	const actual = amount - fee
	return actual.toFixed(2)
})



// 提现方式相关
const withdrawMethods = ref([])

/* 获取提现方式 */
const getWithdrawMethods = async () => {
	try {
		const res = await useApiFetch().post('/api/GetWithdrawMethod')
		if (res.code == 200) {
			withdrawMethods.value = res.data
			selectMethod(res.data[0])
		} else {
			Message.error('获取提现方式失败，请刷新页面重试')
		}
	} catch (error) {
		console.error('获取提现方式失败:', error)

	}
}
getWithdrawMethods()


// 选择提现方式
const selectMethod = (method) => {
	form.value.method = method.n_code
	form.value.methodacctype = method.n_type
	form.value.account = '' // 清空账号输入
}

// 金额输入处理
const onAmountInput = (e) => {
	let value = e.detail.value
	// 限制只能输入数字和小数点
	value = value.replace(/[^\d.]/g, '')
	// 限制只能有一个小数点
	const dotIndex = value.indexOf('.')
	if (dotIndex !== -1) {
		value = value.substring(0, dotIndex + 3) // 最多两位小数
	}
	form.value.amount = value
}

/* 提交提现申请 */
const handleSubmit = async () => {
	// 防止重复提交
	if (submitting.value) {
		return
	}

	if (form.value.amount === '' || !form.value.amount) {
		Message.error('请输入提现金额')
		return
	}

	// 立即设置提交状态，防止重复点击
	submitting.value = true

	const amount = parseFloat(form.value.amount)
	const balance = parseFloat(userInfo.value.n_balance || 0)

	if (amount < minAmount.value) {
		submitting.value = false
		Message.error(`提现金额不能少于${minAmount.value}元`)
		return
	}

	if (amount > balance) {
		submitting.value = false
		Message.error(`提现金额不能大于可用余额${balance}元`)
		return
	}

	try {
		const res = await useApiFetch().post('/api/UpWithdraw', {
			n_amount: amount,
			n_method: form.value.method,
			n_acc: form.value.account
		})

		if (res.code === 200) {
			Message.success('提现申请提交成功')
			getUserInfo()
			const UserInfo = useUserInfo()
			UserInfo.init()
			form.value.amount = ''
		} else {
			Message.error(res.message || '提现申请提交失败')
		}
	} catch (error) {
		Message.error('提现申请提交失败')
	} finally {
		// 无论成功失败，都要重置提交状态
		submitting.value = false
	}
}
</script>

<style lang="scss" scoped>
.withdraw-container {}

.content {
	width: calc(100%);
	margin: 0 auto;
}

.user-info-card {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 20px;
	padding: 25px;
	margin-bottom: 10px;
	backdrop-filter: blur(10px);

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;

		&:last-child {
			margin-bottom: 0;
		}

		.label {
			color: #666;
			font-size: 14px;
		}

		.balance {
			color: #333;
			font-size: 24px;
			font-weight: bold;
		}

		.fee {
			color: #ff6b6b;
			font-size: 18px;
			font-weight: bold;
		}
	}
}

.withdraw-form {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 20px;
	padding: 25px;
	margin-bottom: 10px;
	backdrop-filter: blur(10px);
	width: calc(100% - 50px);

	.form-item {
		margin-bottom: 25px;

		&:last-child {
			margin-bottom: 0;
		}

		.form-label {
			display: block;
			color: #333;
			font-size: 16px;
			font-weight: 500;
			margin-bottom: 10px;
		}

		.amount-input-wrapper {
			display: flex;
			align-items: center;
			background: #f8f9fa;
			border-radius: 12px;
			padding: 15px;
			border: 2px solid transparent;
			transition: all 0.3s;
			width: calc(100% - 30px);


			.currency {
				color: #00c451;
				font-size: 20px;
				font-weight: bold;
				margin-right: 10px;
			}

			.amount-input {
				flex: 1;
				font-size: 18px;
				font-weight: bold;
				color: #333;
				outline: none;
				background: transparent;
			}
		}

		.tips {
			margin-top: 8px;

			.tip-span {
				color: #999;
				font-size: 12px;
				margin-right: 10px;
			}
		}

		.actual-amount {
			// background: linear-gradient(135deg, #667eea, #764ba2);
			color: #00c451;
			padding: 6px;
			border-radius: 12px;
			font-size: 20px;
			font-weight: bold;
			span-align: center;
		}

		.account-input {
			width: calc(100% - 30px);
			padding: 15px;
			background: #f8f9fa;
			border: 2px solid transparent;
			border-radius: 12px;
			font-size: 16px;
			color: #333;
			transition: all 0.3s;

			&:focus {
				border-color: #00c451;
				background: #fff;
			}
		}
	}

	.withdraw-methods {
		display: flex;
		justify-content: space-between;
		gap: 15px;

		.method-item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 7px 10px;
			background: #f8f9fa;
			border: 1px solid #ffffff;
			border-radius: 12px;
			cursor: pointer;
			border: 1px solid #ffffff;
			transition: all 0.3s;

			&.active {
				// border-color: #667eea;
				border: 1px solid #00c451;

			}

			.method-icon {
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}

			.method-name {
				font-size: 12px;
				color: #666;
			}
		}
	}
}

.withdraw-rules {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 20px;
	padding: 25px;
	margin-bottom: 20px;
	backdrop-filter: blur(10px);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

	.rules-title {
		color: #333;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 15px;
	}

	.rules-content {
		.rule-item {
			color: #666;
			font-size: 14px;
			line-height: 1.6;
			margin-bottom: 8px;
		}
	}
}

.submit-section {
	padding: 0 10px;

	.submit-btn {
		background-color: #00c451;
		width: 100%;

		border-radius: 20px;
	}
}
</style>
