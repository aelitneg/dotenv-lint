'use strict';
import path from 'path';
import { parse } from 'dotenv';
import FileLoader from '../FileLoader';

class Parser {
    /**
     * Start the parser
     * @param {String} basePath
     */
    static async run(basePath) {
        try {
            const { masterFile, testFile } = await Parser.loadFiles(basePath);

            const { master, test } = Parser.parseFiles(masterFile, testFile);

            return Parser.compare(master, test);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Load files from path
     * @param {String} basePath
     */
    static async loadFiles(basePath) {
        const qMaster = FileLoader.load(path.join(basePath, '.env.template'));

        const qTest = FileLoader.load(path.join(basePath, '.env'));

        const [masterFile, testFile] = await Promise.all([qMaster, qTest]);

        return { masterFile, testFile };
    }

    /**
     * Use dotenv to parse contents of files
     * @param {Buffer} masterFile
     * @param {Buffer} testFile
     */
    static parseFiles(masterFile, testFile) {
        const master = parse(masterFile);
        const test = parse(testFile);

        return { master, test };
    }

    /**
     * Compare keys / values for objects
     * @param {Object} master
     * @param {Object} test
     */
    static compare(master, test) {
        const missingKeys = [];
        const incompleteValues = [];

        Object.keys(master).map(function (key) {
            // Check for keys present in master, but missing in test
            if (!test.hasOwnProperty(key)) {
                missingKeys.push(key);
                return;
            }

            // Check for keys with no value in test
            if (!test[key]) {
                incompleteValues.push(key);
            }
        });

        return { missingKeys, incompleteValues };
    }
}

export default Parser;
