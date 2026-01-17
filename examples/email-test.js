/**
 * 邮件配置检查和测试脚本
 * 用于诊断邮件服务配置问题
 */

import { readFileSync } from 'fs';

// 检查邮件配置
export async function checkEmailConfig() {
    console.log('=== 邮件配置检查 ===\n');
    
    try {
        // 检查全局邮件服务
        if (!global.EmailService) {
            console.error('❌ 邮件服务未初始化，请检查main.js中的初始化代码');
            return false;
        }
        
        // 获取配置信息
        const configInfo = global.EmailService.getConfigInfo();
        console.log('📋 当前配置信息:');
        console.log('  SMTP服务器:', configInfo.host);
        console.log('  端口:', configInfo.port);
        console.log('  安全连接:', configInfo.secure ? '是' : '否');
        console.log('  认证账号:', configInfo.user);
        console.log('  发件人:', configInfo.from);
        console.log('  服务状态:', configInfo.isConfigured ? '✅ 已配置' : '❌ 未配置');
        console.log('  传输器状态:', configInfo.hasTransporter ? '✅ 已创建' : '❌ 未创建');
        
        // 检查配置完整性
        const requiredFields = ['host', 'port', 'user', 'from'];
        const missingFields = requiredFields.filter(field => !configInfo[field]);
        
        if (missingFields.length > 0) {
            console.log('\n❌ 缺少必需配置项:', missingFields.join(', '));
            return false;
        }
        
        // 检查发件人与认证账号是否一致
        if (configInfo.user !== configInfo.from) {
            console.log('\n⚠️  警告: 发件人地址与认证账号不一致');
            console.log('   认证账号:', configInfo.user);
            console.log('   发件人地址:', configInfo.from);
            console.log('   建议设置为相同地址以避免发送失败');
        }
        
        console.log('\n✅ 基本配置检查通过');
        return true;
        
    } catch (error) {
        console.error('❌ 配置检查失败:', error.message);
        return false;
    }
}

// 测试邮件发送
export async function testEmailSending(testEmail) {
    console.log('\n=== 邮件发送测试 ===\n');
    
    if (!testEmail) {
        console.error('❌ 请提供测试邮箱地址');
        console.log('使用方法: testEmailSending(\'your-email@example.com\')');
        return false;
    }
    
    try {
        console.log('📧 正在测试发送邮件到:', testEmail);
        
        const testResult = await global.EmailService.testConnection(testEmail);
        
        if (testResult.success) {
            console.log('✅ 邮件发送测试成功!');
            console.log('  消息ID:', testResult.email?.messageId);
            console.log('  请检查邮箱查看测试邮件');
        } else {
            console.error('❌ 邮件发送测试失败:', testResult.error);
            
            // 根据错误类型提供解决建议
            if (testResult.error.includes('Auth')) {
                console.log('\n💡 解决建议:');
                console.log('  1. 检查邮箱账号和密码/授权码是否正确');
                console.log('  2. 确认是否开启了SMTP服务');
                console.log('  3. 检查是否使用了正确的授权码（不是登录密码）');
            } else if (testResult.error.includes('conform with authentication')) {
                console.log('\n💡 解决建议:');
                console.log('  1. 确保发件人地址与认证账号完全一致');
                console.log('  2. 检查数据库中的 n_email_from 配置');
                console.log('  3. 建议将发件人设置为认证账号');
            } else if (testResult.error.includes('ECONNREFUSED')) {
                console.log('\n💡 解决建议:');
                console.log('  1. 检查SMTP服务器地址和端口是否正确');
                console.log('  2. 检查网络连接是否正常');
                console.log('  3. 确认防火墙设置是否阻止了连接');
            }
        }
        
        return testResult.success;
        
    } catch (error) {
        console.error('❌ 邮件测试异常:', error.message);
        return false;
    }
}

// 数据库配置检查
export async function checkDatabaseConfig() {
    console.log('\n=== 数据库配置检查 ===\n');
    
    try {
        if (!global.db) {
            console.error('❌ 数据库连接未初始化');
            return false;
        }
        
        // 查询邮件配置
        const config = await global.db.query('SELECT * FROM n_configuration LIMIT 1');
        
        if (config.length === 0) {
            console.error('❌ 数据库中没有找到配置记录');
            return false;
        }
        
        const emailConfig = config[0];
        console.log('📋 数据库邮件配置:');
        console.log('  SMTP主机:', emailConfig.n_email_host || '未设置');
        console.log('  SMTP端口:', emailConfig.n_email_port || '未设置');
        console.log('  安全连接:', emailConfig.n_email_secure || '未设置');
        console.log('  认证账号:', emailConfig.n_email_user || '未设置');
        console.log('  发件人:', emailConfig.n_email_from || '未设置');
        console.log('  联系邮箱:', emailConfig.n_contact_email || '未设置');
        console.log('  版权信息:', emailConfig.n_web_copyright || '未设置');
        
        // 检查必需字段
        const requiredFields = ['n_email_host', 'n_email_port', 'n_email_user', 'n_email_pass'];
        const missingFields = requiredFields.filter(field => !emailConfig[field]);
        
        if (missingFields.length > 0) {
            console.log('\n❌ 数据库缺少必需配置:');
            missingFields.forEach(field => {
                console.log(`  - ${field}`);
            });
            return false;
        }
        
        console.log('\n✅ 数据库配置检查通过');
        return true;
        
    } catch (error) {
        console.error('❌ 数据库配置检查失败:', error.message);
        return false;
    }
}

