/**
 * 房间管理业务模块
 * 处理用户加入房间、房间验证等相关逻辑
 */

/**
 * 处理用户加入房间
 * @param {Object} socket - Socket.IO socket 实例
 * @param {Object} io - Socket.IO 服务器实例
 * @param {Map} onlineUsers - 在线用户列表
 * @param {Object} data - 加入房间数据 { username, room, pass }
 */
export const handleJoinRoom = async (socket, _io, onlineUsers, data) => {
  const { username, room, pass } = data;

  /* 获取是否有这个房间 */
  let roomInfo;

  try {
    roomInfo = await global.RedisUtils.getCache(`Room:${room}`);
  } catch (error) {
    roomInfo = false;
  }

  if (!roomInfo) {
    return socket.emit('error', { message: '房间不存在' });
  }
  
  roomInfo = JSON.parse(roomInfo);

  if (roomInfo.pass !== '' && roomInfo.pass !== pass) {
    return socket.emit('error', { message: '房间密码错误' });
  }

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
  socket.to(room).emit('message', {
    username: username || '匿名用户',
    message: `${username || '匿名用户'} 加入了房间`,
    timestamp: new Date()
  });

  // 向当前用户发送加入成功消息
  socket.emit('join-success', {
    message: `成功加入房间: ${room}`,
    room: room,
    username: username,
    timestamp: new Date()
  });
};

/**
 * 处理用户离开房间
 * @param {Object} socket - Socket.IO socket 实例
 * @param {Object} io - Socket.IO 服务器实例
 * @param {Map} onlineUsers - 在线用户列表
 * @param {string} reason - 断开连接的原因
 */
export const handleLeaveRoom = (socket, io, onlineUsers, reason) => {
  const user = onlineUsers.get(socket.id);

  if (user) {
    console.log(`👋 用户断开连接: ${user.username} (${socket.id}) - 原因: ${reason}`);

    // 向房间内其他用户广播用户离开
    socket.to(user.room).emit('message', {
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
};