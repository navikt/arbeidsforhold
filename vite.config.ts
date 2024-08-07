import { defineConfig, LibraryFormats } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';

import path from 'path';

const isDev = process.env.NODE_ENV === 'developent';

export default defineConfig(() => {
    return {
        define: {
            'process.env': {},
        },
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
                input: {
                    index: path.resolve(__dirname, 'src/index.tsx'),
                    // Include the JSON file
                    mockListe: path.resolve(__dirname, 'src/assets/mockdata/af-liste.json'),
                    mockDetaljert: path.resolve(__dirname, 'src/assets/mockdata/af-detaljert.json'),
                },
                output: [
                    {
                        format: 'es' as LibraryFormats,
                        entryFileNames: '[name].esm.js',
                        dir: 'dist',
                    },
                    {
                        format: 'cjs' as LibraryFormats,
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
        base: isDev ? '' : process.env.PUBLIC_URL,
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    };
});
