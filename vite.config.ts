import { defineConfig } from 'vitest/config'
import { createVuePlugin } from 'vite-plugin-vue2';
import VitePluginEslint from 'vite-plugin-eslint';
import cssExtractPlugin from 'vite-plugin-css-injected-by-js';
import packageJson from './package.json';
const path = require('path');

export default defineConfig({
  test: {
    environment: 'jsdom',
    global: true
  },
  build: {
    outDir: path.resolve(__dirname, './lib'),
    lib: {
      entry: path.resolve(__dirname, './packages/main.ts'),
      name: packageJson.name,
      formats: ['umd', 'es'],
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
  plugins: [
    VitePluginEslint({
      include: ['packages/**/*.ts', 'packages/**/*.vue']
    }),
    createVuePlugin(),
    cssExtractPlugin()
  ]
});
