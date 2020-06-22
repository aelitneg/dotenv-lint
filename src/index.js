import argv from './Argv';
import EnvLint from './EnvLint';
import EnvLintResult from './EnvLintResult';
import { version } from '../package.json';

EnvLint.run(argv.path, argv.master, argv.test)
    .then(function (results) {
        const { errors, warnings } = EnvLintResult.print(results);

        switch (argv.exit) {
            case 'warn':
                process.exit(warnings ? 1 : 0);
            case 'error':
                process.exit(errors ? 1 : 0);
            case 'none':
            default:
                process.exit(0);
        }
    })
    .catch(function (error) {
        console.log('\n Oops! Something went wrong! :(');
        console.log('\n', 'ENVLint', version);
        console.log('\n', error);
        process.exit(1);
    });
