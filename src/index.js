import path from 'path';
import argv from './Argv';

import Parser from './Parser';

console.log('[envlint] starting');

const basePath = argv.path
    ? path.join(process.cwd(), argv.path)
    : process.cwd();

console.log('[envlint]', 'path:', basePath);

Parser.run(basePath)
    .then(function (results) {
        const { missingKeys, incompleteValues } = results;

        console.log('[envlint] Keys missing from .env');
        missingKeys.forEach(function (key) {
            console.log(key);
        });

        console.log('[envlint] Keys with incomplete values in .env');
        incompleteValues.forEach(function (key) {
            console.log(key);
        });
    })
    .catch(function (error) {
        console.error(error);
    });
