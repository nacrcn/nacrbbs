import nodemailer from 'nodemailer';

class EmailService {
    constructor() {
        this.transporters = new Map(); // 缓存多个transporter实例
        this.configCache = null;
        this.configCacheTime = 0;
        this.CACHE_TTL = 30000; // 配置缓存30秒
    }

    /**
     * 从数据库实时获取邮件配置
     * @returns {Promise<Object>} 邮件配置
     */
    async getLatestConfig() {
        try {
            const now = Date.now();
            
            // 如果缓存未过期，直接返回缓存
            if (this.configCache && (now - this.configCacheTime) < this.CACHE_TTL) {
                return this.configCache;
            }
            
            // 从数据库获取最新配置
            const config = await global.db.query('SELECT * FROM n_configuration');
            const emailConfig = config[0] || {};
            
            // 构建邮件配置
            const mailConfig = {
                host: emailConfig.n_email_host || 'smtp.qq.com',
                port: parseInt(emailConfig.n_email_port) || 587,
                secure: emailConfig.n_email_secure === 'true' || false,
                auth: {
                    user: emailConfig.n_email_user || '',
                    pass: emailConfig.n_email_pass || ''
                },
                from: emailConfig.n_email_user
            };
            
            // 系统配置
            const systemConfig = {
                n_web_copyright: emailConfig.n_web_copyright,
                n_contact_email: emailConfig.n_contact_email
            };
            
            // 更新缓存
            this.configCache = { mailConfig, systemConfig };
            this.configCacheTime = now;
            
            console.log('📧 从数据库获取最新邮件配置');
            return this.configCache;
            
        } catch (error) {
            console.error('❌ 获取邮件配置失败:', error);
            // 返回默认配置或缓存配置
            return this.configCache || { 
                mailConfig: {}, 
                systemConfig: {} 
            };
        }
    }

