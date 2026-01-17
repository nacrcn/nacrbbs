/**
 * WebSocket 服务器使用示例
 * 演示如何使用 app/WebSocket/main.js 中定义的 WebSocket 服务
 */

const { Server } = require('socket.io');
const http = require('http');

// 创建 HTTP 服务器
const server = http.createServer();

// 创建 Socket.IO 服务器实例
const io = new Server(server, {
  cors: {
    origin: "*", // 允许所有来源的连接（生产环境中应设置具体域名）
    methods: ["GET", "POST"]
  }
});

// 存储在线用户信息
const onlineUsers = new Map();

// 监听客户端连接事件
io.on('connection', (socket) => {
  console.log(`🔌 用户连接: ${socket.id}`);
  console.log(`📊 当前在线用户数: ${io.engine.clientsCount}`);

  /**
   * 用户加入房间
   * 客户端发送: { username: '用户名', room: '房间名' }
   */
  socket.on('join-room', (data) => {
    const { username, room } = data;
    
    // 加入指定房间
    socket.join(room);
    
    // 保存用户信息
    onlineUsers.set(socket.id, {
      username: username || '匿名用户',
      room: room || 'default',
      joinTime: new Date()
    });

    console.log(`👤 ${username} 加入房间: ${room}`);
    
    // 向房间内其他用户广播新用户加入
    socket.to(room).emit('user-joined', {
      username: username || '匿名用户',
      message: `${username || '匿名用户'} 加入了房间`,
      timestamp: new Date()
    });

    // 向当前用户发送房间信息和在线用户列表
    socket.emit('room-info', {
      room: room,
      onlineUsers: Array.from(onlineUsers.values()).filter(user => user.room === room),
      message: `成功加入房间: ${room}`
    });
  });

  /**
   * 处理聊天消息
   * 客户端发送: { message: '消息内容', room: '房间名' }
   */
  socket.on('chat-message', (data) => {
    const { message, room } = data;
    const user = onlineUsers.get(socket.id);
    
    if (!user) {
      socket.emit('error', { message: '请先加入房间' });
      return;
    }

    const messageData = {
      id: Date.now().toString(),
      username: user.username,
      message: message,
      room: room,
      timestamp: new Date(),
      socketId: socket.id
    };

    console.log(`💬 [${room}] ${user.username}: ${message}`);
    
    // 向房间内所有用户（包括发送者）广播消息
    io.to(room).emit('chat-message', messageData);
  });

  /**
   * 处理私聊消息
   * 客户端发送: { targetUserId: '目标用户ID', message: '消息内容' }
   */
  socket.on('private-message', (data) => {
    const { targetUserId, message } = data;
    const sender = onlineUsers.get(socket.id);
    
    if (!sender) {
      socket.emit('error', { message: '请先加入房间' });
      return;
    }

    const messageData = {
      id: Date.now().toString(),
      from: {
        username: sender.username,
        socketId: socket.id
      },
      message: message,
      timestamp: new Date(),
      isPrivate: true
    };

    console.log(`🔒 私聊 ${sender.username} -> ${targetUserId}: ${message}`);
    
    // 向目标用户发送私聊消息
    io.to(targetUserId).emit('private-message', messageData);
    
    // 向发送者确认消息已发送
    socket.emit('message-sent', {
      targetUserId: targetUserId,
      message: '私聊消息已发送'
    });
  });

  /**
   * 处理用户输入状态（正在输入）
   * 客户端发送: { room: '房间名', isTyping: true/false }
   */
  socket.on('typing', (data) => {
    const { room, isTyping } = data;
    const user = onlineUsers.get(socket.id);
    
    if (!user) return;

    // 向房间内其他用户广播输入状态
    socket.to(room).emit('user-typing', {
      username: user.username,
      isTyping: isTyping,
      timestamp: new Date()
    });
  });

  /**
   * 获取房间列表
   */
  socket.on('get-rooms', () => {
    // 获取所有房间和用户数
    const rooms = {};
    onlineUsers.forEach(user => {
      if (!rooms[user.room]) {
        rooms[user.room] = 0;
      }
      rooms[user.room]++;
    });

    socket.emit('rooms-list', {
      rooms: rooms,
      totalUsers: onlineUsers.size
    });
  });

  /**
   * 获取用户信息
   */
  socket.on('get-user-info', () => {
    const user = onlineUsers.get(socket.id);
    socket.emit('user-info', user || null);
  });

  /**
   * 处理断开连接
   */
  socket.on('disconnect', (reason) => {
    const user = onlineUsers.get(socket.id);
    
    if (user) {
      console.log(`👋 用户断开连接: ${user.username} (${socket.id}) - 原因: ${reason}`);
      
      // 向房间内其他用户广播用户离开
      socket.to(user.room).emit('user-left', {
        username: user.username,
        message: `${user.username} 离开了房间`,
        timestamp: new Date()
      });
      
      // 从在线用户列表中移除
      onlineUsers.delete(socket.id);
    } else {
      console.log(`👋 匿名用户断开连接: ${socket.id} - 原因: ${reason}`);
    }
    
    console.log(`📊 当前在线用户数: ${io.engine.clientsCount}`);
  });

  /**
   * 错误处理
   */
  socket.on('error', (error) => {
    console.error(`❌ Socket 错误 [${socket.id}]:`, error);
  });
});

/**
 * 服务器广播功能示例
 */
const broadcastSystemMessage = (room, message) => {
  const messageData = {
    type: 'system',
    message: message,
    timestamp: new Date()
  };
  
  if (room) {
    io.to(room).emit('system-message', messageData);
  } else {
    io.emit('system-message', messageData);
  }
};

/**
 * 定时任务示例：每分钟发送在线统计
 */
setInterval(() => {
  const stats = {
    totalConnections: io.engine.clientsCount,
    totalUsers: onlineUsers.size,
    rooms: {}
  };
  
  onlineUsers.forEach(user => {
    if (!stats.rooms[user.room]) {
      stats.rooms[user.room] = 0;
    }
    stats.rooms[user.room]++;
  });
  
  console.log(`📈 在线统计:`, stats);
  
  // 向管理房间发送统计信息（如果存在）
  io.to('admin').emit('online-stats', stats);
}, 60000); // 每分钟执行一次

// 启动服务器
const PORT = process.env.WEBSOCKET_PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 WebSocket 服务器启动成功！`);
  console.log(`📡 监听端口: ${PORT}`);
  console.log(`🌐 连接地址: ws://localhost:${PORT}`);
  console.log(`\n💡 使用提示:`);
  console.log(`   - 客户端可通过 socket.emit('join-room', {username, room}) 加入房间`);
  console.log(`   - 客户端可通过 socket.emit('chat-message', {message, room}) 发送消息`);
  console.log(`   - 支持私聊、输入状态提示等功能`);
  console.log(`   - 管理员可加入 'admin' 房间查看统计信息`);
});

// 优雅关闭处理
process.on('SIGTERM', () => {
  console.log('🛑 收到 SIGTERM 信号，正在关闭服务器...');
  server.close(() => {
    console.log('✅ WebSocket 服务器已关闭');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 收到 SIGINT 信号，正在关闭服务器...');
  server.close(() => {
    console.log('✅ WebSocket 服务器已关闭');
    process.exit(0);
  });
});

// 导出 io 实例供其他模块使用
module.exports = { io, broadcastSystemMessage };