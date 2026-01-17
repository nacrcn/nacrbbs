import fs from 'fs/promises';
import path from 'path';

export default {
    /* 上传图片 */
    upImage: (request, reply) => global.Fun(reply, async () => {
        // 读取上传配置
        const config = await global.db.query('SELECT * FROM n_configuration');
        const configInfo = config[0] || {};
        
        // 配置参数
        const maxSize = parseInt(configInfo.n_upload_image_size || '5') * 1024 * 1024; // MB转字节
        const allowedExtensions = (configInfo.n_upload_image_suffix || 'png,jpg,jpeg,gif,webp').split(',').map(ext => ext.trim().toLowerCase());
        
        // 创建上传目录
        const uploadDir = path.join(process.cwd(), 'public', 'upload');
        await fs.mkdir(uploadDir, { recursive: true });
        
        try {
            const data = await request.file();
            
            if (!data) {
                global.sendMsg(reply, 400, '请选择要上传的文件');
                return;
            }
            
            // 检查文件大小
            if (data.file.bytesRead > maxSize) {
                global.sendMsg(reply, 400, `文件大小不能超过 ${configInfo.n_upload_image_size || '5'}MB`);
                return;
            }
            
            // 检查文件类型
            const fileExt = data.filename.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExt)) {
                global.sendMsg(reply, 400, `不支持的文件格式，支持格式：${allowedExtensions.join(', ')}`);
                return;
            }
            
            // 生成唯一文件名
            const timestamp = Date.now();
            const randomStr = Math.random().toString(36).substring(2, 8);
            const newFilename = `img_${timestamp}_${randomStr}.${fileExt}`;
            const filePath = path.join(uploadDir, newFilename);
            
            // 保存文件
            const buffer = await data.toBuffer();
            await fs.writeFile(filePath, buffer);
            
            // 返回文件信息
            const fileInfo = {
                filename: newFilename,
                originalname: data.filename,
                size: data.file.bytesRead,
                mimetype: data.mimetype,
                path: `/public/upload/${newFilename}`,
                url: `http://127.0.0.1:9999/public/upload/${newFilename}`,
                uploadTime: new Date().toISOString()
            };
            
            global.sendMsg(reply, 200, '上传成功', fileInfo);
            
        } catch (error) {
            console.error('文件上传错误:', error);
            global.sendMsg(reply, 500, '文件上传失败');
        }
    }),

    /* 上传文件 */
    upFile: (request, reply) => global.Fun(reply, async () => {
        // 读取上传配置
        const config = await global.db.query('SELECT * FROM n_configuration');
        const configInfo = config[0] || {};
        
        // 配置参数
        const maxSize = parseInt(configInfo.n_upload_file_size || '10') * 1024 * 1024; // MB转字节
        const allowedExtensions = (configInfo.n_upload_file_suffix || 'zip,pdf,doc,docx,xls,xlsx,txt').split(',').map(ext => ext.trim().toLowerCase());
        
        // 创建上传目录
        const uploadDir = path.join(process.cwd(), 'public', 'upload');
        await fs.mkdir(uploadDir, { recursive: true });
        
        try {
            const data = await request.file();
            
            if (!data) {
                global.sendMsg(reply, 400, '请选择要上传的文件');
                return;
            }
            
            // 检查文件大小
            if (data.file.bytesRead > maxSize) {
                global.sendMsg(reply, 400, `文件大小不能超过 ${configInfo.n_upload_file_size || '10'}MB`);
                return;
            }
            
            // 检查文件类型
            const fileExt = data.filename.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExt)) {
                global.sendMsg(reply, 400, `不支持的文件格式，支持格式：${allowedExtensions.join(', ')}`);
                return;
            }
            
            // 生成唯一文件名
            const timestamp = Date.now();
            const randomStr = Math.random().toString(36).substring(2, 8);
            const newFilename = `file_${timestamp}_${randomStr}.${fileExt}`;
            const filePath = path.join(uploadDir, newFilename);
            
            // 保存文件
            const buffer = await data.toBuffer();
            await fs.writeFile(filePath, buffer);
            
            // 返回文件信息
            const fileInfo = {
                filename: newFilename,
                originalname: data.filename,
                size: data.file.bytesRead,
                mimetype: data.mimetype,
                path: `/public/upload/${newFilename}`,
                url: `http://127.0.0.1:9999/public/upload/${newFilename}`,
                uploadTime: new Date().toISOString()
            };
            
            global.sendMsg(reply, 200, '上传成功', fileInfo);
            
        } catch (error) {
            console.error('文件上传错误:', error);
            global.sendMsg(reply, 500, '文件上传失败');
        }
    }),

  
    /* 删除上传的文件 */
    deleteFile: (request, reply) => global.Fun(reply, async () => {
        const { filename } = request.body || {};
        
        if (!filename) {
            global.sendMsg(reply, 400, '文件名不能为空');
            return;
        }
        
        try {
            const filePath = path.join(process.cwd(), 'public', 'upload', filename);
            
            // 检查文件是否存在
            await fs.access(filePath);
            
            // 删除文件
            await fs.unlink(filePath);
            
            global.sendMsg(reply, 200, '文件删除成功');
            
        } catch (error) {
            if (error.code === 'ENOENT') {
                global.sendMsg(reply, 404, '文件不存在');
            } else {
                console.error('删除文件错误:', error);
                global.sendMsg(reply, 500, '文件删除失败');
            }
        }
    })
}