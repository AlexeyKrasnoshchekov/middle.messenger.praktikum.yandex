import { defineConfig } from "vite";
import { resolve } from 'path';
import { ViteAliases } from "vite-aliases";
import legacy from "@vitejs/plugin-legacy";
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    build: {
        target: 'es2017',
        outDir: 'build',
    },
    server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: true,
    },
    assetsInclude: ["**/*.hbs"],
    plugins: [
        ViteAliases(),
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
          }),
        legacy({
            targets: ['defaults', 'not IE 11'],
        })
    ],
})