/**
 * WebSocket 服务器主文件
 * 使用模块化业务逻辑的 WebSocket 服务
 */
import { Server } from 'socket.io'
import http from 'http'

// 导入业务模块
import { handleJoinRoom, handleLeaveRoom } from './modules/room.js'
import { handleChatMessage } from './modules/chat.js'
import { getUserInfo, getOnlineUserCount } from './modules/user.js'


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

/* 房间列表 */

// 监听客户端连接事件
io.on('connection', (socket) => {
  /**
   * 用户加入房间
   * 客户端发送: { username: '用户名', room: '房间名', pass: '房间密码' }
   */
  socket.on('join-room', async (data) => {
    await handleJoinRoom(socket, io, onlineUsers, data);
  });

    /**
   * 处理聊天消息
   * 客户端发送: { message: '消息内容', room: '房间名' }
   */
  socket.on('chat-message', (data) => {
    handleChatMessage(socket, io, onlineUsers, data);
  });

  /**
   * 处理断开连接
   */
  socket.on('disconnect', (reason) => {
    handleLeaveRoom(socket, io, onlineUsers, reason);
  });

  /**
   * 错误处理
   */
  socket.on('error', (error) => {
    console.error(`❌ Socket 错误 [${socket.id}]:`, error);
  });
});


// 启动服务器
const PORT = global.CONFIG.wsPort;
server.listen(PORT, () => {
  console.log(`🚀 WebSocket 服务器启动成功！`);
  console.log(`📡 监听端口: ${PORT}`);
  console.log(`🌐 连接地址: ws://localhost:${PORT}`);
});

// 优雅关闭处理
process.on('SIGTERM', () => {
  console.log('🛑 收到 SIGTERM 信号，正在关闭服务器...');
  server.close(() => {
    console.log('✅ WebSocket 服务器已关闭');
    // process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('✅ WebSocket 服务器已关闭');
    process.exit(0);
  });
});

// 导出 io 实例供其他模块使用
export {
  io
}