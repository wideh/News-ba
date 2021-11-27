import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

function pathResolve(dir: string) {
  return path.resolve(__dirname, '.', dir);
}

// const srcPath = path.resolve(__dirname, 'src');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'], // 省略后缀
    // alias: [
    //     { find: '@', replacement: srcPath }, // @代表/src
    // ],
    alias: {
      "@": pathResolve('src'),
    },
  },
})
