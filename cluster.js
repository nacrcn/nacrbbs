import { availableParallelism } from 'os';
import cluster from 'cluster';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
    console.log(`主进程 ${process.pid} 正在运行`);
    
    // 根据CPU核心数创建子进程
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出，重启中...`);
        cluster.fork();
    });
} else {
    // 子进程启动服务器
    import('./index.js').catch(err => {
        console.error('服务器启动失败:', err);
        process.exit(1);
    });
    
    console.log(`工作进程 ${process.pid} 已启动`);
}