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
            const { testFile, masterFile } = await Parser.loadFiles(basePath);

            const { test, master } = Parser.parseFiles(testFile, masterFile);

            return Parser.compare(test, master);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Load files from path
     * @param {String} basePath
     */
    static async loadFiles(basePath) {
        const qTest = FileLoader.load(path.join(basePath, '.env'));

        const qMaster = FileLoader.load(path.join(basePath, '.env.template'));

        const [testFile, masterFile] = await Promise.all([qTest, qMaster]);

        return { testFile, masterFile };
    }

    /**
     * Use dotenv to parse contents of files
     * @param {Buffer} testFile
     * @param {Buffer} masterFile
     */
    static parseFiles(testFile, masterFile) {
        const test = parse(testFile);
        const master = parse(masterFile);

        return { test, master };
    }

    /**
     * Compare keys / values for objects
     * @param {Object} test
     * @param {Object} master
     */
    static compare(test, master) {
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
