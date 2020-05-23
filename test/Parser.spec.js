import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import path from 'path';

import Parser from '../src/Parser';

chai.use(chaiAsPromised);
chai.should();

describe('Parser', async function () {
    const baseDir = path.join(process.cwd(), '/test');

    const files = await Parser.loadFiles(baseDir);
    describe('loadFiles', function () {
        it('should load master file', function () {
            return files.should.have
                .property('masterFile')
                .with.instanceOf(Buffer);
        });

        it('should load test file', function () {
            return files.should.have
                .property('testFile')
                .with.instanceOf(Buffer);
        });
    });

    const objects = await Parser.parseFiles(files.masterFile, files.testFile);
    describe('parse', function () {
        it('should parse master file into object', function () {
            return objects.should.have
                .property('master')
                .with.keys('COMPLETE_KEY', 'MISSING_VALUE', 'MISSING_KEY');
        });

        it('should parse test file into object', function () {
            return objects.should.have
                .property('test')
                .with.keys('COMPLETE_KEY', 'MISSING_VALUE');
        });
    });

    describe('compare', function () {
        const master = {
            COMPLETE_KEY: true,
            MISSING_VALUE: true,
            MISSING_KEY: true,
        };

        const test = {
            COMPLETE_KEY: true,
            MISSING_VALUE: undefined,
        };

        const { missingKeys, incompleteValues } = Parser.compare(master, test);

        it('should find 1 missing key, MISSING_KEY', function () {
            missingKeys.should.have
                .lengthOf(1)
                .and.have.members(['MISSING_KEY']);
        });

        it('should find 1 incomplete value, MISSING_VALUE', function () {
            incompleteValues.should.have
                .lengthOf(1)
                .and.have.members(['MISSING_VALUE']);
        });
    });
});
