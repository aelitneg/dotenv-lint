import path from 'path';
import argv from './Argv';

import Parser from './Parser';

console.log('[env-complete] starting');

const basePath = argv.path
    ? path.join(process.cwd(), argv.path)
    : process.cwd();

console.log('[env-complete]', 'path:', basePath);

Parser.run(basePath)
    .then(function (results) {
        const { missingKeys, incompleteValues } = results;

        console.log('[env-complete] Keys missing from .env');
        missingKeys.forEach(function (key) {
            console.log(key);
        });

        console.log('[env-complete] Keys with incomplete values in .env');
        incompleteValues.forEach(function (key) {
            console.log(key);
        });
    })
    .catch(function (error) {
        console.error(error);
    });
