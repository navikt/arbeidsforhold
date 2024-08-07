import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
    return {
        define: {
            'process.env': {},
        },
        build: {
            outDir: 'build',
            assetsInlineLimit: 0,
            sourcemap: true,
        },
        base: '',
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            port: 3006,
        },
    };
});