// 邮件模板检查
export async function checkEmailTemplates() {
    console.log('\n=== 邮件模板检查 ===\n');
    
    try {
        if (!global.db) {
            console.error('❌ 数据库连接未初始化');
            return false;
        }
        
        // 查询所有邮件模板
        const templates = await global.db.query('SELECT n_code, n_name FROM n_email_template');
        
        if (templates.length === 0) {
            console.log('⚠️  数据库中没有邮件模板');
            return true; // 不是致命错误
        }
        
        console.log('📋 可用邮件模板:');
        templates.forEach(template => {
            console.log(`  - ${template.n_code}: ${template.n_name}`);
        });
        
        // 检查常用模板
        const commonTemplates = ['welcome', 'verification', 'password_reset', 'notification'];
        const existingCodes = templates.map(t => t.n_code);
        const missingTemplates = commonTemplates.filter(code => !existingCodes.includes(code));
        
        if (missingTemplates.length > 0) {
            console.log('\n⚠️  建议添加的常用模板:', missingTemplates.join(', '));
        }
        
        console.log('\n✅ 邮件模板检查完成');
        return true;
        
    } catch (error) {
        console.error('❌ 邮件模板检查失败:', error.message);
        return false;
    }
}

// 完整的诊断测试
export async function fullEmailDiagnosis(testEmail = null) {
    console.log('🔍 开始完整邮件服务诊断...\n');
    
    const results = {
        database: await checkDatabaseConfig(),
        config: await checkEmailConfig(),
        templates: await checkEmailTemplates(),
        sending: testEmail ? await testEmailSending(testEmail) : null
    };
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 诊断结果总结:');
    console.log(`  数据库配置: ${results.database ? '✅ 通过' : '❌ 失败'}`);
    console.log(`  服务配置: ${results.config ? '✅ 通过' : '❌ 失败'}`);
    console.log(`  邮件模板: ${results.templates ? '✅ 通过' : '❌ 失败'}`);
    
    if (results.sending !== null) {
        console.log(`  发送测试: ${results.sending ? '✅ 通过' : '❌ 失败'}`);
    }
    
    const allPassed = results.database && results.config && results.templates && (results.sending === null || results.sending);
    
    if (allPassed) {
        console.log('\n🎉 所有检查通过！邮件服务配置正常。');
    } else {
        console.log('\n⚠️  部分检查未通过，请根据上述信息修复问题。');
    }
    
    return allPassed;
}

// 修复常见问题的建议
export function getFixSuggestions() {
    console.log('\n=== 常见问题修复建议 ===\n');
    console.log('1. ❌ "Mail command failed: 440 mail from account doesn\'t conform"');
    console.log('   解决: 确保发件人地址与认证账号完全一致');
    console.log('   在数据库中将 n_email_from 设置为与 n_email_user 相同的值\n');
    
    console.log('2. ❌ "Auth failed" 或 "Invalid credentials"');
    console.log('   解决: 检查邮箱账号密码');
    console.log('   - 使用邮箱的授权码，不是登录密码');
    console.log('   - 确认开启了SMTP服务\n');
    
    console.log('3. ❌ "ECONNREFUSED" 或连接超时');
    console.log('   解决: 检查网络和服务器配置');
    console.log('   - 确认SMTP服务器地址和端口正确');
    console.log('   - 检查防火墙设置\n');
    
    console.log('4. ❌ "Template not found"');
    console.log('   解决: 在数据库中添加邮件模板');
    console.log('   插入记录到 n_email_template 表\n');
    
    console.log('5. ❌ 邮件发送成功但收不到');
    console.log('   解决: 检查垃圾邮件文件夹');
    console.log('   - 检查邮件内容是否包含敏感词');
    console.log('   - 确认收件人地址正确');
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
    const testEmail = process.argv[2];
    
    fullEmailDiagnosis(testEmail)
        .then(success => {
            if (!success) {
                getFixSuggestions();
            }
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('诊断过程中发生错误:', error);
            getFixSuggestions();
            process.exit(1);
        });
}