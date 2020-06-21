import chai from 'chai';

import TestResult from '../src/TestResult';
import LogLevel from '../src/LogLevel';

chai.should();

describe('TestResult', function () {
    const pass = true;
    const logLevel = LogLevel.ERROR;
    const data = [];

    const testResult = new TestResult(pass, logLevel, data);

    it('should be an instance of TestResult', function () {
        testResult.should.be.instanceOf(TestResult);
    });

    it('should have prperty pass', function () {
        testResult.should.have.property('pass').equal(pass);
    });

    it('should have property logLevel', function () {
        testResult.should.have.property('logLevel').equal(logLevel);
    });

    it('should have property data', function () {
        testResult.should.have.property('data').instanceOf(Array);
    });

    it('should have propery errors', function () {
        testResult.should.have.property('errors').equal(0);
    });

    it('should have property warnings', function () {
        testResult.should.have.property('warnings').equal(0);
    });
});
