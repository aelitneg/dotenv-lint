'use strict';

import { access, readFile } from 'fs';
import { promisify } from 'util';
import FileLoaderException from './FileLoaderException';

const accessAsync = promisify(access);
const readFileAsync = promisify(readFile);

/**
 * FileLoader
 * Async wrapper around fs functions
 */
class FileLoader {
    /**
     * Check if a file exists
     * @param {String} path
     */
    static async exists(path) {
        try {
            // Await so we can catch the error and check error code
            await accessAsync(path);
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new FileLoaderException(
                    `File ${path.substr(
                        path.lastIndexOf('/') + 1,
                    )} does not exist or is not accessible.`,
                );
            }

            throw error;
        }
    }

    /**
     * Load a file from the directory
     * @param {String} path
     */
    static async load(path) {
        // Check if file exists
        await this.exists(path);

        const file = await readFileAsync(path);

        return file;
    }
}

export default FileLoader;
