import chai, { expect } from 'chai';

import FileLoaderException from '../src/FIleLoader/FileLoaderException';

chai.should();

describe('FileLoaderException', function () {
    describe('constructor', function () {
        const message = 'This is a test error message.';
        const fileLoaderException = new FileLoaderException(message);

        it('should inherit from Error class', function () {
            expect(fileLoaderException).to.be.an.instanceOf(Error);
        });

        it('should have property message', function () {
            fileLoaderException.message.should.equal(message);
        });
    });
});
