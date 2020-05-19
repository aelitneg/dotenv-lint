import chai, { expect } from 'chai';
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
            it('should inherit from Error class', function () {
                error.should.be.an.instanceOf(FileLoaderException);
            });

            it('should have property message', function () {
                error.message.should.equal(message);
            });
        }
    });
});

describe('FileLoader', function () {
    const relativePath = './test';
    const fileLoader = new FileLoader(relativePath);

    describe('constructor', function () {
        it('default path is process.cwd()', function () {
            const defaultFileLoader = new FileLoader();
            defaultFileLoader.path.should.equal(process.cwd());
        });

        it('accepts custom path', function () {
            fileLoader.path.should.equal(
                path.join(process.cwd(), relativePath),
            );
        });
    });

    describe('exists', function () {
        it('should be fulfilled for files that exist (.env)', function () {
            return fileLoader.exists('.env').should.be.fulfilled;
        });

        it('should be rejected for files that do not exist (.env.doesNotExist)', function () {
            return fileLoader
                .exists('.env.doesNotExist')
                .should.be.rejectedWith(FileLoaderException);
        });
    });

    describe('load', function () {
        it('should load file', function () {
            return fileLoader
                .load('.env')
                .should.eventually.have.lengthOf.gt(0);
        });
    });
});
