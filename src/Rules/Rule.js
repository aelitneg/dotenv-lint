'use strict';
/**
 * @typedef {import('../LogLevel').LogLevel} LogLevel
 */

/**
 * Rule
 *
 * Describes a test to run on EnvFiles
 * @typedef {Object} Rule
 * @property {String} name
 * @property {LogLevel} logLevel
 * @property {Function} testFn
 */
class Rule {
    /**
     * Constructor
     *
     * Creates a new Rule
     * @param {String} name
     * @param {LogLevel} logLevel
     * @param {Function} testFn
     */
    constructor(name, logLevel, testFn) {
        this._name = name;
        this._logLevel = logLevel;
        this._testFn = testFn;
    }

    get name() {
        return this._name;
    }

    get logLevel() {
        return this._logLevel;
    }

    get testFn() {
        return this._testFn.bind(this);
    }
}

export default Rule;