    /**
     * 获取或创建邮件传输器
     * @returns {Promise<Object>} transporter实例
     */
    async getTransporter() {
        const { mailConfig } = await this.getLatestConfig();
        
        // 配置验证
        if (!mailConfig.host || !mailConfig.port || !mailConfig.auth.user || !mailConfig.auth.pass) {
            throw new Error('邮件配置不完整，请检查数据库配置');
        }
        
        // 创建配置键用于缓存
        const configKey = `${mailConfig.host}:${mailConfig.port}:${mailConfig.auth.user}`;
        
        // 如果已存在且配置未变化，直接返回
        if (this.transporters.has(configKey)) {
            return this.transporters.get(configKey);
        }
        
        console.log('🔄 创建新的邮件传输器:', configKey);
        
        // 创建新的transporter
        const transporter = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: mailConfig.secure || false,
            auth: {
                user: mailConfig.auth.user,
                pass: mailConfig.auth.pass
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        // 验证连接
        await transporter.verify();
        
        // 缓存transporter（最多缓存5个）
        if (this.transporters.size >= 5) {
            const firstKey = this.transporters.keys().next().value;
            this.transporters.delete(firstKey);
        }
        
        this.transporters.set(configKey, transporter);
        return transporter;
    }

    /**
     * 清除配置缓存
     */
    clearConfigCache() {
        this.configCache = null;
        this.configCacheTime = 0;
        console.log('🗑️ 邮件配置缓存已清除');
    }

    /**
     * 清除所有传输器
     */
    async clearTransporters() {
        for (const [key, transporter] of this.transporters) {
            try {
                transporter.close();
                console.log(`🔌 已关闭传输器: ${key}`);
            } catch (error) {
                console.error(`关闭传输器失败 ${key}:`, error.message);
            }
        }
        this.transporters.clear();
        console.log('🗑️ 所有邮件传输器已清除');
    }
    /**
     * 发送模板邮件
     * @param {Object} options 邮件选项
     * @param {string|Array} options.to 收件人
     * @param {string} options.subject 邮件主题
     * @param {string} options.template 模板文件id
     * @param {Object} options.data 模板数据
     * @param {Array} options.attachments 附件
     */
    async sendTemplate(options) {
        try {
            // 参数验证
            if (!options || !options.template) {
                return {
                    success: false,
                    error: '邮件模板ID不能为空'
                };
            }

            if (!options.to) {
                return {
                    success: false,
                    error: '收件人不能为空'
                };
            }

            // 获取最新配置和传输器
            const { mailConfig, systemConfig } = await this.getLatestConfig();
            const transporter = await this.getTransporter();

            // 读取模板文件
            const emailtep = await global.db.query('SELECT * FROM n_email_template where n_code = ?', [
                options.template
            ]);
            if (emailtep.length === 0) {
                return {
                    success: false,
                    error: '邮件模板不存在'
                };
            }

            const templateContent = emailtep[0].n_html;
            
            // 检查模板内容是否存在
            if (!templateContent) {
                return {
                    success: false,
                    error: '邮件模板内容为空'
                };
            }

            // 替换模板变量
            let htmlContent = templateContent;

            // 初始化数据对象
            options.data = options.data || {};

            /* 填充固定值 */
            options.data.current_year = systemConfig?.n_web_copyright || new Date().getFullYear();
            options.data.support_email = systemConfig?.n_contact_email || 'support@example.com';
            
            // 确保所有值都是字符串
            const safeData = {};
            Object.keys(options.data).forEach(key => {
                if (options.data[key] !== null && options.data[key] !== undefined) {
                    safeData[key] = String(options.data[key]);
                } else {
                    safeData[key] = '';
                }
            });
            
            // 替换模板变量
            Object.keys(safeData).forEach(key => {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                htmlContent = htmlContent.replace(regex, safeData[key]);
            });

            // 最终HTML内容验证
            if (!htmlContent) {
                return {
                    success: false,
                    error: '邮件内容处理失败，结果为空'
                };
            }

            const mailOptions = {
                from: mailConfig.from || mailConfig.auth.user,
                to: options.to,
                subject: options.subject || '无主题',
                html: htmlContent,
                attachments: options.attachments || []
            };

            console.log('📧 发送模板邮件:', options.template, '收件人:', options.to);
            const result = await transporter.sendMail(mailOptions);
            console.log('✅ 模板邮件发送成功:', result.messageId);
            return {
                success: true,
                messageId: result.messageId,
                response: result.response
            };
        } catch (error) {
            console.error('❌ 模板邮件发送失败:', error);
            console.error('错误详情:', {
                template: options?.template,
                to: options?.to,
                subject: options?.subject,
                hasData: !!options?.data,
                timestamp: new Date().toISOString()
            });
            
            // 清除缓存以便下次重新获取配置
            this.clearConfigCache();
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * 发送简单HTML邮件
     * @param {Object} options 邮件选项
     * @param {string|Array} options.to 收件人
     * @param {string} options.subject 邮件主题
     * @param {string} options.html HTML内容
     * @param {string} options.text 纯文本内容（可选）
     * @param {Array} options.attachments 附件（可选）
     */
    async sendHTML(options) {
        try {
            if (!options || !options.to || !options.html) {
                return {
                    success: false,
                    error: '收件人和HTML内容不能为空'
                };
            }

            // 获取最新配置和传输器
            const { mailConfig } = await this.getLatestConfig();
            const transporter = await this.getTransporter();

            const mailOptions = {
                from: mailConfig.from || mailConfig.auth.user,
                to: options.to,
                subject: options.subject || '无主题',
                html: options.html,
                text: options.text,
                attachments: options.attachments || []
            };

            const result = await transporter.sendMail(mailOptions);
            console.log('✅ HTML邮件发送成功:', result.messageId);
            return {
                success: true,
                messageId: result.messageId,
                response: result.response
            };
        } catch (error) {
            console.error('❌ HTML邮件发送失败:', error);
            
            // 清除缓存以便下次重新获取配置
            this.clearConfigCache();
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * 发送纯文本邮件
     * @param {Object} options 邮件选项
     * @param {string|Array} options.to 收件人
     * @param {string} options.subject 邮件主题
     * @param {string} options.text 纯文本内容
     * @param {Array} options.attachments 附件（可选）
     */
    async sendText(options) {
        try {
            if (!options || !options.to || !options.text) {
                return {
                    success: false,
                    error: '收件人和文本内容不能为空'
                };
            }

            // 获取最新配置和传输器
            const { mailConfig } = await this.getLatestConfig();
            const transporter = await this.getTransporter();

            const mailOptions = {
                from: mailConfig.from || mailConfig.auth.user,
                to: options.to,
                subject: options.subject || '无主题',
                text: options.text,
                attachments: options.attachments || []
            };

            const result = await transporter.sendMail(mailOptions);
            console.log('✅ 文本邮件发送成功:', result.messageId);
            return {
                success: true,
                messageId: result.messageId,
                response: result.response
            };
        } catch (error) {
            console.error('❌ 文本邮件发送失败:', error);
            
            // 清除缓存以便下次重新获取配置
            this.clearConfigCache();
            
            return {
                success: false,
                error: error.message
            };
        }
    }



    /**
     * 获取当前配置信息（隐藏敏感信息）
     * @returns {Object} 配置信息
     */
    async getConfigInfo() {
        try {
            const { mailConfig } = await this.getLatestConfig();
            return {
                host: mailConfig?.host,
                port: mailConfig?.port,
                secure: mailConfig?.secure,
                user: mailConfig?.auth?.user,
                from: mailConfig?.from,
                isConfigured: !!(mailConfig.host && mailConfig.auth?.user),
                hasTransporter: this.transporters.size > 0,
                cachedTransporters: this.transporters.size,
                configCacheAge: this.configCacheTime ? Date.now() - this.configCacheTime : 0,
                realtimeConfig: true
            };
        } catch (error) {
            return {
                error: error.message,
                isConfigured: false,
                realtimeConfig: false
            };
        }
    }

    /**
     * 关闭邮件服务
     */
    async close() {
        await this.clearTransporters();
        this.clearConfigCache();
        console.log('🔌 邮件服务已关闭');
    }
}

export default EmailService;