/**
 * 邮件服务使用示例
 * EmailService已在main.js中全局挂载为 global.EmailService
 */

// 示例1: 发送模板邮件
export async function sendTemplateEmail() {
    console.log('=== 发送模板邮件示例 ===');
    
    try {
        const result = await global.EmailService.sendTemplate({
            to: 'user@example.com',
            subject: '欢迎注册',
            template: 'welcome', // 模板代码
            data: {
                username: '张三',
                email: 'user@example.com',
                register_time: new Date().toLocaleString(),
                verification_code: '123456'
            }
        });
        
        if (result.success) {
            console.log('✅ 模板邮件发送成功:', result.messageId);
        } else {
            console.error('❌ 模板邮件发送失败:', result.error);
        }
        
        return result;
    } catch (error) {
        console.error('❌ 发送模板邮件异常:', error);
        return { success: false, error: error.message };
    }
}

// 示例2: 发送HTML邮件
export async function sendHTMLEmail() {
    console.log('=== 发送HTML邮件示例 ===');
    
    try {
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>系统通知</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h1 style="color: #333; text-align: center;">系统通知</h1>
                <p>尊敬的用户：</p>
                <p>您的账户有以下重要更新：</p>
                <ul>
                    <li>登录时间：${new Date().toLocaleString()}</li>
                    <li>登录IP：192.168.1.1</li>
                    <li>登录地点：北京市</li>
                </ul>
                <p style="margin-top: 30px;">如有疑问，请联系客服。</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="text-align: center; color: #666; font-size: 12px;">
                    此邮件由系统自动发送，请勿回复。
                </p>
            </div>
        </body>
        </html>
        `;
        
        const result = await global.EmailService.sendHTML({
            to: 'admin@example.com',
            subject: '系统登录通知',
            html: htmlContent
        });
        
        if (result.success) {
            console.log('✅ HTML邮件发送成功:', result.messageId);
        } else {
            console.error('❌ HTML邮件发送失败:', result.error);
        }
        
        return result;
    } catch (error) {
        console.error('❌ 发送HTML邮件异常:', error);
        return { success: false, error: error.message };
    }
}

// 示例3: 发送文本邮件
export async function sendTextEmail() {
    console.log('=== 发送文本邮件示例 ===');
    
    try {
        const textContent = `
系统登录通知

尊敬的用户：
您的账户在以下时间登录：
登录时间：${new Date().toLocaleString()}
登录IP：192.168.1.1
登录地点：北京市

如有疑问，请联系客服。

此邮件由系统自动发送，请勿回复。
        `.trim();
        
        const result = await global.EmailService.sendText({
            to: 'admin@example.com',
            subject: '系统登录通知',
            text: textContent
        });
        
        if (result.success) {
            console.log('✅ 文本邮件发送成功:', result.messageId);
        } else {
            console.error('❌ 文本邮件发送失败:', result.error);
        }
        
        return result;
    } catch (error) {
        console.error('❌ 发送文本邮件异常:', error);
        return { success: false, error: error.message };
    }
}

// 示例4: 批量发送邮件
export async function sendBatchEmails() {
    console.log('=== 批量发送邮件示例 ===');
    
    const recipients = [
        'user1@example.com',
        'user2@example.com',
        'user3@example.com'
    ];
    
    const results = [];
    
    for (const recipient of recipients) {
        try {
            const result = await global.EmailService.sendHTML({
                to: recipient,
                subject: '批量通知邮件',
                html: `
                <h2>批量通知</h2>
                <p>尊敬的用户 ${recipient}</p>
                <p>这是一封批量发送的测试邮件。</p>
                <p>发送时间：${new Date().toLocaleString()}</p>
                `
            });
            
            results.push({ recipient, ...result });
            
            // 避免发送过快，添加延迟
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (error) {
            results.push({ 
                recipient, 
                success: false, 
                error: error.message 
            });
        }
    }
    
    console.log('批量发送结果:', results);
    return results;
}

// 示例5: 带附件的邮件
export async function sendEmailWithAttachments() {
    console.log('=== 发送带附件邮件示例 ===');
    
    try {
        const result = await global.EmailService.sendHTML({
            to: 'user@example.com',
            subject: '带附件的邮件',
            html: `
            <h2>附件测试</h2>
            <p>请查看附件中的文件。</p>
            <p>附件包含系统使用说明文档。</p>
            `,
            attachments: [
                {
                    filename: '说明.txt',
                    content: '这是系统使用说明文档的内容。',
                    contentType: 'text/plain'
                }
            ]
        });
        
        if (result.success) {
            console.log('✅ 带附件邮件发送成功:', result.messageId);
        } else {
            console.error('❌ 带附件邮件发送失败:', result.error);
        }
        
        return result;
    } catch (error) {
        console.error('❌ 发送带附件邮件异常:', error);
        return { success: false, error: error.message };
    }
}

// 实际业务场景：用户注册欢迎邮件
export class UserEmailService {
    /**
     * 发送注册欢迎邮件
     */
    static async sendWelcomeEmail(userEmail, username, verificationCode) {
        try {
            // 方法1: 使用模板邮件
            const templateResult = await global.EmailService.sendTemplate({
                to: userEmail,
                subject: '欢迎注册我们的平台',
                template: 'welcome',
                data: {
                    username: username,
                    email: userEmail,
                    verification_code: verificationCode,
                    register_date: new Date().toLocaleDateString(),
                    support_email: global.EmailService.configuration?.n_contact_email || 'support@example.com'
                }
            });
            
            if (templateResult.success) {
                console.log(`✅ 欢迎邮件发送成功: ${userEmail}`);
                return templateResult;
            }
            
            // 如果模板邮件失败，使用备用HTML邮件
            console.log('模板邮件失败，使用备用HTML邮件');
            const fallbackResult = await global.EmailService.sendHTML({
                to: userEmail,
                subject: '欢迎注册我们的平台',
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #007bff;">欢迎加入我们！</h1>
                    <p>亲爱的 ${username}：</p>
                    <p>感谢您注册我们的平台。您的账户已经创建成功。</p>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>验证码：</strong> <span style="font-size: 24px; color: #28a745;">${verificationCode}</span></p>
                        <p>请在30分钟内使用此验证码完成邮箱验证。</p>
                    </div>
                    <p>如有任何问题，请联系我们的客服团队。</p>
                    <hr style="margin: 30px 0;">
                    <p style="text-align: center; color: #6c757d;">
                        此邮件由系统自动发送，请勿回复。<br>
                        © ${new Date().getFullYear()} 平台名称
                    </p>
                </div>
                `
            });
            
            return fallbackResult;
            
        } catch (error) {
            console.error(`发送欢迎邮件失败 (${userEmail}):`, error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * 发送密码重置邮件
     */
    static async sendPasswordResetEmail(userEmail, username, resetLink) {
        try {
            const result = await global.EmailService.sendHTML({
                to: userEmail,
                subject: '密码重置请求',
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #dc3545;">密码重置</h1>
                    <p>亲爱的 ${username}：</p>
                    <p>我们收到了您的密码重置请求。</p>
                    <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
                        <p><strong>安全提示：</strong></p>
                        <p>此链接将在24小时后失效。</p>
                        <p>如果您没有请求密码重置，请忽略此邮件。</p>
                    </div>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                            重置密码
                        </a>
                    </div>
                    <p>如果上面的按钮无法点击，请复制以下链接到浏览器地址栏：</p>
                    <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 3px;">
                        ${resetLink}
                    </p>
                </div>
                `
            });
            
            if (result.success) {
                console.log(`✅ 密码重置邮件发送成功: ${userEmail}`);
            }
            
            return result;
            
        } catch (error) {
            console.error(`发送密码重置邮件失败 (${userEmail}):`, error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * 发送系统通知邮件
     */
    static async sendSystemNotification(recipients, subject, message) {
        const results = [];
        
        for (const recipient of recipients) {
            try {
                const result = await global.EmailService.sendHTML({
                    to: recipient,
                    subject: `[系统通知] ${subject}`,
                    html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
                            <h1 style="margin: 0;">系统通知</h1>
                        </div>
                        <div style="padding: 30px; background-color: #f8f9fa;">
                            <p>${message}</p>
                            <hr style="margin: 20px 0;">
                            <p style="color: #6c757d; font-size: 14px;">
                                发送时间：${new Date().toLocaleString()}<br>
                                如有疑问，请联系系统管理员。
                            </p>
                        </div>
                    </div>
                    `
                });
                
                results.push({ recipient, ...result });
                
                // 添加延迟避免发送限制
                await new Promise(resolve => setTimeout(resolve, 500));
                
            } catch (error) {
                results.push({ 
                    recipient, 
                    success: false, 
                    error: error.message 
                });
            }
        }
        
        return results;
    }
}

