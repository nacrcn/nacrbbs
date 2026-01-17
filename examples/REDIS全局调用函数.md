# Redis使用指南

## 概述

本项目提供了完整的Redis操作封装，包括连接管理、缓存操作、哈希操作、列表操作等功能。

## 配置

Redis配置文件位于 `app/config/redis.json`：

```json
{
    "port": 13669,
    "password": "aierbude520",
    "host": "202.140.141.49",
    "db": 0,
    "max_connections": 10000,
    "max_reconnect_attempts": 10,
    "connect_timeout": 10000,
    "retry_delay": 100,
    "enable_offline_queue": false,
    "keep_alive": true
}
```

## 基本使用

### 1. 全局挂载（推荐）

Redis已在 `main.js` 中自动挂载到全局对象，可以直接使用：

```javascript
// 缓存操作（全局函数）
await global.setCache('key', value, 3600);
const data = await global.getCache('key');
const exists = await global.existsCache('key');

// 高级功能（通过RedisUtils）
await global.RedisUtils.expireCache('key', 1800);
const ttl = await global.RedisUtils.getCacheTTL('key');

// 哈希操作
await global.RedisHash.set('user:1', 'name', '张三');
const name = await global.RedisHash.get('user:1', 'name');

// 列表操作
await global.RedisList.pushRight('queue', { id: 1, data: 'test' });
const item = await global.RedisList.popLeft('queue');
```

### 2. 手动导入

如果需要在其他模块中直接导入：

```javascript
import { initRedis, getOrSetCache } from './app/imp/Redis.js';

// 在应用启动时初始化
await initRedis();
```

### 2. 基本缓存操作

```javascript
import { setCache, getCache, deleteCache, existsCache } from './app/imp/Redis.js';

// 设置缓存
await setCache('user:1', { name: '张三', age: 25 }, 3600); // 1小时过期

// 获取缓存
const user = await getCache('user:1');

// 检查是否存在
const exists = await existsCache('user:1');

// 删除缓存
await deleteCache('user:1');
```

### 3. 缓存穿透保护

```javascript
import { getOrSetCache } from './app/imp/Redis.js';

// 第一次会执行fetchFunction，之后从缓存获取
const userInfo = await getOrSetCache(
    'user:info:123',
    1800, // 30分钟
    async () => {
        // 数据库查询逻辑
        return await database.query('SELECT * FROM users WHERE id = ?', [123]);
    }
);
```

## 高级功能

### Redis哈希操作

```javascript
import { RedisHash } from './app/imp/Redis.js';

// 设置字段
await RedisHash.set('profile:1', 'name', '李四');
await RedisHash.set('profile:1', 'age', 30);

// 获取字段
const name = await RedisHash.get('profile:1', 'name');

// 获取整个哈希
const profile = await RedisHash.getAll('profile:1');

// 删除字段
await RedisHash.delete('profile:1', 'age');
```

### Redis列表操作

```javascript
import { RedisList } from './app/imp/Redis.js';

// 添加到队列
await RedisList.pushRight('queue:messages', { text: 'Hello', id: 1 });

// 从队列取出
const message = await RedisList.popLeft('queue:messages');

// 获取队列长度
const length = await RedisList.length('queue:messages');

// 获取队列范围内的元素
const messages = await RedisList.range('queue:messages', 0, -1);
```

## 实际应用场景

### 用户服务示例（使用全局挂载）

```javascript
class UserService {
    constructor() {
        this.CACHE_TTL = {
            USER_INFO: 3600,    // 1小时
            USER_LIST: 1800,    // 30分钟
            USER_STATS: 300      // 5分钟
        };
    }
    
    async getUserInfo(userId) {
        return await global.getOrSetCache(
            `user:info:${userId}`,
            this.CACHE_TTL.USER_INFO,
            async () => await this.queryUserFromDatabase(userId)
        );
    }
    
    async getUserPreferences(userId) {
        return await global.RedisHash.getAll(`user:preferences:${userId}`);
    }
    
    async setUserPreferences(userId, preferences) {
        for (const [key, value] of Object.entries(preferences)) {
            await global.RedisHash.set(`user:preferences:${userId}`, key, value);
        }
    }
    
    async updateUserInfo(userId, userData) {
        // 更新数据库
        await this.updateUserInDatabase(userId, userData);
        
        // 清除相关缓存
        await global.RedisUtils.deleteCache([
            `user:info:${userId}`,
            'user:list:1:10',
            'user:list:1:20'
        ]);
    }
    
    async logUserActivity(userId, activity) {
        await global.RedisList.pushRight('user:activity:queue', {
            userId,
            activity,
            timestamp: Date.now()
        });
    }
}
```

