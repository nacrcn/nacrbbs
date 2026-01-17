export default async function (request, reply) {
    try {
        const token = request.headers[global.CONFIG.userToken.HeadersKey];

        if (token) {
            // 验证token
            const verifyResult = global.AuthVerifyAuthCode(token, global.CONFIG.userToken.secretKey);
            // 检查验证结果
            if (verifyResult.code == 200 && verifyResult.data.endtime > Date.now()) {
                request.Ware = verifyResult.data;
            }
        }

    } catch (error) {
        console.error('Token验证中间件错误:', error);
        return global.sendMsg(reply, 500, '服务器内部错误');
    }
}