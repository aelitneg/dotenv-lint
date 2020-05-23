import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import path from 'path';
import FileLoader from '../src/FileLoader';
import FileLoaderException from '../src/FileLoader/FileLoaderException';

chai.use(chaiAsPromised);
chai.should();

describe('FileLoaderException', function () {
    describe('constructor', function () {
        const message = 'This is a test error message.';
        try {
            throw new FileLoaderException(message);
        } catch (error) {
            it('should be an instance of FileLoaderException', function () {
                error.should.be.an.instanceOf(FileLoaderException);
            });

            it('should have a message', function () {
                error.message.should.equal(message);
            });
        }
    });
});

describe('FileLoader', function () {
    describe('exists', function () {
        it('should be fulfilled for files that exist (.env)', function () {
            return FileLoader.exists(path.join(process.cwd(), '/test/.env'))
                .should.be.fulfilled;
        });

        it('should be rejected for files that do not exist (.env.doesNotExist)', function () {
            return FileLoader.exists(
                path.join(process.cwd(), '/test/.env.doesNotExist'),
            ).should.be.rejectedWith(FileLoaderException);
        });
    });

    describe('load', function () {
        it('should load file', function () {
            return FileLoader.load(
                path.join(process.cwd(), '/test/.env'),
            ).should.eventually.have.lengthOf.gt(0);
        });
    });
});
