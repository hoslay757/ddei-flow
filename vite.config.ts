import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    port: 5275 // 你想要的新端口号
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@ddei-flow': fileURLToPath(new URL('./plugins/flow', import.meta.url)),
    }

  },

  build: {
    minify: false,
    // 这里配置打包，打包时要排除Vue的依赖，因为我们使用组件库时本地肯定是vue 环境，否则会报isCE 的错误
    rollupOptions: {
      external: ["vue", "ddei-editor"],
      output: {
        globals: {
          vue: "Vue",
          "ddei-editor":"ddei-editor"
        },
      },
    }, 
    cssCodeSplit:true,
    lib: {
      entry: "./plugins/index.ts",
      name: "ddei-flow",
      formats: ['umd'],
    },
  },
})
