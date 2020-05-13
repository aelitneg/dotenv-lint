import path from 'path';
import argv from './Argv';

console.log('[env-complete] starting');

if (argv.path) {
    console.log('[env-complete]', 'path:', path.join(process.cwd(), argv.path));
}
