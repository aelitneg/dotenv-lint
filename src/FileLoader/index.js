'use strict';

import { access, readFile } from 'fs';
import path from 'path';
import { promisify } from 'util';
import FileLoaderException from './FileLoaderException';

const accessAsync = promisify(access);
const readFileAsync = promisify(readFile);

class FileLoader {
    /**
     * FileLoader
     *
     * Async wrapper around fs functions
     * @param {String} relativePath relative path to directory
     */
    constructor(relativePath) {
        this.path = relativePath
            ? path.join(process.cwd(), relativePath)
            : process.cwd();
    }

    /**
     * Check if a file exists in the directory
     * @param {String} fileName
     */
    async exists(fileName) {
        try {
            await accessAsync(path.join(this.path, fileName));
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new FileLoaderException(
                    `File ${fileName} does not exist or is not accessible.`,
                );
            }

            throw error;
        }
    }

    /**
     * Load a file from the directory
     * @param {String} fileName
     */
    async load(fileName) {
        // Check if file exists
        await this.exists(fileName);

        const file = await readFileAsync(path.join(this.path, fileName));

        return file;
    }
}

export default FileLoader;
