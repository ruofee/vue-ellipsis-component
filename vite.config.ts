import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import cssExtractPlugin from './build/cssExtractPlugin';
import packageJson from './package.json';
const path = require('path');

const isProd = process.env.APP_ENV === 'production'

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, './lib'),
    lib: {
      entry: path.resolve(__dirname, './packages/main.ts'),
      name: packageJson.name,
      fileName: (format) => {
        if (format === 'umd') {
          return `${packageJson.name}.js`;
        }
        return `${packageJson.name}.${format}.js`;
      }
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    }
  },
  plugins: [createVuePlugin(), isProd && cssExtractPlugin()]
});
