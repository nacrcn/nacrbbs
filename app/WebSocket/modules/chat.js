/**
 * 聊天消息业务模块
 * 处理聊天消息发送、消息格式化等相关逻辑
 */

/**
 * 处理聊天消息
 * @param {Object} socket - Socket.IO socket 实例
 * @param {Object} io - Socket.IO 服务器实例
 * @param {Map} onlineUsers - 在线用户列表
 * @param {Object} data - 消息数据 { message, room }
 */
export const handleChatMessage = (socket, io, onlineUsers, data) => {
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
  io.to(room).emit('message', messageData);
};

/**
 * 格式化系统消息
 * @param {string} content - 消息内容
 * @param {string} type - 消息类型 (join, leave, system)
 * @returns {Object} 格式化后的消息对象
 */
export const formatSystemMessage = (content, type = 'system') => {
  return {
    id: Date.now().toString(),
    username: '系统',
    message: content,
    type: type,
    timestamp: new Date(),
    isSystem: true
  };
};

/**
 * 验证消息内容
 * @param {string} message - 消息内容
 * @returns {boolean} 是否为有效消息
 */
export const validateMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return false;
  }
  
  // 检查消息长度（可根据需求调整）
  if (message.trim().length === 0 || message.length > 1000) {
    return false;
  }
  
  return true;
};