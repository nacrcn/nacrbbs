const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

class scheduledTaskService {
    constructor(storagePath = './scheduledTasks.json') {
        this.TaskList = new Map();
        this.RunningTasks = new Map();
        this.storagePath = path.resolve(storagePath);
        this.loadTasks();
    }

    /* 定时任务添加函数 */
    addScheduledTask({
        Function = () => {},
        Time = '0 0 0 * * *',
        Options = {}
    }){
        const taskId = Date.now().toString();
        const task = {
            Function,
            Time,
            Options,
            isRunning: false
        };
        this.TaskList.set(taskId, task);
        this.saveTasks();
        return taskId;
    }

    /* 启动定时任务 */
    startTask(taskId) {
        const task = this.TaskList.get(taskId);
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }

        if (task.isRunning) {
            throw new Error(`Task with ID ${taskId} is already running`);
        }

        if (!cron.validate(task.Time)) {
            throw new Error(`Invalid cron expression: ${task.Time}`);
        }

        const scheduledTask = cron.schedule(task.Time, task.Function, {
            scheduled: false,
            ...task.Options
        });

        scheduledTask.start();
        
        this.RunningTasks.set(taskId, scheduledTask);
        task.isRunning = true;

        return true;
    }

    /* 停止定时任务 */
    stopTask(taskId) {
        const scheduledTask = this.RunningTasks.get(taskId);
        if (!scheduledTask) {
            throw new Error(`Running task with ID ${taskId} not found`);
        }

        scheduledTask.stop();
        this.RunningTasks.delete(taskId);
        
        const task = this.TaskList.get(taskId);
        if (task) {
            task.isRunning = false;
        }
        this.saveTasks();

        return true;
    }

    /* 删除定时任务 */
    removeTask(taskId) {
        if (this.RunningTasks.has(taskId)) {
            this.stopTask(taskId);
        }
        
        const deleted = this.TaskList.delete(taskId);
        if (!deleted) {
            throw new Error(`Task with ID ${taskId} not found`);
        }
        this.saveTasks();

        return true;
    }

    /* 获取所有任务 */
    getAllTasks() {
        const tasks = [];
        for (const [taskId, task] of this.TaskList) {
            tasks.push({
                taskId,
                time: task.Time,
                isRunning: task.isRunning,
                options: task.Options
            });
        }
        return tasks;
    }

    /* 获取正在运行的任务 */
    getRunningTasks() {
        const runningTasks = [];
        for (const [taskId, task] of this.TaskList) {
            if (task.isRunning) {
                runningTasks.push({
                    taskId,
                    time: task.Time,
                    options: task.Options
                });
            }
        }
        return runningTasks;
    }

    /* 启动所有任务 */
    startAllTasks() {
        const results = [];
        for (const taskId of this.TaskList.keys()) {
            try {
                this.startTask(taskId);
                results.push({ taskId, status: 'started' });
            } catch (error) {
                results.push({ taskId, status: 'error', error: error.message });
            }
        }
        return results;
    }

    /* 停止所有任务 */
    stopAllTasks() {
        const results = [];
        for (const taskId of this.RunningTasks.keys()) {
            try {
                this.stopTask(taskId);
                results.push({ taskId, status: 'stopped' });
            } catch (error) {
                results.push({ taskId, status: 'error', error: error.message });
            }
        }
        return results;
    }

    /* 清理所有任务 */
    clearAllTasks() {
        this.stopAllTasks();
        this.TaskList.clear();
        this.RunningTasks.clear();
        this.saveTasks();
        return true;
    }

    /* 从文件加载任务 */
    loadTasks() {
        try {
            if (fs.existsSync(this.storagePath)) {
                const data = fs.readFileSync(this.storagePath, 'utf8');
                const tasksData = JSON.parse(data);
                
                for (const [taskId, taskData] of Object.entries(tasksData)) {
                    // 将函数字符串转换回函数对象
                    let functionObj;
                    try {
                        if (taskData.functionString) {
                            functionObj = eval(`(${taskData.functionString})`);
                        } else if (taskData.Function) {
                            functionObj = taskData.Function;
                        } else {
                            functionObj = () => {};
                        }
                    } catch (error) {
                        console.warn(`Failed to restore function for task ${taskId}:`, error.message);
                        functionObj = () => {};
                    }

                    const task = {
                        Function: functionObj,
                        Time: taskData.Time || '0 0 0 * * *',
                        Options: taskData.Options || {},
                        isRunning: false // 重启后任务默认不运行
                    };

                    this.TaskList.set(taskId, task);
                }
                
                console.log(`Loaded ${this.TaskList.size} tasks from ${this.storagePath}`);
            }
        } catch (error) {
            console.error('Failed to load tasks:', error);
        }
    }

    /* 保存任务到文件 */
    saveTasks() {
        try {
            const tasksData = {};
            
            for (const [taskId, task] of this.TaskList) {
                // 将函数转换为字符串以便存储
                let functionString;
                try {
                    functionString = task.Function.toString();
                } catch (error) {
                    console.warn(`Failed to serialize function for task ${taskId}:`, error.message);
                    functionString = '() => {}';
                }

                tasksData[taskId] = {
                    functionString,
                    Time: task.Time,
                    Options: task.Options
                };
            }

            fs.writeFileSync(this.storagePath, JSON.stringify(tasksData, null, 2), 'utf8');
        } catch (error) {
            console.error('Failed to save tasks:', error);
        }
    }

    /* 自动重启时恢复运行状态的任务 */
    async restoreRunningTasks() {
        const results = [];
        for (const [taskId, task] of this.TaskList) {
            if (task.Options.autoStart) {
                try {
                    this.startTask(taskId);
                    results.push({ taskId, status: 'restored' });
                } catch (error) {
                    results.push({ taskId, status: 'error', error: error.message });
                }
            }
        }
        return results;
    }

    /* 销毁服务时清理 */
    destroy() {
        this.stopAllTasks();
        this.saveTasks();
    }
}

export default scheduledTaskService;
