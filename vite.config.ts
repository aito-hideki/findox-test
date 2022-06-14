import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import viteESLint from '@ehutch79/vite-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    components({
      directoryAsNamespace: true,
      dts: true
    }),
    process.env.NODE_ENV === 'development' && viteESLint({
      include: ['src/**/*.vue', 'src/**/*.ts']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    chunkSizeWarningLimit: 1024
  }
})
