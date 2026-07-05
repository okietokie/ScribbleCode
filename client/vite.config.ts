import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src/app') },
      {
        find: /^@progression-engine\/(.*)$/,
        replacement: path.resolve(__dirname, '../src/progression-engine/$1'),
      },
      {
        find: '@progression-engine',
        replacement: path.resolve(__dirname, '../src/progression-engine'),
      },
      {
        find: /^@lesson-engine\/(.*)$/,
        replacement: path.resolve(__dirname, '../src/lesson-engine/$1'),
      },
      {
        find: '@lesson-engine',
        replacement: path.resolve(__dirname, '../src/lesson-engine'),
      },
    ],
  },
})
