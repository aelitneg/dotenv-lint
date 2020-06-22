'use strict';

import LogLevel from '../LogLevel';

/**
 * @typedef {import('../LogLevel').LogLevel} LogLevel
 */
/**
 *
 * TestResult
 *
 * Describes a result object from a Rule's test function
 * @typedef {Object} TestResult
 * @property {Boolean} pass success / failure of test
 * @property {LogLevel} logLevel
 * @property {Array} data data returned from test
 * @property {Number} errors
 * @property {Number} warnings
 */
class TestResult {
    /**
     * Creates a new test result
     *
     * @param {Boolean} pass
     * @param {LogLevel} logLevel
     * @param {Array} data
     */
    constructor(pass, logLevel, data) {
        this._pass = pass;
        this._logLevel = logLevel;
        this._data = data;
    }

    get pass() {
        return this._pass;
    }

    get logLevel() {
        return this._logLevel;
    }

    get data() {
        return this._data;
    }

    get warnings() {
        if (this._logLevel !== LogLevel.WARN) {
            return 0;
        }

        return this._data.length;
    }

    get errors() {
        if (this._logLevel !== LogLevel.ERROR) {
            return 0;
        }

        return this._data.length;
    }
}

export default TestResult;
