import { posix, sep } from 'path';
import { fileURLToPath } from 'url';
import { preloadManager } from './PreloadManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = sep === '\\' ? __filename.split(sep).slice(0, -1).join(sep) : __filename.split(sep).slice(0, -1).join(sep);

class RouterGroup {
  constructor(basePath, app, groupMiddlewares = []) {
    this.basePath = basePath;
    this.app = app; // Fastify 实例
    this.groupMiddlewares = groupMiddlewares;
  }

  async get(subPath, controllerStr, routeMiddlewares = []) {
    await this.registerRoute('get', subPath, controllerStr, routeMiddlewares);
  }

  async post(subPath, controllerStr, routeMiddlewares = []) {
    await this.registerRoute('post', subPath, controllerStr, routeMiddlewares);
  }

  async registerRoute(method, subPath, controllerStr, routeMiddlewares) {
    const fullPath = posix.join(this.basePath, subPath);

    const groupMws = await this.resolveMiddlewares(this.groupMiddlewares);
    const routeMws = await this.resolveMiddlewares(routeMiddlewares);
    const allMiddlewares = [...groupMws, ...routeMws];

    const handler = await this.resolveController(controllerStr);

    // Fastify 路由，支持异步 handler，middlewares 用 onRequest, preHandler 钩子或自己包装
    // 这里简单通过 preHandler 注册所有中间件，最后才是 handler
    this.app.route({
      method,
      url: fullPath,
      preHandler: allMiddlewares,
      handler,
    });
  }

  async resolveMiddlewares(middlewareList) {
    // 检查是否已预加载，如果未预加载则使用动态导入作为降级方案
    if (preloadManager.isInitialized()) {
      return Promise.all(
        middlewareList.map(async (item) => {
          const [name, arg] = item.split(':');
          try {
            return preloadManager.getMiddleware(name, arg);
          } catch (error) {
            // console.warn(`使用动态导入加载中间件 ${name}:`, error.message);
            // 降级到动态导入
            const mod = await import(`./Ware/${name}.js`);
            const middleware = mod.default || mod;
            return arg ? middleware(Number(arg)) : middleware;
          }
        })
      );
    } else {
      // 预加载未完成，使用原始动态导入
      return Promise.all(
        middlewareList.map(async (item) => {
          const [name, arg] = item.split(':');
          const mod = await import(`./Ware/${name}.js`);
          const middleware = mod.default || mod;
          return arg ? middleware(Number(arg)) : middleware;
        })
      );
    }
  }

  async resolveController(controllerStr) {
    const [controllerPath, method] = controllerStr.split('@');
    
    // 检查是否已预加载，如果未预加载则使用动态导入作为降级方案
    if (preloadManager.isInitialized()) {
      try {
        return preloadManager.getController(controllerPath, method);
      } catch (error) {
        // console.warn(`使用动态导入加载控制器 ${controllerPath}@${method}:`, error.message);
        // 降级到动态导入
        const mod = await import(`../controller/${controllerPath.replace(/\//g, sep)}.js`);
        const controller = mod.default || mod;
        return controller[method];
      }
    } else {
      // 预加载未完成，使用原始动态导入
      const mod = await import(`../controller/${controllerPath.replace(/\//g, sep)}.js`);
      const controller = mod.default || mod;
      return controller[method];
    }
  }
}

class Router {
  constructor(app) {
    this.app = app;
  }

  async group(basePath, middlewaresOrCallback, maybeCallback) {
    let groupMiddlewares = [];
    let callback;

    if (typeof middlewaresOrCallback === 'function') {
      callback = middlewaresOrCallback;
    } else {
      groupMiddlewares = middlewaresOrCallback;
      callback = maybeCallback;
    }

    const group = new RouterGroup(basePath, this.app, groupMiddlewares);
    await callback(group);
  }
}

// 导出带有预加载初始化功能的工厂函数
export default async (app) => {
  // 初始化预加载管理器
  const baseDir = __dirname.split(sep).slice(0, -2).join(sep); // 获取项目根目录
  await preloadManager.initialize(baseDir);
  
  return new Router(app);
};
