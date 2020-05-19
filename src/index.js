import path from 'path';
import argv from './Argv';

import FileLoader from './FileLoader';

console.log('[env-complete] starting');

console.log(
    '[env-complete]',
    'path:',
    argv.path ? path.join(process.cwd(), argv.path) : process.cwd(),
);

const fileLoader = new FileLoader(argv.path ? argv.path : process.cwd());

console.log('[env-complete] loading .env and .env.template');
Promise.all([fileLoader.load('.env'), fileLoader.load('.env.template')])
    .then(function (files) {
        const [envFile, envTemplate] = files;
        console.log('[env-complete] loading complete!');
    })
    .catch(function (error) {
        console.error('[env-complete]', error);
    });
