import { readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * 路由预加载管理器
 * 负责在应用启动时预加载所有控制器和中间件，避免运行时动态导入的性能开销
 */
class PreloadManager {
    constructor() {
        this.controllers = new Map();
        this.middlewares = new Map();
        this.initialized = false;
    }

    /**
     * 初始化预加载管理器
     * @param {string} baseDir - 项目基础目录
     */
    async initialize(baseDir) {
        if (this.initialized) return;

        console.time('PreloadManager初始化');
        
        try {
            // 预加载所有控制器
            await this.preloadControllers(baseDir);
            
            // 预加载所有中间件
            await this.preloadMiddlewares(baseDir);
            
            this.initialized = true;
            console.log('✅ 路由预加载完成');
        } catch (error) {
            console.error('❌ 路由预加载失败:', error);
            throw error;
        }
        
        console.timeEnd('PreloadManager初始化');
    }

    /**
     * 递归扫描目录获取所有文件
     * @param {string} dir - 目录路径
     * @param {string[]} fileList - 文件列表
     * @param {string} rootDir - 根目录
     */
    scanDirectory(dir, fileList = [], rootDir = '') {
        const files = readdirSync(dir);
        
        for (const file of files) {
            const filePath = join(dir, file);
            const stat = statSync(filePath);
            
            if (stat.isDirectory()) {
                this.scanDirectory(filePath, fileList, rootDir || dir);
            } else if (file.endsWith('.js')) {
                const relativePath = filePath
                    .replace(rootDir || dir, '')
                    .replace(/^[\\/]/, '')
                    .replace(/\.[^/.]+$/, '');
                fileList.push(relativePath);
            }
        }
        
        return fileList;
    }

    /**
     * 预加载所有控制器
     * @param {string} baseDir - 基础目录
     */
    async preloadControllers(baseDir) {
        const controllerDir = join(baseDir, 'app', 'controller');
        const controllerFiles = this.scanDirectory(controllerDir);
        
        // console.log(`📂 发现 ${controllerFiles.length} 个控制器文件`);
        
        for (const filePath of controllerFiles) {
            try {
                const importPath = `../controller/${filePath.replace(/\\/g, '/')}.js`;
                const module = await import(importPath);
                const controller = module.default || module;
                
                // 存储控制器模块
                this.controllers.set(filePath, controller);
                
                // 如果控制器有命名导出，也存储
                if (module.default && Object.keys(module).length > 1) {
                    this.controllers.set(`${filePath}@exports`, module);
                }
                
                // console.log(`  ✅ 预加载控制器: ${filePath}`);
            } catch (error) {
                console.warn(`  ⚠️ 预加载控制器失败 ${filePath}:`, error.message);
            }
        }
    }

    /**
     * 预加载所有中间件
     * @param {string} baseDir - 基础目录
     */
    async preloadMiddlewares(baseDir) {
        const middlewareDir = join(baseDir, 'app', 'router', 'Ware');
        
        try {
            const middlewareFiles = this.scanDirectory(middlewareDir);
            // console.log(`📂 发现 ${middlewareFiles.length} 个中间件文件`);
            
            for (const filePath of middlewareFiles) {
                try {
                    const importPath = `./Ware/${filePath.replace(/\\/g, '/')}.js`;
                    const module = await import(importPath);
                    const middleware = module.default || module;
                    
                    this.middlewares.set(filePath, middleware);
                    // console.log(`  ✅ 预加载中间件: ${filePath}`);
                } catch (error) {
                    console.warn(`  ⚠️ 预加载中间件失败 ${filePath}:`, error.message);
                }
            }
        } catch (error) {
            console.warn('中间件目录不存在或为空');
        }
    }

    /**
     * 获取预加载的控制器
     * @param {string} controllerPath - 控制器路径
     * @param {string} method - 方法名
     * @returns {Function} - 控制器方法
     */
    getController(controllerPath, method) {
        const controller = this.controllers.get(controllerPath);
        
        if (!controller) {
            throw new Error(`控制器未预加载: ${controllerPath}`);
        }
        
        const handler = controller[method];
        
        if (!handler) {
            throw new Error(`控制器方法不存在: ${controllerPath}@${method}`);
        }
        
        return handler;
    }

    /**
     * 获取预加载的中间件
     * @param {string} middlewareName - 中间件名称
     * @param {string} arg - 参数
     * @returns {Function} - 中间件函数
     */
    getMiddleware(middlewareName, arg) {
        const middleware = this.middlewares.get(middlewareName);
        
        if (!middleware) {
            throw new Error(`中间件未预加载: ${middlewareName}`);
        }
        
        return arg ? middleware(Number(arg)) : middleware;
    }

    /**
     * 检查是否已初始化
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * 获取预加载统计信息
     */
    getStats() {
        return {
            controllers: this.controllers.size,
            middlewares: this.middlewares.size,
            initialized: this.initialized
        };
    }
}

// 创建单例实例
export const preloadManager = new PreloadManager();

export default PreloadManager;