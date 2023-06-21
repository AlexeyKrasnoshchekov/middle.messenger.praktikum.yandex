import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
// import checker from 'vite-plugin-checker';
import legacy from '@vitejs/plugin-legacy';
import handlebarsPrecompile from './src/utils/vite-plugin-handlebars-precompile';

export default defineConfig({
  build: {
    target: 'es2017',
    outDir: 'dist',
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: true,
  },
  plugins: [
    ViteAliases(),
    handlebarsPrecompile(),
    // checker({
    //     eslint: {
    //       lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
    //     },
    //   }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
});
