/**
 * 全局Redis使用示例
 * 在main.js中Redis已经被挂载到全局对象中
 */

// 示例1: 基本缓存操作
export async function basicCacheExample() {
    console.log('=== 基本缓存操作示例 ===');
    
    try {
        // 设置缓存
        await global.setCache('example:user:1', { 
            id: 1, 
            name: '张三', 
            email: 'zhangsan@example.com',
            createdAt: new Date()
        }, 3600);
        
        console.log('✅ 缓存设置成功');
        
        // 获取缓存
        const user = await global.getCache('example:user:1');
        console.log('✅ 获取缓存:', user);
        
        // 检查缓存是否存在
        const exists = await global.existsCache('example:user:1');
        console.log('✅ 缓存是否存在:', exists);
        
        // 获取缓存TTL
        const ttl = await global.RedisUtils.getCacheTTL('example:user:1');
        console.log('✅ 缓存剩余时间:', ttl, '秒');
        
    } catch (error) {
        console.error('❌ 基本缓存操作失败:', error);
    }
}

// 示例2: getOrSetCache缓存穿透保护
export async function cacheProtectionExample() {
    console.log('\n=== 缓存穿透保护示例 ===');
    
    // 模拟数据库查询函数
    async function fetchUserInfo(userId) {
        console.log(`📊 模拟从数据库查询用户 ${userId}...`);
        // 模拟数据库查询延迟
        await new Promise(resolve => setTimeout(resolve, 200));
        return {
            id: userId,
            name: `用户${userId}`,
            profile: `这是用户${userId}的详细信息`,
            queryTime: new Date().toISOString()
        };
    }
    
    try {
        // 第一次调用 - 会执行fetch函数
        console.log('第一次获取用户信息:');
        const user1 = await global.getOrSetCache(
            'example:userInfo:100', 
            1800, 
            () => fetchUserInfo(100)
        );
        console.log('结果:', user1);
        
        // 第二次调用 - 从缓存获取
        console.log('\n第二次获取用户信息:');
        const user2 = await global.getOrSetCache(
            'example:userInfo:100', 
            1800, 
            () => fetchUserInfo(100)
        );
        console.log('结果:', user2, '(来自缓存)');
        
    } catch (error) {
        console.error('❌ 缓存穿透保护示例失败:', error);
    }
}

// 示例3: Redis哈希操作 - 用户偏好设置
export async function hashExample() {
    console.log('\n=== Redis哈希操作示例 ===');
    
    try {
        const userId = 'user:preferences:123';
        
        // 设置用户偏好设置
        await global.RedisHash.set(userId, 'theme', 'dark');
        await global.RedisHash.set(userId, 'language', 'zh-CN');
        await global.RedisHash.set(userId, 'notifications', true);
        await global.RedisHash.set(userId, 'fontSize', 16);
        
        console.log('✅ 用户偏好设置完成');
        
        // 获取单个偏好设置
        const theme = await global.RedisHash.get(userId, 'theme');
        console.log('✅ 主题设置:', theme);
        
        // 获取所有偏好设置
        const allPreferences = await global.RedisHash.getAll(userId);
        console.log('✅ 所有偏好设置:', allPreferences);
        
        // 检查某个设置是否存在
        const hasNotifications = await global.RedisHash.exists(userId, 'notifications');
        console.log('✅ 是否有通知设置:', hasNotifications);
        
        // 删除某个设置
        await global.RedisHash.delete(userId, 'fontSize');
        console.log('✅ 删除字体大小设置');
        
        const updatedPreferences = await global.RedisHash.getAll(userId);
        console.log('✅ 更新后的偏好设置:', updatedPreferences);
        
    } catch (error) {
        console.error('❌ 哈希操作示例失败:', error);
    }
}

// 示例4: Redis列表操作 - 消息队列
export async function listExample() {
    console.log('\n=== Redis列表操作示例 ===');
    
    try {
        const queueName = 'example:message:queue';
        
        // 清空队列
        await global.RedisUtils.deleteCache(queueName);
        
        // 添加消息到队列
        await global.RedisList.pushRight(queueName, {
            id: 1,
            type: 'email',
            to: 'user1@example.com',
            subject: '欢迎使用系统',
            timestamp: Date.now()
        });
        
        await global.RedisList.pushRight(queueName, {
            id: 2,
            type: 'notification',
            userId: 123,
            message: '您有新的消息',
            timestamp: Date.now()
        });
        
        await global.RedisList.pushLeft(queueName, {
            id: 3,
            type: 'system',
            level: 'info',
            message: '系统启动完成',
            timestamp: Date.now()
        });
        
        console.log('✅ 消息已添加到队列');
        
        // 获取队列长度
        const queueLength = await global.RedisList.length(queueName);
        console.log('✅ 队列长度:', queueLength);
        
        // 查看所有消息
        const allMessages = await global.RedisList.range(queueName);
        console.log('✅ 队列中的所有消息:', allMessages);
        
        // 处理消息（从左侧弹出，FIFO）
        console.log('\n开始处理消息:');
        for (let i = 0; i < 3; i++) {
            const message = await global.RedisList.popLeft(queueName);
            if (message) {
                console.log(`🔄 处理消息 ${message.id}:`, message.type, '-', message.subject || message.message);
            }
        }
        
        console.log('✅ 消息处理完成，剩余消息数:', await global.RedisList.length(queueName));
        
    } catch (error) {
        console.error('❌ 列表操作示例失败:', error);
    }
}

