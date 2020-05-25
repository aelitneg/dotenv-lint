const yargs = require('yargs');
import { name, version } from '../../package.json';

const argv = yargs
    .usage(`${name} ${version}`)
    .usage('Usage: envlint [options]')
    .string('path')
    .alias('path', 'p')
    .nargs('path', 1)
    .describe('path', 'path to directory containing .env and template files')
    .help('help')
    .alias('help', 'h')
    .version('version', '1.0.1')
    .alias('version', 'v').argv;

export default argv;
