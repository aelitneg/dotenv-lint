'use strict';

class FileLoaderException extends Error {
    constructor(message) {
        super(message);

        this.message = message;
        this.name = 'File Loader Exception';
    }
}

export default FileLoaderException;
