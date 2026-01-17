/**
 * WebSocket 客户端示例
 * 演示如何连接到 WebSocket 服务器并处理房间消息
 */

// Socket.IO 客户端连接
let socket = null;
let currentRoom = '';
let currentUsername = '';

// DOM 元素
const elements = {
    connectBtn: document.getElementById('connectBtn'),
    disconnectBtn: document.getElementById('disconnectBtn'),
    joinRoomBtn: document.getElementById('joinRoomBtn'),
    leaveRoomBtn: document.getElementById('leaveRoomBtn'),
    username: document.getElementById('username'),
    room: document.getElementById('room'),
    password: document.getElementById('password'),
    message: document.getElementById('message'),
    sendBtn: document.getElementById('sendBtn'),
    messages: document.getElementById('messages'),
    status: document.getElementById('status'),
    onlineCount: document.getElementById('onlineCount')
};

/**
 * 连接到 WebSocket 服务器
 */
function connectToServer() {
    try {
        socket = io('ws://localhost:3000', {
            transports: ['websocket', 'polling'], // 支持多种传输方式
            timeout: 20000,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        setupSocketEventListeners();
        
    } catch (error) {
        console.error('连接失败:', error);
        updateStatus('连接失败', 'error');
    }
}

/**
 * 设置 Socket 事件监听器
 */
function setupSocketEventListeners() {
    // 连接成功
    socket.on('connect', () => {
        console.log('✅ 连接成功，Socket ID:', socket.id);
        updateStatus('已连接', 'success');
        elements.connectBtn.disabled = true;
        elements.disconnectBtn.disabled = false;
        elements.joinRoomBtn.disabled = false;
    });

    // 连接断开
    socket.on('disconnect', (reason) => {
        console.log('❌ 连接断开:', reason);
        updateStatus('连接断开: ' + reason, 'warning');
        elements.connectBtn.disabled = false;
        elements.disconnectBtn.disabled = true;
        elements.joinRoomBtn.disabled = true;
        elements.leaveRoomBtn.disabled = true;
        currentRoom = '';
    });

    // 连接错误
    socket.on('connect_error', (error) => {
        console.error('❌ 连接错误:', error);
        updateStatus('连接错误: ' + error.message, 'error');
    });

    // 用户加入房间成功
    socket.on('join-success', (data) => {
        console.log('🎉 成功加入房间:', data);
        addMessage('system', data.message, data.timestamp);
        
        // 更新UI状态
        currentRoom = data.room;
        elements.joinRoomBtn.disabled = true;
        elements.leaveRoomBtn.disabled = false;
        elements.sendBtn.disabled = false;
        elements.room.disabled = true;
        elements.password.disabled = true;
    });

    // 其他用户加入房间
    socket.on('user-joined', (data) => {
        console.log('👋 用户加入:', data);
        addMessage('user-joined', data.message, data.timestamp);
    });

    // 用户离开房间
    socket.on('user-left', (data) => {
        console.log('👋 用户离开:', data);
        addMessage('user-left', data.message, data.timestamp);
    });

    // 收到房间消息
    socket.on('msg-room', (data) => {
        console.log('💬 收到房间消息:', data);
        addMessage('chat', data.message, data.timestamp, data.username);
    });

    // 收到系统错误
    socket.on('error', (data) => {
        console.error('❌ 服务器错误:', data);
        addMessage('error', data.message);
        updateStatus('错误: ' + data.message, 'error');
    });

    // 在线统计（管理员房间）
    socket.on('online-stats', (data) => {
        console.log('📊 在线统计:', data);
        if (elements.onlineCount) {
            elements.onlineCount.textContent = `在线: ${data.totalUsers} 人`;
        }
    });
}

/**
 * 加入房间
 */
function joinRoom() {
    const username = elements.username.value.trim();
    const room = elements.room.value.trim();
    const password = elements.password.value;

    if (!username || !room) {
        alert('请输入用户名和房间名');
        return;
    }

    currentUsername = username;

    // 发送加入房间请求
    socket.emit('join-room', { 
        username: username, 
        room: room, 
        pass: password 
    });
    
    console.log(`📤 尝试加入房间: ${room} (用户: ${username})`);
    addMessage('system', `正在尝试加入房间 "${room}"...`);
}

/**
 * 离开房间
 */
function leaveRoom() {
    if (!currentRoom) return;

    socket.emit('leave-room', { 
        room: currentRoom 
    });
    
    console.log(`📤 离开房间: ${currentRoom}`);
    addMessage('system', `离开了房间 "${currentRoom}"`);
    
    // 重置UI状态
    currentRoom = '';
    elements.joinRoomBtn.disabled = false;
    elements.leaveRoomBtn.disabled = true;
    elements.sendBtn.disabled = true;
    elements.room.disabled = false;
    elements.password.disabled = false;
}

/**
 * 发送消息到房间
 */
function sendMessage() {
    const messageText = elements.message.value.trim();
    
    if (!messageText) return;
    
    if (!currentRoom) {
        alert('请先加入房间');
        return;
    }

    // 发送聊天消息
    socket.emit('chat-message', {
        room: currentRoom,
        message: messageText,
        username: currentUsername
    });
    
    console.log(`📤 发送消息到房间 ${currentRoom}:`, messageText);
    
    // 清空输入框
    elements.message.value = '';
}

/**
 * 添加消息到显示区域
 */
function addMessage(type, content, timestamp = new Date(), username = '') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    let messageHTML = '';
    
    switch (type) {
        case 'system':
            messageHTML = `
                <div class="message-content">📢 ${content}</div>
                <div class="message-time">${formatTime(timestamp)}</div>
            `;
            break;
        case 'user-joined':
            messageHTML = `
                <div class="message-content">👋 ${content}</div>
                <div class="message-time">${formatTime(timestamp)}</div>
            `;
            break;
        case 'user-left':
            messageHTML = `
                <div class="message-content">👋 ${content}</div>
                <div class="message-time">${formatTime(timestamp)}</div>
            `;
            break;
        case 'chat':
            messageHTML = `
                <div class="message-header">${username || '匿名'}</div>
                <div class="message-content">${content}</div>
                <div class="message-time">${formatTime(timestamp)}</div>
            `;
            break;
        case 'error':
            messageHTML = `
                <div class="message-content">❌ ${content}</div>
                <div class="message-time">${formatTime(timestamp)}</div>
            `;
            break;
    }
    
    messageDiv.innerHTML = messageHTML;
    elements.messages.appendChild(messageDiv);
    elements.messages.scrollTop = elements.messages.scrollHeight;
}

/**
 * 更新连接状态
 */
function updateStatus(text, type = 'info') {
    elements.status.textContent = text;
    elements.status.className = `status ${type}`;
}

/**
 * 格式化时间
 */
function formatTime(date) {
    return new Date(date).toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
}

/**
 * 断开连接
 */
function disconnectFromServer() {
    if (socket && socket.connected) {
        socket.disconnect();
    }
}

/**
 * 初始化事件监听器
 */
function initEventListeners() {
    // 连接/断开按钮
    elements.connectBtn.addEventListener('click', connectToServer);
    elements.disconnectBtn.addEventListener('click', disconnectFromServer);
    
    // 加入/离开房间
    elements.joinRoomBtn.addEventListener('click', joinRoom);
    elements.leaveRoomBtn.addEventListener('click', leaveRoom);
    
    // 发送消息
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.message.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 初始状态
    elements.disconnectBtn.disabled = true;
    elements.joinRoomBtn.disabled = true;
    elements.leaveRoomBtn.disabled = true;
    elements.sendBtn.disabled = true;
}

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    
    // 自动连接服务器
    connectToServer();
    
    console.log('🚀 WebSocket 客户端初始化完成');
});