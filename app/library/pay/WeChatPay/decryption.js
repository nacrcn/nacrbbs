/* 微信支付加密解密工具 */
import crypto from "crypto"

/* 微信支付回调信息解密函数 */
const decryption = async (resource) => {
    try {
        // 验证必要参数
        if (!resource || !resource.ciphertext || !resource.nonce || !resource.associated_data) {
            throw new Error('解密参数不完整');
        }
        

        /* 获取支付配置信息 */
         const payconfig = await global.db.query('SELECT * FROM n_payconfig where n_code = "WeChatPay"');
        if (payconfig.length === 0) {
            throw new Error('微信支付配置不存在');
        }
        const config = JSON.parse(payconfig[0].n_config);

        // 将配置数组转换为对象格式
        const configObj = {};
        config.forEach(item => {
            configObj[item.key] = item.value;
        });
      
        // 确认加密算法
        if (resource.algorithm !== 'AEAD_AES_256_GCM') {
            throw new Error('不支持的加密算法: ' + resource.algorithm);
        }
        
        // 将API密钥转换为32字节的Buffer
        const keyBuffer = Buffer.from(configObj.callback_key, 'utf8');
        if (keyBuffer.length !== 32) {
            throw new Error('APIv3密钥长度必须为32字节');
        }
        
        // 准备解密参数
        const ciphertext = Buffer.from(resource.ciphertext, 'base64');
        const nonce = Buffer.from(resource.nonce, 'base64');
        const associatedData = Buffer.from(resource.associated_data, 'base64');
        
        // 创建解密器
        const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, nonce);
        decipher.setAAD(associatedData);
        
        // 设置认证标签长度（AES-GCM需要）
        // 微信支付使用的认证标签是密文的最后16字节
        const authTagLength = 16;
        const ciphertextWithTag = ciphertext;
        const authTag = ciphertextWithTag.slice(-authTagLength);
        const actualCiphertext = ciphertextWithTag.slice(0, -authTagLength);
        
        decipher.setAuthTag(authTag);
        
        // 解密
        let decrypted = decipher.update(actualCiphertext);
        decipher.final(); // 验证认证标签
        
        // 将解密后的Buffer转换为字符串
        const decryptedStr = decrypted.toString('utf8');
        
        // 尝试解析为JSON
        try {
            return JSON.parse(decryptedStr);
        } catch (parseError) {
            // 如果解析失败，返回原始字符串
            return decryptedStr;
        }
        
    } catch (error) {
        console.error('解密失败:', error.message);
        throw new Error('回调信息解密失败: ' + error.message);
    }
}



export {
    decryption
}