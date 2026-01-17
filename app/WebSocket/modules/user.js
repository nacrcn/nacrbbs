/**
 * 用户管理业务模块
 * 处理用户在线状态、用户信息管理等相关逻辑
 */

/**
 * 获取房间内的在线用户列表
 * @param {Map} onlineUsers - 在线用户列表
 * @param {string} room - 房间名称
 * @returns {Array} 房间内的用户列表
 */
export const getRoomUsers = (onlineUsers, room) => {
  const roomUsers = [];
  
  onlineUsers.forEach((user, socketId) => {
    if (user.room === room) {
      roomUsers.push({
        socketId: socketId,
        username: user.username,
        joinTime: user.joinTime
      });
    }
  });
  
  return roomUsers;
};

/**
 * 获取所有在线用户数量
 * @param {Map} onlineUsers - 在线用户列表
 * @returns {number} 在线用户数量
 */
export const getOnlineUserCount = (onlineUsers) => {
  return onlineUsers.size;
};

/**
 * 获取指定房间的在线用户数量
 * @param {Map} onlineUsers - 在线用户列表
 * @param {string} room - 房间名称
 * @returns {number} 房间内在线用户数量
 */
export const getRoomUserCount = (onlineUsers, room) => {
  let count = 0;
  
  onlineUsers.forEach((user) => {
    if (user.room === room) {
      count++;
    }
  });
  
  return count;
};

/**
 * 检查用户是否在线
 * @param {Map} onlineUsers - 在线用户列表
 * @param {string} socketId - 用户 socket ID
 * @returns {boolean} 用户是否在线
 */
export const isUserOnline = (onlineUsers, socketId) => {
  return onlineUsers.has(socketId);
};

/**
 * 获取用户信息
 * @param {Map} onlineUsers - 在线用户列表
 * @param {string} socketId - 用户 socket ID
 * @returns {Object|null} 用户信息，如果用户不存在则返回 null
 */
export const getUserInfo = (onlineUsers, socketId) => {
  return onlineUsers.get(socketId) || null;
};

/**
 * 更新用户信息
 * @param {Map} onlineUsers - 在线用户列表
 * @param {string} socketId - 用户 socket ID
 * @param {Object} updates - 要更新的用户信息
 * @returns {boolean} 更新是否成功
 */
export const updateUserInfo = (onlineUsers, socketId, updates) => {
  const user = onlineUsers.get(socketId);
  
  if (!user) {
    return false;
  }
  
  Object.assign(user, updates);
  onlineUsers.set(socketId, user);
  return true;
};

/**
 * 移除用户
 * @param {Map} onlineUsers - 在线用户列表
 * @param {string} socketId - 用户 socket ID
 * @returns {boolean} 移除是否成功
 */
export const removeUser = (onlineUsers, socketId) => {
  return onlineUsers.delete(socketId);
};