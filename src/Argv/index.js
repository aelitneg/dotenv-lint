const yargs = require('yargs');
import { name, version } from '../../package.json';

const argv = yargs
    .usage(`${name} ${version}`)
    .usage('Usage: dotenv-lint [options]')
    .string('path')
    .alias('path', 'p')
    .nargs('path', 1)
    .describe('path', 'path to directory containing .env and template files')
    .string('master')
    .alias('master', 'm')
    .describe('master', 'filename of master env file')
    .array('test')
    .alias('test', 't')
    .describe('filename(s) of test env files')
    .choices('exit', ['none', 'error', 'warn'])
    .default('exit', 'none')
    .alias('exit', 'e')
    .describe(
        'exit',
        'condition to exit with non-zero exit code (stop npm script)',
    )
    .help('help')
    .alias('help', 'h')
    .version('version', version)
    .alias('version', 'v').argv;

export default argv;
