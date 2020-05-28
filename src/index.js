import argv from './Argv';
import EnvLint from './EnvLint';

EnvLint.run(argv.path, argv.master, argv.test)
    .then(function (result) {
        console.log('[envlint] result');
        console.dir(result, { depth: null });
    })
    .catch(function (error) {
        console.log('[envlint] ERROR', error);
        process.exit(1);
    });
