import resolve from '@rollup/plugin-node-resolve';
import run from '@rollup/plugin-run';

export default {
    input: 'lib/index.js',
    output: {
        file: 'dist/env-complete.js',
        format: 'cjs',
        banner: '#!/usr/bin/env node',
    },
    plugins: [resolve(), run()],
};
