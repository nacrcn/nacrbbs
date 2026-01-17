/* API接口请求智能拦截验证模块 */
export default async function (request, reply) {
  try {
    const token = request.headers;

    console.log(token);
    
  } catch (error) {
  }
}