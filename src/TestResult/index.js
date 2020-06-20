'use strict';

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
 */
class TestResult {
    /**
     * Creates a new test result
     *
     * @param {Boolean} pass
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
}

export default TestResult;
