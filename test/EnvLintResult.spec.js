import chai from 'chai';

import EnvFile from '../src/EnvFile';
import EnvType from '../src/EnvType';
import EnvLintResult from '../src/EnvLintResult';
import LogLevel from '../src/LogLevel';

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

    it('should have testResults', function () {
        envLintResult.should.have.property('testResults');
    });

    it('should have errors', function () {
        envLintResult.should.have.property('warnings').with.equal(0);
    });

    it('should have warnings', function () {
        envLintResult.should.have.property('warnings').with.equal(0);
    });

    describe('getLogColor', function () {
        it('should return "red" for errors', function () {
            envLintResult
                ._getLogColor(LogLevel.ERROR.value)
                .should.equal('red');
        });

        it('should return "yellow" for warnings', function () {
            envLintResult
                ._getLogColor(LogLevel.WARN.value)
                .should.equal('yellow');
        });
    });
});
