import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Path from 'path';

import EnvType from '../src/EnvType';
import EnvFile from '../src/EnvFile';

chai.use(chaiAsPromised);
chai.should();

describe('EnvFile', function () {
    const name = '.env';
    const path = './test';

    const envFile = new EnvFile(name, path, EnvType.TEST);

    describe('constructor', function () {
        it('should be an instance of EnvFile', function () {
            envFile.should.be.instanceOf(EnvFile);
        });

        it('should have property name', function () {
            envFile.should.have.property('name').with.equal(name);
        });

        it('should have property path', function () {
            envFile.should.have
                .property('path')
                .with.equal(Path.join(process.cwd(), path));
        });

        it('should have property type', function () {
            envFile.should.have.property('type').with.equal(EnvType.TEST);
        });
    });

    describe('parsePath', function () {
        it('should leave absolute paths unchanged', function () {
            const absolutePath = '/absolute/path';
            envFile.parsePath(absolutePath).should.equal(absolutePath);
        });

        it('should resolve relative paths', function () {
            const relativePath = './test';
            envFile
                .parsePath(relativePath)
                .should.equal(Path.join(process.cwd(), relativePath));
        });

        it('should use process.cwd() as default path', function () {
            const defaultPath = process.cwd();
            envFile.parsePath(defaultPath).should.equal(defaultPath);
        });
    });

    describe('load', function () {
        it('should load data from file', async function () {
            await envFile.load();

            return envFile.should.have
                .property('data')
                .with.instanceOf(Object)
                .and.have.property('COMPLETE_KEY');
        });
    });
});
