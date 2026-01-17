import { initRedis, getOrSetCache, setCache, getCache, deleteCache, existsCache, expireCache, getCacheTTL, flushDatabase, RedisHash, RedisList } from '../app/imp/Redis.js';

/**
 * Redis使用示例
 */

async function redisExamples() {
    console.log('=== Redis使用示例 ===');
    
    try {
        // 1. 初始化Redis连接
        console.log('1. 初始化Redis连接...');
        await initRedis();
        console.log('✅ Redis连接成功\n');

        // 2. 基本缓存操作示例
        console.log('2. 基本缓存操作示例...');
        
        // 设置缓存
        await setCache('user:1', { id: 1, name: '张三', email: 'zhangsan@example.com' }, 3600);
        console.log('✅ 设置用户缓存');
        
        // 获取缓存
        const user = await getCache('user:1');
        console.log('✅ 获取用户缓存:', user);
        
        // 检查缓存是否存在
        const exists = await existsCache('user:1');
        console.log('✅ 缓存是否存在:', exists);
        
        // 获取缓存TTL
        const ttl = await getCacheTTL('user:1');
        console.log('✅ 缓存剩余时间:', ttl, '秒\n');

        // 3. getOrSetCache示例 - 缓存穿透保护
        console.log('3. getOrSetCache示例...');
        
        // 模拟数据库查询函数
        async function fetchUserFromDB(userId) {
            console.log(`📊 从数据库查询用户 ${userId}...`);
            // 模拟数据库查询延迟
            await new Promise(resolve => setTimeout(resolve, 100));
            return { id: userId, name: `用户${userId}`, createdAt: new Date() };
        }
        
        // 第一次调用 - 会执行fetch函数
        console.log('第一次获取用户数据:');
        const user1 = await getOrSetCache('user:100', 1800, () => fetchUserFromDB(100));
        console.log('结果:', user1);
        
        // 第二次调用 - 从缓存获取
        console.log('第二次获取用户数据:');
        const user2 = await getOrSetCache('user:100', 1800, () => fetchUserFromDB(100));
        console.log('结果:', user2, '(来自缓存)\n');

        // 4. Redis哈希操作示例
        console.log('4. Redis哈希操作示例...');
        
        // 设置用户资料哈希
        await RedisHash.set('profile:1', 'name', '李四');
        await RedisHash.set('profile:1', 'age', 25);
        await RedisHash.set('profile:1', 'skills', ['JavaScript', 'Node.js', 'Redis']);
        console.log('✅ 设置用户资料哈希');
        
        // 获取单个字段
        const name = await RedisHash.get('profile:1', 'name');
        console.log('✅ 获取姓名:', name);
        
        // 获取整个哈希
        const profile = await RedisHash.getAll('profile:1');
        console.log('✅ 获取完整资料:', profile);
        
        // 检查字段是否存在
        const hasAge = await RedisHash.exists('profile:1', 'age');
        console.log('✅ 是否有年龄字段:', hasAge);
        
        // 删除字段
        await RedisHash.delete('profile:1', 'age');
        console.log('✅ 删除年龄字段\n');

        // 5. Redis列表操作示例
        console.log('5. Redis列表操作示例...');
        
        // 添加消息到队列
        await RedisList.pushRight('messages:queue', { id: 1, text: 'Hello Redis!', timestamp: Date.now() });
        await RedisList.pushRight('messages:queue', { id: 2, text: 'Redis很棒!', timestamp: Date.now() });
        await RedisList.pushLeft('messages:queue', { id: 3, text: '队列开始', timestamp: Date.now() });
        console.log('✅ 添加消息到队列');
        
        // 获取队列长度
        const queueLength = await RedisList.length('messages:queue');
        console.log('✅ 队列长度:', queueLength);
        
        // 获取所有消息
        const allMessages = await RedisList.range('messages:queue');
        console.log('✅ 所有消息:', allMessages);
        
        // 处理消息（从左侧弹出）
        const message = await RedisList.popLeft('messages:queue');
        console.log('✅ 处理消息:', message);
        
        console.log('✅ 剩余消息数量:', await RedisList.length('messages:queue'), '\n');

        // 6. 缓存管理示例
        console.log('6. 缓存管理示例...');
        
        // 批量删除缓存
        const deletedCount = await deleteCache(['user:1', 'user:100']);
        console.log('✅ 删除缓存数量:', deletedCount);
        
        // 设置新的过期时间
        await setCache('temp:data', { value: '临时数据' }, 60);
        await expireCache('temp:data', 300); // 改为5分钟
        console.log('✅ 修改缓存过期时间为5分钟');
        
        console.log('🎉 所有示例执行完成!');
        
    } catch (error) {
        console.error('❌ Redis示例执行失败:', error);
    }
}

