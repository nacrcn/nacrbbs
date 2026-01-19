import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import path from 'path';
import { fileURLToPath } from 'url';
import formbody from '@fastify/formbody';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



import './global.js';
import './app/imp/main.js'
import './app/library/main.js'
/* 引入及时通讯 WebSocket.io */
// import './app/WebSocket/main.js'

async function main() {
    const app = Fastify({
        logger: {
            level: 'error' // 只显示 warn 和 error
        }
    });
    // 注册插件
    await app.register(cors, { origin: true, credentials: true });
    await app.register(formbody);
    await app.register(fastifyMultipart, {
        limits: {
            fileSize: 1024 * 1024 * 1024,
            files: 1,
            fieldSize: 10 * 1024 * 1024,
        }
    })
    // 提供静态文件服务（强制下载 HTML 文件）
    await app.register(fastifyStatic, {
        root: path.join(__dirname, 'public'),
        prefix: '/public/',
        decorateReply: false,
        setHeaders: (res, pathName) => {
            if (pathName.endsWith('.html') || pathName.endsWith('.htm')) {
                res.setHeader('Content-Disposition', 'attachment');
            }
        }
    });
    // 提供web目录下的HTML文件访问
    await app.register(fastifyStatic, {
        root: path.join(__dirname, 'public/web'),
        prefix: '/',
        index: ['index.html'],
        decorateReply: false
    });
    // 路由加载
    const createRouter = (await import('./app/router/fun.js')).default;
    const registerRoutes = (await import('./app/router/index.js')).default;

    const router = await createRouter(app);
    await registerRoutes(router); // 如果内部是异步，等待完成

    // 启动服务器
    await app.listen({
        port: global.CONFIG.port,
        host: '0.0.0.0'  // 允许外部访问
    });

    console.log(`
\n===\n

Cpenx Nodejs Server Is Running on ${app.server.address().port}
HOST: http://127.0.0.1:${app.server.address().port}
        
\n===\n`);


}

main().catch(err => {
    console.error(err);
    process.exit(1);
});



