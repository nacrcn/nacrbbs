export default {
    /* 发送验证码邮件 */
    sendVerificationCode: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        // 验证字段
        if (global.Tools.VerifyField(reply, pre, [
            ['to', '收件人邮箱', 'required']
        ])) return false;

        // 生成6位验证码
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresIn = 10; // 10分钟过期

        // 将验证码存储到Redis中
        const redisKey = `email:verify:${pre.to}`;
        await global.RedisUtils.setCache(redisKey, code, expiresIn * 60);

        // 发送邮件
        const result = await global.EmailService.sendTemplate({
            to: pre.to,
            subject: '邮箱验证码',
            template: 'verifyCode',
            data: { code, main_title: '验证码', user_name: pre.to }
        });

        if (result.success) {
            global.sendMsg(reply, 200, '验证码发送成功', {
                expiresIn: expiresIn,
            });
        } else {
            global.sendMsg(reply, 201, '验证码发送失败：' + result.error);
        }
    }),

    /* 测试发信模式 */
    sendTest: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        // 验证字段
        if (global.Tools.VerifyField(reply, pre, [
            ['to', '收件人邮箱', 'required']
        ])) return false;

        // 发送邮件
        const result = await global.EmailService.sendTemplate({
            to: pre.to,
            subject: '测试发信邮件',
            template: 'TestEmail',
            data: { main_title: '测试邮件', user_name: pre.to }
        });

        if (result.success) {
            global.sendMsg(reply, 200, '邮件发送成功');
        } else {
            global.sendMsg(reply, 201, '邮件发送失败：' + result.error);
        }
    }),

    /* 批量发送邮件 */
    sendBatch: (request, reply) => global.Fun(reply, async () => {
        const pre = request.body;

        // 验证字段
        if (global.Tools.VerifyField(reply, pre, [
            ['recipients', '收件人列表', 'required'],
            ['subject', '邮件主题', 'required'],
            ['content', '邮件内容', 'required']
        ])) return false;

        if (!Array.isArray(pre.recipients) || pre.recipients.length === 0) {
            global.sendMsg(reply, 201, '收件人列表不能为空');
            return;
        }

        const results = [];
        let successCount = 0;
        let failCount = 0;

        // 批量发送（注意：实际生产环境中建议使用队列处理）
        for (const recipient of pre.recipients) {
            const result = await global.EmailService.sendText({
                to: recipient.email || recipient,
                subject: pre.subject,
                text: pre.content
            });

            results.push({
                recipient: recipient.email || recipient,
                success: result.success,
                messageId: result.success ? result.messageId : null,
                error: result.success ? null : result.error
            });

            if (result.success) {
                successCount++;
            } else {
                failCount++;
            }

            // 避免发送过快，添加小延迟
            if (pre.delay && pre.delay > 0) {
                await new Promise(resolve => setTimeout(resolve, pre.delay));
            }
        }

        global.sendMsg(reply, 200, `批量发送完成，成功：${successCount}，失败：${failCount}`, {
            results: results,
            successCount: successCount,
            failCount: failCount
        });
    })
}