/**
 * Web应用中的实际使用场景示例
 */
class UserService {
    constructor() {
        this.CACHE_TTL = {
            USER_INFO: 3600,        // 用户信息缓存1小时
            USER_LIST: 1800,        // 用户列表缓存30分钟
            USER_STATS: 300         // 用户统计缓存5分钟
        };
    }

    /**
     * 获取用户信息（带缓存）
     */
    async getUserInfo(userId) {
        const cacheKey = `user:info:${userId}`;
        
        return await getOrSetCache(
            cacheKey,
            this.CACHE_TTL.USER_INFO,
            async () => {
                // 这里是实际的数据库查询
                console.log(`📊 从数据库查询用户 ${userId} 信息`);
                return await this.queryUserFromDatabase(userId);
            }
        );
    }

    /**
     * 获取用户列表（带分页和缓存）
     */
    async getUserList(page = 1, limit = 10) {
        const cacheKey = `user:list:${page}:${limit}`;
        
        return await getOrSetCache(
            cacheKey,
            this.CACHE_TTL.USER_LIST,
            async () => {
                console.log(`📊 从数据库查询用户列表 第${page}页`);
                return await this.queryUserListFromDatabase(page, limit);
            }
        );
    }

    /**
     * 更新用户信息并清除相关缓存
     */
    async updateUserInfo(userId, userData) {
        try {
            // 更新数据库
            await this.updateUserInDatabase(userId, userData);
            
            // 清除相关缓存
            await deleteCache([
                `user:info:${userId}`,
                'user:list:1:10',  // 清除第一页缓存
                'user:list:1:20',  // 清除可能的列表页缓存
                'user:stats:*'     // 如果支持通配符删除
            ]);
            
            console.log(`✅ 用户 ${userId} 信息更新成功，相关缓存已清除`);
            return true;
        } catch (error) {
            console.error(`❌ 更新用户 ${userId} 信息失败:`, error);
            return false;
        }
    }

    /**
     * 使用哈希存储用户偏好设置
     */
    async setUserPreferences(userId, preferences) {
        const hashKey = `user:preferences:${userId}`;
        
        for (const [key, value] of Object.entries(preferences)) {
            await RedisHash.set(hashKey, key, value);
        }
        
        // 设置整个哈希的过期时间
        await expireCache(hashKey, 86400); // 24小时
        console.log(`✅ 用户 ${userId} 偏好设置已保存`);
    }

    /**
     * 获取用户偏好设置
     */
    async getUserPreferences(userId) {
        const hashKey = `user:preferences:${userId}`;
        return await RedisHash.getAll(hashKey);
    }

