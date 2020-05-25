'use strict';

class FileLoaderException extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileLoaderException';
    }
}

export default FileLoaderException;
