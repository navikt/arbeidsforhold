import { defineConfig, LibraryFormats } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';

import path from 'path';

const isLocal = process.env.VITE_ENV === 'local';

export default defineConfig(() => {
    return {
        build: {
            outDir: 'dist',
            assetsInlineLimit: 0,
            sourcemap: false,
            reportCompressedSize: true,
            minify: true,
            lib: {
                entry: path.resolve(__dirname, './src/index.tsx'),
                name: 'react-lib',
                fileName: 'index',
            },
            rollupOptions: {
                external: ['react', 'react-dom'],
                output: [
                    {
                        format: 'es',
                        entryFileNames: '[name].esm.js',
                        dir: 'dist',
                    },
                    {
                        format: 'cjs',
                        entryFileNames: '[name].cjs.js',
                        dir: 'dist',
                    },
                ],
                plugins: [
                    typescript({
                        sourceMap: false,
                        declaration: true,
                        declarationDir: 'dist/types',
                        outDir: 'dist',
                        exclude: 'node_modules/**',
                    }),
                ],
            },
            css: {
                modules: {
                    scopeBehaviour: 'local',
                },
            },
        },
        base: isLocal ? '' : process.env.PUBLIC_URL,
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    };
});
