'use strict';
import LogLevel from '../LogLevel';
import Rule from './Rule';
import TestResult from '../TestResult';

const Rules = Object.freeze([
    new Rule('no-missing-keys', LogLevel.ERROR, function (master, test) {
        const missingKeys = [];

        Object.keys(master).forEach(function (key) {
            if (!test.hasOwnProperty(key)) {
                missingKeys.push(key);
            }
        });

        return new TestResult(
            !missingKeys.length,
            this.logLevel,
            missingKeys.length ? missingKeys : null,
        );
    }),

    new Rule('no-incomplete-keys', LogLevel.WARN, function (master, test) {
        const incompleteKeys = [];

        Object.keys(master).forEach(function (key) {
            if (test.hasOwnProperty(key) && test[key] === '') {
                incompleteKeys.push(key);
            }
        });

        return new TestResult(
            !incompleteKeys.length,
            this.logLevel,
            incompleteKeys.length ? incompleteKeys : null,
        );
    }),
]);

export default Rules;
