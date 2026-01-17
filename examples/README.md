# WebSocket 客户端使用指南

## 📁 文件说明

- `client-simple.html` - 简洁版客户端界面
- `websocket-client.js` - 客户端核心逻辑
- `client-example.html` - 功能完整的客户端界面（之前创建的）

## 🚀 快速开始

### 1. 启动服务器
```bash
# 确保服务器正在运行
node app/WebSocket/main.js
```

### 2. 打开客户端
直接在浏览器中打开 `client-simple.html` 文件

## 🔧 使用步骤

### 基本流程
1. **连接服务器** - 点击"连接服务器"按钮
2. **设置用户信息** - 输入用户名和房间名
3. **加入房间** - 点击"加入房间"按钮
4. **开始聊天** - 输入消息并发送

### 功能说明

#### 🌐 连接管理
- **自动连接**：页面加载时自动尝试连接
- **重连机制**：连接断开时自动重连（最多5次）
- **状态显示**：实时显示连接状态

#### 🏠 房间功能
- **密码保护**：支持房间密码验证
- **实时加入/离开**：动态显示用户进出
- **消息广播**：房间内所有用户都能收到消息

#### 💬 消息类型
- `system` - 系统消息
- `user-joined` - 用户加入通知
- `user-left` - 用户离开通知
- `chat` - 聊天消息
- `error` - 错误消息

## 📡 Socket.IO 事件说明

### 客户端发送事件
```javascript
// 加入房间
socket.emit('join-room', {
    username: '用户名',
    room: '房间名',
    pass: '密码'  // 可选
});

// 发送消息
socket.emit('chat-message', {
    room: '房间名',
    message: '消息内容',
    username: '用户名'
});

// 离开房间
socket.emit('leave-room', {
    room: '房间名'
});
```

### 客户端监听事件
```javascript
// 加入成功
socket.on('join-success', (data) => {
    // data: { message, room, username, timestamp }
});

// 其他用户加入
socket.on('user-joined', (data) => {
    // data: { username, message, timestamp }
});

// 用户离开
socket.on('user-left', (data) => {
    // data: { username, message, timestamp }
});

// 收到消息
socket.on('msg-room', (data) => {
    // data: { room, message, username, timestamp }
});

// 错误消息
socket.on('error', (data) => {
    // data: { message }
});

// 在线统计
socket.on('online-stats', (data) => {
    // data: { totalConnections, totalUsers, rooms }
});
```

## 🛠️ 自定义配置

### 修改服务器地址
在 `websocket-client.js` 中修改连接地址：
```javascript
socket = io('ws://localhost:3000', {
    // 配置选项
});
```

### 添加新的事件监听器
```javascript
// 在 setupSocketEventListeners() 函数中添加
socket.on('new-event', (data) => {
    console.log('新事件:', data);
    // 处理新事件
});
```

## 🔍 调试技巧

### 1. 浏览器控制台
按 F12 打开开发者工具，查看 Console 输出

### 2. 网络选项卡
在 Network 选项卡中查看 WebSocket 连接状态

### 3. 常见问题

**Q: 连接失败？**
A: 检查服务器是否运行在正确端口

**Q: 房间不存在错误？**
A: 确保服务器端有对应的房间配置

**Q: 消息发送失败？**
A: 确认已成功加入房间

## 🎨 UI 自定义

### 修改主题色
在 CSS 中修改渐变色：
```css
.header {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

### 添加动画效果
```css
.message {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
```

## 📱 移动端适配

界面已包含响应式设计，支持手机和平板设备。

## 🔐 安全注意事项

1. **生产环境**：限制 CORS 源
2. **输入验证**：添加消息长度限制
3. **用户认证**：集成登录系统
4. **消息过滤**：防止 XSS 攻击

## 🚀 扩展功能

### 添加私聊功能
```javascript
// 发送私聊
socket.emit('private-message', {
    targetUserId: '目标用户ID',
    message: '私聊内容'
});

// 监听私聊
socket.on('private-message', (data) => {
    // 处理私聊消息
});
```

### 文件传输
需要额外的 Socket.IO 二进制流支持。

### 语音/视频通话
需要 WebRTC 配合 Socket.IO 信令服务器。