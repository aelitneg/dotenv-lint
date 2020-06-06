import argv from './Argv';
import EnvLint from './EnvLint';
import EnvLintResult from './EnvLintResult';
import { version } from '../package.json';

EnvLint.run(argv.path, argv.master, argv.test)
    .then(function (results) {
        EnvLintResult.print(results);
    })
    .catch(function (error) {
        console.log('\n Oops! Something went wrong! :(');
        console.log('\n', 'ENVLint', version);
        console.log('\n', error);
        process.exit(1);
    });
