import crypto from 'crypto';

/**
 * 不可逆哈希加密函数集合
 * 支持多种算法，适用于密码存储、数据完整性验证等场景
 */
export default class Hash {

    /**
     * SHA-256 哈希加密
     * @param {string} data - 要加密的数据
     * @param {string} salt - 盐值（可选），增加安全性
     * @returns {string} 哈希值
     */
    static sha256(data, salt = '') {
        if (!data) throw new Error('数据不能为空');

        const saltedData = salt ? data + salt : data;
        return crypto.createHash('sha256')
            .update(saltedData)
            .digest('hex');
    }

    /**
     * SHA-512 哈希加密（更安全，但计算量更大）
     * @param {string} data - 要加密的数据
     * @param {string} salt - 盐值（可选）
     * @returns {string} 哈希值
     */
    static sha512(data, salt = '') {
        if (!data) throw new Error('数据不能为空');

        const saltedData = salt ? data + salt : data;
        return crypto.createHash('sha512')
            .update(saltedData)
            .digest('hex');
    }

    /**
     * Bcrypt 风格的密码哈希（推荐的密码存储方式）
     * @param {string} password - 密码
     * @param {number} rounds - 轮数（默认10，越大越安全但越慢）
     * @returns {Promise<string>} 哈希后的密码
     */
    static async bcryptStyle(password, rounds = 10) {
        if (!password) throw new Error('密码不能为空');

        // 使用PBKDF2模拟bcrypt的行为
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(
            password,
            salt,
            rounds * 1000, // 轮数*1000次迭代
            64,
            'sha512'
        ).toString('hex');

        // 返回格式：算法$轮数$盐值$哈希值
        return `pbkdf2$${rounds}$${salt}$${hash}`;
    }

    /**
     * 验证Bcrypt风格的密码
     * @param {string} password - 原始密码
     * @param {string} hash - 存储的哈希值
     * @returns {Promise<boolean>} 是否匹配
     */
    static async verifyBcryptStyle(password, hash) {
        if (!password || !hash) return false;

        try {
            const parts = hash.split('$');
            if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;

            const rounds = parseInt(parts[1]);
            const salt = parts[2];
            const storedHash = parts[3];

            const computedHash = crypto.pbkdf2Sync(
                password,
                salt,
                rounds * 1000,
                64,
                'sha512'
            ).toString('hex');

            return computedHash === storedHash;
        } catch (error) {
            return false;
        }
    }

    /**
     * 快速哈希（适用于大量数据，但安全性较低）
     * @param {string} data - 数据
     * @returns {string} 哈希值
     */
    static md5(data) {
        if (!data) throw new Error('数据不能为空');

        return crypto.createHash('md5')
            .update(data)
            .digest('hex');
    }

    /**
     * HMAC-SHA256 带密钥的哈希
     * @param {string} data - 数据
     * @param {string} secret - 密钥
     * @returns {string} 哈希值
     */
    static hmacSha256(data, secret) {
        if (!data || !secret) throw new Error('数据和密钥不能为空');

        return crypto.createHmac('sha256', secret)
            .update(data)
            .digest('hex');
    }

    /**
     * 生成随机盐值
     * @param {number} length - 盐值长度（默认16字节）
     * @returns {string} 随机盐值
     */
    static generateSalt(length = 16) {
        return crypto.randomBytes(length).toString('hex');
    }

    /**
     * 文件哈希计算（用于文件完整性验证）
     * @param {Buffer} fileBuffer - 文件缓冲区
     * @param {string} algorithm - 算法（默认sha256）
     * @returns {string} 文件哈希值
     */
    static fileHash(fileBuffer, algorithm = 'sha256') {
        if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
            throw new Error('无效的文件缓冲区');
        }

        return crypto.createHash(algorithm)
            .update(fileBuffer)
            .digest('hex');
    }

    /**
     * 时间戳哈希（用于生成唯一令牌）
     * @param {string} prefix - 前缀（可选）
     * @returns {string} 基于时间的哈希
     */
    static timestampHash(prefix = '') {
        const timestamp = Date.now().toString();
        const random = crypto.randomBytes(8).toString('hex');

        return this.sha256(prefix + timestamp + random);
    }

    /**
     * 批量哈希计算
     * @param {Array<string>} dataArray - 数据数组
     * @param {string} algorithm - 算法
     * @returns {Array<string>} 哈希数组
     */
    static batchHash(dataArray, algorithm = 'sha256') {
        if (!Array.isArray(dataArray)) {
            throw new Error('数据必须是数组');
        }

        return dataArray.map(data => {
            return crypto.createHash(algorithm)
                .update(data)
                .digest('hex');
        });
    }

    /**
     * 哈希强度测试
     * @param {string} data - 测试数据
     * @param {number} iterations - 迭代次数（默认1000）
     */
    static performanceTest(data = 'test', iterations = 1000) {
        console.time('哈希性能测试');

        for (let i = 0; i < iterations; i++) {
            this.sha256(data + i);
        }

        console.timeEnd('哈希性能测试');
        console.log(`完成 ${iterations} 次SHA-256哈希计算`);
    }
}

// 使用示例
/*
// 基本使用
const hash1 = Hash.sha256('hello world');
const hash2 = Hash.sha256('hello world', 'salt123');

// 密码存储（推荐）
const password = 'user123';
Hash.bcryptStyle(password).then(hash => {
    console.log('密码哈希:', hash);
    
    // 验证密码
    Hash.verifyBcryptStyle('user123', hash).then(isValid => {
        console.log('密码验证:', isValid);
    });
});

// 文件完整性验证
const fileBuffer = fs.readFileSync('file.txt');
const fileHash = Hash.fileHash(fileBuffer);

// 生成唯一令牌
const token = Hash.timestampHash('user_');
*/

// 导出常用函数作为快捷方式
