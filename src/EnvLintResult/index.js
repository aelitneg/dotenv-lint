'use strict';

import { red, yellow, bold, underline, dim } from 'chalk';
import { padEnd } from 'lodash';

const colors = Object.freeze({
    red: red,
    yellow: yellow,
});

/**
 * @typedef {import('../EnvFile').EnvFile} EnvFile
 * @typedef {import('../TestResult').TestResult} TestResult
 */

/**
 * @typedef {Object} EnvLintResult
 * @property {EnvFile} master
 * @property {EnvFile} test
 * @property {Object} testResults collection Rule.name:TestResult objects
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
        this.testResults = {};
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

        for (const key in this.testResults) {
            const testResult = this.testResults[key];

            testResult.data.forEach((d) => {
                console.log(
                    padEnd(null, 2),
                    colors[this._getLogColor(testResult.logLevel.value)](
                        padEnd(testResult.logLevel.name, 5),
                    ),
                    padEnd(d, 24),
                    dim(key),
                );
            });
        }
    }

    /**
     * Get console color for log level
     * @param {Number} logLevel
     */
    _getLogColor(logLevel) {
        switch (logLevel) {
            case 0:
                return 'red';
            case 1:
                return 'yellow';
        }
    }

    /**
     * Print results to the console
     * @param {Array<EnvLintResult>} results
     */
    static print(results) {
        // Print details of each result
        results.forEach(function (result) {
            if (Object.keys(result.testResults).length) {
                result._print();
            }
        });
        // // Calculate summary data
        // let errors = 0;
        // let warnings = 0;
        // const reducer = (acc, v) => acc + 1;
        // results.forEach(function (result) {
        //     errors += result.missingKeys.reduce(reducer, 0);
        //     warnings += result.incompleteKeys.reduce(reducer, 0);
        // });
        // if (!errors && !warnings) {
        //     return;
        // }
        // const summary = `\n ${'\u2716'} ${
        //     errors + warnings
        // } problems (${errors} error, ${warnings} warning)`;
        // console.log(bold(errors ? red(summary) : yellow(summary)));
    }
}

export default EnvLintResult;
