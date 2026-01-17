/**
 * WebSocket 业务模块统一导出文件
 * 提供所有业务模块的统一入口
 */

// 房间管理模块
export {
  handleJoinRoom,
  handleLeaveRoom
} from './room.js';

// 聊天消息模块
export {
  handleChatMessage,
  formatSystemMessage,
  validateMessage
} from './chat.js';

// 用户管理模块
export {
  getRoomUsers,
  getOnlineUserCount,
  getRoomUserCount,
  isUserOnline,
  getUserInfo,
  updateUserInfo,
  removeUser
} from './user.js';