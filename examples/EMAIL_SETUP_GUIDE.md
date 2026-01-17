# 邮件服务配置指南

## 📧 功能概述

本框架集成了完整的邮件发送功能，支持：
- ✅ 邮箱验证码发送
- ✅ 密码重置邮件
- ✅ 欢迎邮件
- ✅ HTML/文本邮件
- ✅ 批量邮件发送
- ✅ 邮件模板系统

## 🗄️ 数据库配置

需要在 `n_configuration` 表中添加邮件相关字段：

```sql
-- 邮件服务配置字段
ALTER TABLE n_configuration 
ADD COLUMN n_email_host VARCHAR(100) DEFAULT 'smtp.qq.com' COMMENT 'SMTP服务器地址',
ADD COLUMN n_email_port INT DEFAULT 587 COMMENT 'SMTP端口',
ADD COLUMN n_email_secure BOOLEAN DEFAULT FALSE COMMENT '是否使用SSL',
ADD COLUMN n_email_user VARCHAR(100) DEFAULT '' COMMENT '邮箱账号',
ADD COLUMN n_email_pass VARCHAR(100) DEFAULT '' COMMENT '邮箱密码/授权码',
ADD COLUMN n_email_from VARCHAR(100) DEFAULT '' COMMENT '发件人邮箱';
```

## ⚙️ 常用邮箱配置

### QQ邮箱 (推荐)
```json
{
    "n_email_host": "smtp.qq.com",
    "n_email_port": 587,
    "n_email_secure": false,
    "n_email_user": "your@qq.com",
    "n_email_pass": "your_authorization_code",
    "n_email_from": "your@qq.com"
}
```

### 163邮箱
```json
{
    "n_email_host": "smtp.163.com",
    "n_email_port": 465,
    "n_email_secure": true,
    "n_email_user": "your@163.com",
    "n_email_pass": "your_authorization_code",
    "n_email_from": "your@163.com"
}
```

### Gmail (需要VPN)
```json
{
    "n_email_host": "smtp.gmail.com",
    "n_email_port": 587,
    "n_email_secure": false,
    "n_email_user": "your@gmail.com",
    "n_email_pass": "your_app_password",
    "n_email_from": "your@gmail.com"
}
```

### 阿里云邮箱
```json
{
    "n_email_host": "smtp.mxhichina.com",
    "n_email_port": 465,
    "n_email_secure": true,
    "n_email_user": "your@yourdomain.com",
    "n_email_pass": "your_password",
    "n_email_from": "your@yourdomain.com"
}
```

## 🔧 获取邮箱授权码

### QQ邮箱
1. 登录 QQ邮箱 → 设置 → 账户
2. 找到 "POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务"
3. 开启 "IMAP/SMTP服务"
4. 按提示发送短信获取授权码
5. 使用授权码作为密码

### 163邮箱
1. 登录 163邮箱 → 设置 → POP3/SMTP/IMAP
2. 开启 "IMAP/SMTP服务"
3. 设置客户端授权密码
4. 使用授权密码作为密码

### Gmail
1. 登录 Google账户 → 安全性
2. 开启 "两步验证"
3. 生成应用专用密码
4. 使用应用专用密码作为邮箱密码

## 📋 API 接口文档

### 1. 发送测试邮件
```javascript
POST /api/email/test
Content-Type: application/json

{
    "to": "recipient@example.com",
    "subject": "测试邮件",
    "content": "这是一封测试邮件内容"
}

响应: {
    "code": 200,
    "msg": "邮件发送成功",
    "data": {
        "messageId": "message-id-123"
    }
}
```

### 2. 发送验证码
```javascript
POST /api/email/verify-code
Content-Type: application/json

{
    "to": "user@example.com"
}

响应: {
    "code": 200,
    "msg": "验证码发送成功",
    "data": {
        "expiresIn": 10
    }
}
```

### 3. 验证验证码
```javascript
POST /api/email/verify-code-check
Content-Type: application/json

{
    "email": "user@example.com",
    "code": "123456"
}

响应: {
    "code": 200,
    "msg": "验证码验证成功"
}
```

### 4. 发送密码重置邮件
```javascript
POST /api/email/password-reset
Content-Type: application/json

{
    "email": "user@example.com"
}

响应: {
    "code": 200,
    "msg": "密码重置链接已发送到您的邮箱"
}
```

### 5. 重置密码
```javascript
POST /api/email/reset-password
Content-Type: application/json

{
    "token": "reset-token-123",
    "password": "newpassword123"
}

响应: {
    "code": 200,
    "msg": "密码重置成功"
}
```

### 6. 发送欢迎邮件
```javascript
POST /api/email/welcome
Content-Type: application/json

{
    "to": "newuser@example.com",
    "username": "张三"
}

响应: {
    "code": 200,
    "msg": "欢迎邮件发送成功"
}
```

