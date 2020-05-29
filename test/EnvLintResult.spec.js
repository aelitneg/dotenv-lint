import chai from 'chai';

import EnvFile from '../src/EnvFile';
import EnvType from '../src/EnvType';
import EnvLintResult from '../src/EnvLintResult';

chai.should();

describe('EnvLintResult', function () {
    const master = new EnvFile('.env.template', '/test', EnvType.MASTER);

    const test = new EnvFile('.env', '/test', EnvType.TEST);

    const envLintResult = new EnvLintResult(master, test);

    it('should create instance of EnvLintResult', function () {
        envLintResult.should.be.instanceOf(EnvLintResult);
    });

    it('should have master EnvFile', function () {
        envLintResult.should.have.property('master').with.instanceOf(EnvFile);
    });

    it('should have test EnvFile', function () {
        envLintResult.should.have.property('test').with.instanceOf(EnvFile);
    });

    it('should have missingKeys', function () {
        envLintResult.should.have
            .property('missingKeys')
            .with.instanceOf(Array);
    });

    it('should have incompleteKeys', function () {
        envLintResult.should.have
            .property('incompleteKeys')
            .with.instanceOf(Array);
    });
});