// 示例5: 实际业务场景 - 用户服务
export class UserService {
    constructor() {
        this.CACHE_TTL = {
            USER_INFO: 3600,        // 用户信息缓存1小时
            USER_LIST: 1800,        // 用户列表缓存30分钟
            USER_STATS: 300         // 用户统计缓存5分钟
        };
    }
    
    // 获取用户信息（带缓存）
    async getUserInfo(userId) {
        return await global.getOrSetCache(
            `user:info:${userId}`,
            this.CACHE_TTL.USER_INFO,
            async () => {
                console.log(`📊 从数据库查询用户 ${userId} 信息`);
                // 这里应该是实际的数据库查询
                await new Promise(resolve => setTimeout(resolve, 100));
                return {
                    id: userId,
                    name: `用户${userId}`,
                    email: `user${userId}@example.com`,
                    avatar: `https://avatar.example.com/${userId}.jpg`,
                    createdAt: new Date().toISOString()
                };
            }
        );
    }
    
    // 获取用户偏好设置
    async getUserPreferences(userId) {
        return await global.RedisHash.getAll(`user:preferences:${userId}`);
    }
    
    // 设置用户偏好
    async setUserPreferences(userId, preferences) {
        const hashKey = `user:preferences:${userId}`;
        
        for (const [key, value] of Object.entries(preferences)) {
            await global.RedisHash.set(hashKey, key, value);
        }
        
        // 设置哈希过期时间
        await global.RedisUtils.expireCache(hashKey, 86400); // 24小时
        console.log(`✅ 用户 ${userId} 偏好设置已保存`);
    }
    
    // 更新用户信息并清除缓存
    async updateUserInfo(userId, userData) {
        try {
            // 模拟数据库更新
            console.log(`📊 更新用户 ${userId} 数据库记录`);
            await new Promise(resolve => setTimeout(resolve, 50));
            
            // 清除相关缓存
            await global.RedisUtils.deleteCache([
                `user:info:${userId}`,
                `user:list:1:10`,
                `user:list:1:20`
            ]);
            
            console.log(`✅ 用户 ${userId} 信息更新成功，缓存已清除`);
            return true;
        } catch (error) {
            console.error(`❌ 更新用户 ${userId} 失败:`, error);
            return false;
        }
    }
    
    // 添加到用户活动队列
    async logUserActivity(userId, activity) {
        const logEntry = {
            userId,
            activity,
            timestamp: Date.now(),
            id: Date.now() + Math.random()
        };
        
        await global.RedisList.pushRight('user:activity:queue', logEntry);
        console.log(`✅ 用户活动已记录: ${activity}`);
    }
    
    // 获取用户统计信息（带缓存）
    async getUserStats(userId) {
        return await global.getOrSetCache(
            `user:stats:${userId}`,
            this.CACHE_TTL.USER_STATS,
            async () => {
                console.log(`📊 计算用户 ${userId} 统计信息`);
                // 模拟统计数据计算
                await new Promise(resolve => setTimeout(resolve, 80));
                return {
                    loginCount: Math.floor(Math.random() * 100) + 1,
                    lastLogin: new Date().toISOString(),
                    totalPosts: Math.floor(Math.random() * 50),
                    totalLikes: Math.floor(Math.random() * 200)
                };
            }
        );
    }
}

// 运行业务场景示例
export async function businessExample() {
    console.log('\n=== 业务场景示例 ===');
    
    try {
        const userService = new UserService();
        const userId = 123;
        
        // 获取用户信息
        const userInfo = await userService.getUserInfo(userId);
        console.log('✅ 用户信息:', userInfo);
        
        // 设置用户偏好
        await userService.setUserPreferences(userId, {
            theme: 'light',
            language: 'zh-CN',
            emailNotifications: true,
            autoSave: true
        });
        
        // 获取用户偏好
        const preferences = await userService.getUserPreferences(userId);
        console.log('✅ 用户偏好:', preferences);
        
        // 记录用户活动
        await userService.logUserActivity(userId, '登录系统');
        await userService.logUserActivity(userId, '查看个人资料');
        await userService.logUserActivity(userId, '修改设置');
        
        // 获取用户统计
        const stats = await userService.getUserStats(userId);
        console.log('✅ 用户统计:', stats);
        
        // 更新用户信息
        await userService.updateUserInfo(userId, { 
            name: '新用户名', 
            updatedAt: new Date().toISOString() 
        });
        
        console.log('✅ 业务场景示例完成');
        
    } catch (error) {
        console.error('❌ 业务场景示例失败:', error);
    }
}

// 主函数 - 运行所有示例
export async function runAllExamples() {
    console.log('🚀 开始运行全局Redis使用示例...\n');
    
    // 检查Redis是否可用
    if (!global.redis || !global.RedisUtils) {
        console.error('❌ Redis未正确初始化，请检查main.js中的Redis挂载');
        return;
    }
    
    try {
        await basicCacheExample();
        await cacheProtectionExample();
        await hashExample();
        await listExample();
        await businessExample();
        
        console.log('\n🎉 所有示例运行完成!');
        
        // 清理测试数据
        console.log('\n🧹 清理测试数据...');
        await global.RedisUtils.flushDatabase();
        console.log('✅ 测试数据清理完成');
        
    } catch (error) {
        console.error('❌ 示例运行失败:', error);
    }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllExamples().catch(console.error);
}