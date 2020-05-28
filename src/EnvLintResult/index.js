'use strict';

/**
 * @typedef {import('../EnvFile').EnvFile} EnvFile
 */

/**
 * @type {Object} EnvLintResult
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
}

export default EnvLintResult;
