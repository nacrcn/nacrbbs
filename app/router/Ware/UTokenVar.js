export default async function (request, reply) {
  try {
    const token = request.headers[global.CONFIG.userToken.HeadersKey];

    if (!token) {
      return global.sendMsg(reply, 401, '缺少token');
    }

    // 验证token
    const verifyResult = global.AuthVerifyAuthCode(token, global.CONFIG.userToken.secretKey);

    // 检查验证结果
    if (verifyResult.code !== 200) {
      return global.sendMsg(reply, verifyResult.code, verifyResult.msg);
    }

    if (verifyResult.data.endtime < Date.now()) {
      return global.sendMsg(reply, 401, 'token已过期');
    }

    // 将用户信息挂载到 request
    request.Ware = verifyResult.data;

  } catch (error) {
    console.error('Token验证中间件错误:', error);
    return global.sendMsg(reply, 500, '服务器内部错误');
  }
}