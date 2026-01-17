import { createHash, createCipheriv, createDecipheriv } from 'crypto';

class Auth {
    // 使用SHA256算法对code进行哈希处理，生成key
    GenerateToken(info, code, time = 7) {
        const key = createHash('sha256').update(code).digest(); // 或直接 Buffer.from(...)

        // 16 字节初始向量（IV）
        const iv = Buffer.from('0fc9c0ceafe1d5d1d8bb3ef73629bddd', 'hex');
        // 创建AES-256-CBC加密算法实例
        function encrypt(text) {
            // 对text进行加密，编码为base64
            const cipher = createCipheriv('aes-256-cbc', key, iv);
            // 结束加密，编码为base64
            let encrypted = cipher.update(text, 'utf8', 'base64');
            // 返回加密后的结果，包括IV和加密数据
            encrypted += cipher.final('base64');
            return encrypted;
            // 设置info的endtime为当前时间加上time参数指定的天数
        }
        // 将info转换为JSON字符串
        info.endtime = Date.now() + 1000 * time;
        // 返回加密后的结果
        info = JSON.stringify(info);
        return encrypt(info);
    }

    VerifyAuthCode(token, key) {
        if (!token || typeof token !== 'string') {
            return {
                code: 401,
                msg: '无效token'
            };
        }
        
        if (!key || typeof key !== 'string') {
            return {
                code: 401,
                msg: '无效密钥'
            };
        }
        
        try {
            // 生成相同的密钥
            const keys = createHash('sha256').update(key).digest();
            const iv = Buffer.from('0fc9c0ceafe1d5d1d8bb3ef73629bddd', 'hex');
            
            // 解密函数
            function decrypt(encryptedData, decryptKey) {
                const decipher = createDecipheriv('aes-256-cbc', decryptKey, iv);
                let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
                decrypted += decipher.final('utf8');
                return decrypted;
            }
            
            // 解密并解析JSON
            const decryptedInfo = decrypt(token, keys);
            const info = JSON.parse(decryptedInfo);
            
            // 检查有效期
            if (!info.endtime || typeof info.endtime !== 'number') {
                return {
                    code: 401,
                    msg: 'token格式错误'
                };
            }
            
            if (info.endtime < Date.now()) {
                return {
                    code: 401,
                    msg: 'token已过期'
                };
            }
            
            // 返回用户信息
            return {
                code: 200,
                msg: '验证成功',
                data: info
            };
            
        } catch (error) {
            console.error('Token解密失败:', error.message);
            
            if (error.message.includes('bad decrypt')) {
                return {
                    code: 401,
                    msg: 'token无效或密钥错误'
                };
            }
            
            if (error.message.includes('Unexpected token')) {
                return {
                    code: 401,
                    msg: 'token格式错误'
                };
            }
            
            return {
                code: 500,
                msg: '服务器内部错误'
            };
        }
    }
}

export default Auth;