### 消息队列示例

```javascript
class MessageQueue {
    async addMessage(message) {
        await RedisList.pushRight('messages:queue', {
            ...message,
            timestamp: Date.now()
        });
    }
    
    async processMessages() {
        const message = await RedisList.popLeft('messages:queue');
        if (message) {
            await this.handleMessage(message);
        }
    }
}
```

## API参考

### 缓存操作

- `setCache(key, value, ttlSeconds)` - 设置缓存
- `getCache(key)` - 获取缓存
- `deleteCache(keys)` - 删除缓存（支持数组）
- `existsCache(key)` - 检查缓存是否存在
- `expireCache(key, ttlSeconds)` - 设置过期时间
- `getCacheTTL(key)` - 获取剩余过期时间
- `flushDatabase()` - 清空当前数据库

### getOrSetCache

```javascript
const result = await getOrSetCache(
    'cache_key',           // 缓存键
    3600,                 // 过期时间（秒）
    async () => {         // 数据获取函数
        return await fetchFromDatabase();
    }
);
```

### RedisHash方法

- `RedisHash.set(key, field, value)` - 设置字段
- `RedisHash.get(key, field)` - 获取字段
- `RedisHash.getAll(key)` - 获取整个哈希
- `RedisHash.delete(key, fields)` - 删除字段
- `RedisHash.exists(key, field)` - 检查字段是否存在

### RedisList方法

- `RedisList.pushLeft(key, ...values)` - 左侧推入
- `RedisList.pushRight(key, ...values)` - 右侧推入
- `RedisList.popLeft(key)` - 左侧弹出
- `RedisList.popRight(key)` - 右侧弹出
- `RedisList.length(key)` - 获取长度
- `RedisList.range(key, start, end)` - 获取范围

## 运行示例

```bash
# 运行模块导入示例
node examples/redis-usage.js

# 运行全局挂载示例
node examples/global-redis-usage.js
```

示例包含：
- 基本缓存操作
- 哈希操作
- 列表操作
- Web应用实际使用场景
- 消息队列处理
- 全局挂载使用示例

## 全局挂载说明

Redis已在 `main.js` 中自动挂载到以下全局对象：

### 全局函数
- `global.setCache(key, value, ttl)` - 设置缓存
- `global.getCache(key)` - 获取缓存
- `global.getOrSetCache(key, ttl, fn)` - 缓存穿透保护
- `global.deleteCache(keys)` - 删除缓存
- `global.existsCache(key)` - 检查缓存存在
- `global.RedisHash` - 哈希操作类
- `global.RedisList` - 列表操作类

### RedisUtils对象
- `global.RedisUtils.initRedis()` - 初始化Redis
- `global.RedisUtils.getRedis()` - 获取Redis实例
- `global.RedisUtils.expireCache(key, ttl)` - 设置过期时间
- `global.RedisUtils.getCacheTTL(key)` - 获取TTL
- `global.RedisUtils.flushDatabase()` - 清空数据库
- `global.RedisUtils.RedisHash` - 哈希操作类
- `global.RedisUtils.RedisList` - 列表操作类

## 最佳实践

1. **缓存键命名**：使用冒号分隔的层次结构，如 `user:info:123`
2. **过期时间**：根据数据更新频率设置合理的TTL
3. **错误处理**：所有Redis操作都包含错误处理，失败时会降级到原始逻辑
4. **缓存更新**：数据更新时及时清除相关缓存
5. **连接管理**：使用单例模式管理Redis连接，支持自动重连

## 注意事项

- 确保Redis服务器正常运行
- 所有值都会自动JSON序列化/反序列化
- 缓存失败时不会阻断业务逻辑
- 支持环境变量配置：`REDIS_URL`