// 运行所有示例
export async function runAllEmailExamples() {
    console.log('🚀 开始运行邮件服务示例...\n');
    
    // 检查邮件服务是否初始化
    if (!global.EmailService || !global.EmailService.transporter) {
        console.error('❌ 邮件服务未初始化，请检查配置');
        return;
    }
    
    try {
        // 运行基础示例
        await sendTextEmail();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await sendHTMLEmail();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 发送模板邮件（如果模板存在）
        await sendTemplateEmail();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 批量发送示例
        await sendBatchEmails();
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // 业务场景示例
        console.log('\n=== 业务场景示例 ===');
        
        await UserEmailService.sendWelcomeEmail(
            'test@example.com', 
            '测试用户', 
            '123456'
        );
        
        await UserEmailService.sendPasswordResetEmail(
            'test@example.com',
            '测试用户',
            'https://example.com/reset?token=abc123'
        );
        
        const notificationResults = await UserEmailService.sendSystemNotification(
            ['admin@example.com', 'user@example.com'],
            '系统维护通知',
            '系统将于今晚22:00-23:00进行维护，期间服务可能暂时不可用。'
        );
        
        console.log('通知发送结果:', notificationResults);
        
        console.log('\n🎉 所有邮件示例运行完成!');
        
    } catch (error) {
        console.error('❌ 邮件示例运行失败:', error);
    }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllEmailExamples().catch(console.error);
}