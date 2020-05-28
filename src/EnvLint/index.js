'use strict';
import { filter, find } from 'lodash';

import EnvFile from '../EnvFile';
import EnvType from '../EnvType';
import EnvLintResult from '../EnvLintResult';

/**
 * EnvLint
 *
 * The main package class.
 * @typedef {Object} EnvLint
 * @property {String} path
 * @property {String} master
 * @property {Array<String>} test
 */
class EnvLint {
    /**
     * Constructor
     *
     * Create a new instance of EnvLint
     * @param {String} path
     * @param {String} master
     * @param {Array<String>} test
     */
    constructor(path, master, test) {
        this.path = path;
        this.master = master ? master : '.env.template';
        this.test = Array.isArray(test) && test.length ? test : ['.env'];

        this.files = {};
    }

    /**
     * Create EnvFile Objects and Load Data
     */
    load() {
        this.files[this.master] = new EnvFile(
            this.master,
            this.path,
            EnvType.MASTER,
        );

        this.test.forEach((t) => {
            this.files[t] = new EnvFile(t, this.path, EnvType.TEST);
        });

        // Load Data into EnvFiles
        const q = [];
        for (const key in this.files) {
            q.push(this.files[key].load());
        }

        return Promise.all(q);
    }

    /**
     * Perform linting on EnvFiles
     */
    lint() {
        const results = [];

        const master = find(this.files, { type: EnvType.MASTER });

        const tests = filter(this.files, { type: EnvType.TEST });

        tests.forEach((test) => {
            const result = new EnvLintResult(master, test);

            result.missingKeys = this.findMissingKeys(master, test);
            result.incompleteKeys = this.findIncompleteValues(master, test);

            results.push(result);
        });

        return results;
    }

    /**
     * Find Missing Keys
     * @param {EnvFile} master
     * @param {EnvFile} test
     *
     */
    findMissingKeys(master, test) {
        const missingKeys = [];

        Object.keys(master.data).forEach(function (key) {
            if (!test.data.hasOwnProperty(key)) {
                missingKeys.push(key);
            }
        });

        return missingKeys;
    }

    /**
     *Find Incomplete Keys
     * @param {*} master
     * @param {*} test
     */
    findIncompleteValues(master, test) {
        const incompleteKeys = [];
        Object.keys(master.data).forEach(function (key) {
            if (test.data.hasOwnProperty(key) && !test.data[key]) {
                incompleteKeys.push(key);
            }
        });

        return incompleteKeys;
    }

    /**
     * Run EnvLint
     * @param {String} path
     * @param {String} master
     * @param {Array<String>} test
     */
    static async run(path, master, test) {
        const instance = new EnvLint(path, master, test);

        await instance.load();

        return instance.lint();
    }
}

export default EnvLint;
