'use strict';

import { red, yellow, bold, underline, dim } from 'chalk';
import { padEnd } from 'lodash';

/**
 * @typedef {import('../EnvFile').EnvFile} EnvFile
 */

/**
 * @typedef {Object} EnvLintResult
 * @property {EnvFile} master
 * @property {EnvFile} test
 * @property {Array<string>} missingKeys
 * @property {Array<string>} incompleteKeys
 */
class EnvLintResult {
    /**
     * Constructor
     * @param {EnvFile} master
     * @param {EnvFile} test
     */
    constructor(master, test) {
        this.master = master;
        this.test = test;
        this.missingKeys = [];
        this.incompleteKeys = [];
    }

    /**
     * Print a single EnvLintResult to the console
     */
    _print() {
        console.log(
            '\n',
            underline(`${this.test.path}/${this.test.name}`),
            '\n',
        );

        this.missingKeys.forEach(function (key) {
            console.log(
                padEnd(null, 2),
                red(padEnd('error', 5)),
                padEnd(key, 24),
                dim('missing key'),
            );
        });

        this.incompleteKeys.forEach(function (key) {
            console.log(
                padEnd(null, 2),
                yellow(padEnd('warn', 5)),
                padEnd(key, 24),
                dim('incomplete key'),
            );
        });
    }

    /**
     * Print results to the console
     * @param {Array<EnvLintResult>} results
     */
    static print(results) {
        // Print details of each result
        results.forEach(function (result) {
            if (result.missingKeys.length || result.incompleteKeys.length) {
                result._print();
            }
        });

        // Calculate summary data
        let errors = 0;
        let warnings = 0;

        const reducer = (acc, v) => acc + 1;

        results.forEach(function (result) {
            errors += result.missingKeys.reduce(reducer, 0);
            warnings += result.incompleteKeys.reduce(reducer, 0);
        });

        if (!errors && !warnings) {
            return;
        }

        const summary = `\n ${'\u2716'} ${
            errors + warnings
        } problems (${errors} error, ${warnings} warning)`;

        console.log(bold(errors ? red(summary) : yellow(summary)));
    }
}

export default EnvLintResult;
