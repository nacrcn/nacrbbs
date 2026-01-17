// plugins/env-detector.client.ts
import { defineNuxtPlugin } from '#app'
import CryptoJS from 'crypto-js'

function getGPUInfo() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
        return gl?.getParameter(debugInfo?.UNMASKED_RENDERER_WEBGL) || 'unknown';
    } catch (e) {
        return 'error';
    }
}

function isSuspiciousGPU(gpu) {
    const suspects = [
        'llvmpipe', 'Microsoft Basic Render Driver', 'VirtualBox', 'SVGA3D', 'Parallels', 'bluestacks',
        'Android Emulator', 'Translator', 'Genymotion', 'QEMU', 'Mali-G71', 'Mali-400MP', 'SwiftShader'
    ]
    return suspects.some(s => gpu.toLowerCase().includes(s.toLowerCase()))
}

function isAndroidEmulator(ua) {
    const keywords = ['x86', 'emulator', 'genymotion', 'bluestacks', 'nox', 'droid4x', 'android sdk built']
    return keywords.some(k => ua.includes(k))
}

function isMobileDevice(ua) {
    return /android|iphone|ipad|ipod/i.test(ua)
}

function getEnvFlags() {
    const ua = navigator.userAgent.toLowerCase()
    const gpu = getGPUInfo()
    const cores = navigator.hardwareConcurrency || 0
    const lang = navigator.language
    const plugins = navigator.plugins.length
    const screenRes = `${screen.width}x${screen.height}`
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    return {
        userAgent: ua,
        gpu,
        suspiciousGPU: isSuspiciousGPU(gpu),
        cpuCores: cores,
        suspiciousCores: cores <= 2,
        androidEmulator: ua.includes('android') && isAndroidEmulator(ua),
        isMobile: isMobileDevice(ua),
        language: lang,
        pluginCount: plugins,
        screenResolution: screenRes,
        isTouchDevice: isTouch
    }
}

async function checkNetworkLatency() {
    const t1 = performance.now();
    try {
        await fetch('https://canscode.com', { cache: 'no-store' });
    } catch (e) { }
    const t2 = performance.now();
    return t2 - t1;
}

export default defineNuxtPlugin(async (nuxtApp) => {
    if (process.server) return

    const env = getEnvFlags()
    const latency = await checkNetworkLatency()

    const suspicious = env.suspiciousGPU || env.suspiciousCores || env.androidEmulator || latency > 1000
   
    /* 固定值 */
    const envInfo = {
        userAgent: env.userAgent,             // 浏览器的User-Agent字符串，描述浏览器类型、版本、操作系统等
        cpuCores: env.cpuCores,               // CPU的核心数量
        language: env.language,               // 浏览器/系统的语言设置，比如“zh-CN”、“en-US”
        pluginCount: env.pluginCount,         // 浏览器安装的插件数量
        screenResolution: env.screenResolution, // 屏幕分辨率，通常是宽x高，比如1920x1080
        isTouchDevice: env.isTouchDevice,     // 是否支持触摸操作（触摸屏设备）
        suspicious: suspicious                // 是否怀疑该环境有异常，比如环境指纹异常等，通常是布尔值
    }

    /* 变动值 */
    const msd = {
        latency: latency,                     // 网络延迟，可能是请求或ping的时间，单位一般是毫秒
        gpu: env.gpu,   
        suspicious:suspicious                      // GPU信息，一般是显卡型号或渲染器字符串
    }

    const hash = CryptoJS.MD5(JSON.stringify(envInfo)).toString()

    return {
        hash:hash,
        msd
    }
})