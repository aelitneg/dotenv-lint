'use strict';
import { filter, find } from 'lodash';

import EnvFile from '../EnvFile';
import EnvType from '../EnvType';
import EnvLintResult from '../EnvLintResult';
import Rules from '../Rules';

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
        this.path = path ? path : '';
        this.master = master ? master : '.env.template';
        this.test = Array.isArray(test) && test.length ? test : ['.env'];

        this.files = {};
    }

    /**
     * Create EnvFile objects and load data
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

        // Load data into EnvFiles
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

            Rules.forEach(function (rule) {
                const testResult = rule.testFn(master.data, test.data);

                if (!testResult.pass) {
                    result.testResults[rule.name] = testResult;
                }
            });

            results.push(result);
        });

        return results;
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
