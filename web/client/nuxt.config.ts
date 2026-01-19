
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  imports: {
    dirs: ['composables']
  },
  compatibilityDate: '2025-05-15',
  devtools: false,
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  css: [
    '@arco-design/web-vue/dist/arco.css',  // Arco Design 官方样式
    '~/main.css',  // 自定义样式
  ],
  modules: ['@pinia/nuxt'],
  plugins: ['~/plugins/arco'],
  runtimeConfig: {
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in', // 等待当前页面过渡完成再进入新页面
    },
    head: {
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
      ]
    }
  },
  vite: {
    plugins: [
      AutoImport({
        // 这里可以配置你自动导入的内容
        imports: [
          'vue',
          'vue-router',
          'vue/macros',
          '@vueuse/core',
        ],
        resolvers: [ArcoResolver()],
        dts: 'auto-imports.d.ts', // 生成自动导入类型声明文件
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true,
          }),
        ],
        dts: 'components.d.ts', // 生成组件类型声明文件
      }),
    ],
    ssr: {
      noExternal: ['vue-router']
    }
  },
  features: {
    inlineStyles: false
  }
})