    // 模拟数据库方法（实际项目中替换为真实数据库操作）
    async queryUserFromDatabase(userId) {
        await new Promise(resolve => setTimeout(resolve, 50));
        return {
            id: userId,
            name: `用户${userId}`,
            email: `user${userId}@example.com`,
            avatar: `https://avatar.example.com/${userId}.jpg`,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    async queryUserListFromDatabase(page, limit) {
        await new Promise(resolve => setTimeout(resolve, 100));
        const users = [];
        const startId = (page - 1) * limit + 1;
        
        for (let i = 0; i < limit; i++) {
            users.push({
                id: startId + i,
                name: `用户${startId + i}`,
                email: `user${startId + i}@example.com`
            });
        }
        
        return {
            users,
            page,
            limit,
            total: 1000,
            totalPages: Math.ceil(1000 / limit)
        };
    }

    async updateUserInDatabase(userId, userData) {
        await new Promise(resolve => setTimeout(resolve, 30));
        console.log(`📊 数据库更新用户 ${userId}:`, userData);
    }

    async updateUserStatsInDatabase(userId, stats) {
        await new Promise(resolve => setTimeout(resolve, 20));
        console.log(`📊 数据库更新用户统计 ${userId}:`, stats);
    }
}

/**
 * 消息队列处理示例
 */
class MessageQueue {
    constructor() {
        this.QUEUE_NAME = 'messages:processing';
    }

    /**
     * 添加消息到队列
     */
    async addMessage(message) {
        const messageWithId = {
            ...message,
            id: Date.now() + Math.random(),
            timestamp: new Date().toISOString()
        };
        
        await RedisList.pushRight(this.QUEUE_NAME, messageWithId);
        console.log('✅ 消息已添加到队列:', messageWithId.id);
        return messageWithId.id;
    }

    /**
     * 处理消息队列
     */
    async processMessages() {
        while (true) {
            try {
                const message = await RedisList.popLeft(this.QUEUE_NAME);
                
                if (!message) {
                    // 队列为空，等待一段时间
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                
                console.log('🔄 处理消息:', message.id);
                await this.handleMessage(message);
                console.log('✅ 消息处理完成:', message.id);
                
            } catch (error) {
                console.error('❌ 处理消息失败:', error);
                // 可以选择将失败的消息重新加入队列或记录到错误队列
            }
        }
    }

    /**
     * 处理单个消息
     */
    async handleMessage(message) {
        // 模拟消息处理逻辑
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        
        switch (message.type) {
            case 'email':
                console.log('📧 发送邮件:', message.to);
                break;
            case 'sms':
                console.log('📱 发送短信:', message.phone);
                break;
            case 'notification':
                console.log('🔔 发送通知:', message.userId);
                break;
            default:
                console.log('📨 未知消息类型:', message.type);
        }
    }

    /**
     * 获取队列状态
     */
    async getQueueStatus() {
        const length = await RedisList.length(this.QUEUE_NAME);
        return {
            queueName: this.QUEUE_NAME,
            pendingMessages: length,
            timestamp: new Date()
        };
    }
}

// 运行示例
async function runExamples() {
    console.log('🚀 开始运行Redis示例...\n');
    
    // 运行基础示例
    await redisExamples();
    
    console.log('\n' + '='.repeat(50));
    console.log('📱 Web应用使用示例\n');
    
    // 运行Web应用示例
    const userService = new UserService();
    
    // 用户服务示例
    console.log('👤 用户服务示例:');
    const user = await userService.getUserInfo(1);
    console.log('用户信息:', user);
    
    const userList = await userService.getUserList(1, 5);
    console.log('用户列表:', userList);
    
    await userService.setUserPreferences(1, {
        theme: 'dark',
        language: 'zh-CN',
        notifications: true
    });
    
    const preferences = await userService.getUserPreferences(1);
    console.log('用户偏好:', preferences);
    
    console.log('\n📨 消息队列示例:');
    const messageQueue = new MessageQueue();
    
    // 添加一些测试消息
    await messageQueue.addMessage({ type: 'email', to: 'user@example.com', subject: '测试邮件' });
    await messageQueue.addMessage({ type: 'sms', phone: '13800138000', content: '测试短信' });
    await messageQueue.addMessage({ type: 'notification', userId: 1, message: '您有新的消息' });
    
    const status = await messageQueue.getQueueStatus();
    console.log('队列状态:', status);
    
    // 处理几个消息作为示例
    console.log('\n开始处理消息队列...');
    for (let i = 0; i < 3; i++) {
        const message = await RedisList.popLeft('messages:processing');
        if (message) {
            await messageQueue.handleMessage(message);
        }
    }
    
    console.log('\n🎉 所有示例运行完成!');
}

// 如果直接运行此文件，执行示例
if (import.meta.url === `file://${process.argv[1]}`) {
    runExamples().catch(console.error);
}

export { UserService, MessageQueue };