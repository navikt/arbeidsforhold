import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import npmImport from 'less-plugin-npm-import';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import url from '@rollup/plugin-url';

import svgr from '@svgr/rollup';
import pkg from './package.json' assert { type: 'json' };

export default {
    input: 'src/index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
        },
    ],
    plugins: [
        external(),
        postcss({
            use: [
                [
                    'less',
                    {
                        plugins: [new npmImport({ prefix: '~' })],
                    },
                ],
            ],
        }),
        url({
            include: ['**/*.ttf'],
            limit: Infinity,
        }),
        svgr(),
        image(),
        resolve({
            browser: true,
            modulesOnly: true,
        }),
        typescript(),
        commonjs(),
        json(),
        babel({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
    ],
};
