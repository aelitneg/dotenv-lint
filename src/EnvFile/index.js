'use strict';

import { readFile } from 'fs';
import path from 'path';
import { promisify } from 'util';
import { parse } from 'dotenv';

/**
 * @typedef {import('../EnvType').EnvType} EnvType
 */

const readFileAsync = promisify(readFile);

/**
 * EnvFile
 *
 * An class representing an .env file
 * @typedef {Object} EnvFile
 * @property {String} name
 * @property {String} path
 * @property {EnvType} type
 * @property {Buffer} data
 */
class EnvFile {
    /**
     * Constructor
     *
     * Creates a new instance of EnvFile
     * @param {String} name
     * @param {String} path
     * @param {EnvType} type
     */
    constructor(name, path, type) {
        this.name = name;
        this.path = path;
        this.type = type;

        this.data = null;
    }

    /**
     * Load data data from file system
     */
    async load() {
        this.data = parse(
            await readFileAsync(path.join(process.cwd(), this.path, this.name)),
        );
    }
}

export default EnvFile;
