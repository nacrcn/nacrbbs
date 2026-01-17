# 验证函数使用指南

## 概述

`VerifyField` 函数已增强，支持多种验证条件和自定义验证逻辑。

## 基本用法

```javascript
import { VerifyField } from './app/imp/Tools.js';

const fields = {
    username: ['username', '用户名', 'required|minLength:3|maxLength:20'],
    email: ['email', '邮箱', 'required|email'],
    password: ['password', '密码', 'required|minLength:6|password']
};

const error = VerifyField(reply, data, fields);
if (!error) {
    // 验证通过
}
```

## 支持的验证规则

### 基本规则

| 规则 | 说明 | 示例 | 参数 |
|------|------|------|------|
| `required` | 必填字段 | `required` | 无 |
| `email` | 邮箱格式 | `email` | 无 |
| `phone` | 手机号格式 | `phone` | 无 |
| `url` | URL格式 | `url` | 无 |
| `date` | 日期格式 (YYYY-MM-DD) | `date` | 无 |
| `datetime` | 日期时间格式 | `datetime` | 无 |

### 长度规则

| 规则 | 说明 | 示例 | 参数 |
|------|------|------|------|
| `minLength` | 最小长度 | `minLength:6` | 最小长度 |
| `maxLength` | 最大长度 | `maxLength:50` | 最大长度 |
| `length` | 固定长度 | `length:11` | 长度值 |

### 数值规则

| 规则 | 说明 | 示例 | 参数 |
|------|------|------|------|
| `number` | 数字 | `number` | 无 |
| `float` | 浮点数 | `float` | 无 |
| `integer` | 整数 | `integer` | 无 |
| `positive` | 正数 | `positive` | 无 |
| `range` | 数值范围 | `range:18:100` | 最小值,最大值 |

### 格式规则

| 规则 | 说明 | 示例 | 参数 |
|------|------|------|------|
| `idCard` | 身份证号 | `idCard` | 无 |
| `password` | 密码强度 | `password` | 无 |
| `json` | JSON格式 | `json` | 无 |
| `array` | 数组类型 | `array` | 无 |
| `object` | 对象类型 | `object` | 无 |
| `boolean` | 布尔值 | `boolean` | 无 |

### 特殊规则

| 规则 | 说明 | 示例 | 参数 |
|------|------|------|------|
| `confirmPassword` | 密码确认 | `confirmPassword:password` | 比较字段名 |

## 使用示例

### 1. 基本验证

```javascript
const fields = {
    username: ['username', '用户名', 'required'],
    email: ['email', '邮箱', 'required|email'],
    age: ['age', '年龄', 'required|integer|range:18:100']
};
```

### 2. 组合验证

```javascript
const fields = {
    username: ['username', '用户名', 'required|minLength:3|maxLength:20'],
    password: ['password', '密码', 'required|minLength:6|password'],
    confirmPassword: ['confirmPassword', '确认密码', 'required|confirmPassword:password']
};
```

### 3. 自定义函数验证

```javascript
const fields = {
    username: ['username', '用户名', (value, label, allData) => {
        if (!value) return '用户名不能为空';
        if (value.length < 3) return '用户名长度不能少于3位';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return '用户名只能包含字母、数字和下划线';
        if (['admin', 'root'].includes(value.toLowerCase())) return '用户名不能使用系统保留词';
        return null; // 验证通过
    }]
};
```

### 4. 条件验证

```javascript
const fields = {
    userType: ['userType', '用户类型', 'required'],
    companyName: ['companyName', '公司名称', (value, label, allData) => {
        // 根据用户类型决定是否必填
        if (allData.userType === 'enterprise' && !value) {
            return '企业用户必须填写公司名称';
        }
        return null;
    }]
};
```

## 快速验证

### 单字段验证

```javascript
import { verifyField } from './app/imp/Tools.js';

// 快速验证单个值
const isValid = verifyField('test@example.com', 'required|email', '邮箱');
console.log(isValid); // true

const isInvalid = verifyField('invalid-email', 'email', '邮箱');
console.log(isInvalid); // false
```

### 中间件使用

```javascript
import { validate } from './app/imp/Tools.js';

// 创建验证中间件
const userValidation = validate({
    username: ['username', '用户名', 'required|minLength:3'],
    email: ['email', '邮箱', 'required|email']
});

// 在路由中使用
app.post('/user', userValidation, (req, reply) => {
    // 验证通过后才执行这里
});
```

## 实际业务场景

### 用户注册

```javascript
const registrationFields = {
    username: ['username', '用户名', 'required|minLength:3|maxLength:20'],
    email: ['email', '邮箱', 'required|email'],
    password: ['password', '密码', 'required|minLength:6|password'],
    confirmPassword: ['confirmPassword', '确认密码', 'required|confirmPassword:password'],
    phone: ['phone', '手机号', 'phone'],
    agreement: ['agreement', '用户协议', 'required']
};
```

### 订单创建

```javascript
const orderFields = {
    orderId: ['orderId', '订单号', 'required|length:20'],
    amount: ['amount', '订单金额', 'required|positive|float'],
    productId: ['productId', '商品ID', 'required|integer|positive'],
    quantity: ['quantity', '商品数量', 'required|integer|min:1|max:999'],
    address: ['address', '收货地址', 'required|minLength:10|maxLength:200'],
    paymentMethod: ['paymentMethod', '支付方式', 'required|range:1:5']
};
```

### 文章发布

```javascript
const articleFields = {
    title: ['title', '文章标题', 'required|minLength:5|maxLength:100'],
    content: ['content', '文章内容', 'required|minLength:50'],
    category: ['category', '文章分类', 'required|integer|positive'],
    tags: ['tags', '文章标签', 'array'],
    status: ['status', '发布状态', 'required|range:0:2']
};
```

## 兼容性

### 旧版本格式（仍然支持）

```javascript
// 旧版本 - 仍然可用
const fields = {
    username: ['username', '用户名', 'required'],
    email: ['email', '邮箱', 'required']
};
```

### 新版本格式（推荐）

```javascript
// 新版本 - 功能更强大
const fields = {
    username: ['username', '用户名', 'required|minLength:3|maxLength:20'],
    email: ['email', '邮箱', 'required|email']
};
```

## 错误处理

验证失败时会自动发送错误响应并返回错误信息：

```javascript
// 验证失败时的响应格式
{
    "code": 201,
    "msg": "用户名不能为空",
    "data": {},
    "total": 0
}
```

## 最佳实践

1. **必填字段放在前面**：将 `required` 规则放在最前面
2. **合理的长度限制**：设置合适的最小和最大长度
3. **格式验证**：对邮箱、手机号等进行格式验证
4. **业务逻辑验证**：使用自定义函数处理复杂的业务规则
5. **用户友好提示**：提供清晰、具体的错误信息

## 扩展验证规则

如需添加新的验证规则，可以在 `ValidationRule` 类中添加静态方法：

```javascript
static customRule(value, fieldName) {
    // 自定义验证逻辑
    if (someCondition) {
        return `${fieldName}验证失败`;
    }
    return null;
}
```