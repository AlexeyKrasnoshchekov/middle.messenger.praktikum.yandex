import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import legacy from "@vitejs/plugin-legacy";
import handlebarsPrecompile from "./src/utils/vite-plugin-handlebars-precompile";


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
    plugins: [
        ViteAliases(),
        handlebarsPrecompile(),
        legacy({
            targets: ['defaults', 'not IE 11'],
        })
    ],
})