### 7. 发送HTML邮件
```javascript
POST /api/email/html
Content-Type: application/json

{
    "to": "recipient@example.com",
    "subject": "HTML邮件",
    "html": "<h1>标题</h1><p>内容</p>",
    "text": "纯文本内容" // 可选
}

响应: {
    "code": 200,
    "msg": "HTML邮件发送成功"
}
```

### 8. 批量发送邮件
```javascript
POST /api/email/sendBatch
Content-Type: application/json

{
    "recipients": [
        "user1@example.com",
        "user2@example.com",
        {"email": "user3@example.com"}
    ],
    "subject": "批量邮件",
    "content": "邮件内容",
    "delay": 1000 // 发送间隔毫秒，可选
}

响应: {
    "code": 200,
    "msg": "批量发送完成，成功：3，失败：0",
    "data": {
        "results": [...],
        "successCount": 3,
        "failCount": 0
    }
}
```

## 🎯 使用示例

### 前端发送验证码
```javascript
async function sendVerificationCode(email) {
    const response = await fetch('/api/email/verify-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to: email })
    });
    
    const result = await response.json();
    if (result.code === 200) {
        console.log('验证码已发送');
    } else {
        alert(result.msg);
    }
}
```

### 前端验证验证码
```javascript
async function verifyCode(email, code) {
    const response = await fetch('/api/email/verify-code-check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code })
    });
    
    const result = await response.json();
    if (result.code === 200) {
        console.log('验证成功');
    } else {
        alert(result.msg);
    }
}
```

### 密码重置流程
```javascript
// 1. 发送重置邮件
async function requestPasswordReset(email) {
    const response = await fetch('/api/email/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });
    
    const result = await response.json();
    alert(result.msg);
}

// 2. 重置密码
async function resetPassword(token, newPassword) {
    const response = await fetch('/api/email/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            token: token,
            password: newPassword 
        })
    });
    
    const result = await response.json();
    if (result.code === 200) {
        alert('密码重置成功');
        // 跳转到登录页面
    } else {
        alert(result.msg);
    }
}
```

## 🔒 安全注意事项

### 1. 配置安全
- 邮箱密码/授权码应妥善保管
- 不要在前端暴露邮箱配置
- 定期更换授权码

### 2. 发送限制
- 同一邮箱5分钟内只能发送1次验证码
- 单日发送次数限制
- 批量发送添加延迟避免被限制

### 3. 内容安全
- 邮件内容进行XSS过滤
- 避免发送敏感信息
- 使用安全的模板引擎

### 4. 令牌安全
- 重置令牌有时效性（24小时）
- 令牌只能使用一次
- 验证成功后立即删除令牌

## 🚀 高级功能

### 1. 自定义邮件模板
```javascript
// 发送自定义模板邮件
const result = await global.EmailService.sendTemplate({
    to: 'user@example.com',
    subject: '自定义邮件',
    template: '/path/to/template.html',
    data: {
        username: '张三',
        link: 'https://example.com',
        date: new Date().toLocaleDateString()
    }
});
```

### 2. 发送带附件邮件
```javascript
const result = await global.EmailService.sendHtml({
    to: 'user@example.com',
    subject: '带附件的邮件',
    html: '<p>请查看附件</p>',
    attachments: [
        {
            filename: 'document.pdf',
            path: '/path/to/document.pdf'
        }
    ]
});
```

### 3. 邮件队列（生产环境推荐）
```javascript
// 使用队列处理大量邮件
const emailQueue = [];

async function addToQueue(emailData) {
    emailQueue.push(emailData);
}

async function processEmailQueue() {
    while (emailQueue.length > 0) {
        const emailData = emailQueue.shift();
        await global.EmailService.sendText(emailData);
        await new Promise(resolve => setTimeout(resolve, 1000)); // 延迟1秒
    }
}

// 定时处理队列
setInterval(processEmailQueue, 5000);
```

## 🐛 故障排除

### 常见问题

#### 1. 连接失败
- 检查SMTP服务器地址和端口
- 确认网络连接正常
- 检查防火墙设置

#### 2. 认证失败
- 确认邮箱账号密码正确
- 检查是否使用授权码
- 确认SMTP服务已开启

#### 3. 发送被拒
- 检查邮件内容是否包含敏感词
- 确认发件人设置正确
- 检查发送频率限制

#### 4. 验证码过期
- 检查Redis连接正常
- 确认过期时间设置
- 检查键名生成逻辑

### 调试模式
```javascript
// 启用详细日志
console.log('邮件配置:', global.EmailService.config);

// 测试连接
const testResult = await global.EmailService.transporter.verify();
console.log('连接测试:', testResult);
```

---

**文档版本**: 1.0  
**最后更新**: 2024-01-01  
**框架版本**: Fastify 5.4 + Nodemailer + Redis