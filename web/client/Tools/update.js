import { Message } from '@arco-design/web-vue';

/* 通用上传函数 */
const updatefun = (file, url, onProgress) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)

    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable && onProgress) {
        let percent = Math.round((event.loaded * 100) / event.total)
        if (percent >= 100) percent = 99
        onProgress(percent)
      }
    }

    xhr.onload = function () {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText)
        if (res.code !== 200) {
          Message.error('上传失败：' + res.msg)
        }
        onProgress?.(100)
        resolve(res)
      } else {
        Message.error('上传失败（HTTP ' + xhr.status + '）')
        reject(xhr)
      }
    }

    xhr.onerror = function () {
      Message.error('网络错误，上传失败')
      reject(xhr)
    }

    xhr.send(formData)
  })
}

export const upimg = async (file, onProgress) => {
    console.log(file);
    const res = await updatefun(file, 'http://127.0.0.1:9999/api/upload/image', (percent) => {
        console.log(percent);
        onProgress(percent)
    })
    console.log(res);
    return res;

}

export const upfile = async (file, onProgress) => {
    const res = await updatefun(file, 'http://127.0.0.1:9999/api/upload/file', (percent) => {
        console.log(percent);
        onProgress(percent)
    })

    return res;
}