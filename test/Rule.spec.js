import chai from 'chai';

import Rule from '../src/Rules/Rule.js';
import LogLevel from '../src/LogLevel';

chai.should();

describe('Rule', function () {
    const name = 'test_rule';
    const logLevel = LogLevel.ERROR;
    const testFn = function () {
        return true;
    };
    const rule = new Rule(name, logLevel, testFn);

    it('should be an instance of Rule', function () {
        rule.should.be.instanceOf(Rule);
    });

    it('should have property name', function () {
        rule.should.have.property('name').equal(name);
    });

    it('should have property logLevel', function () {
        rule.should.have.property('logLevel').equal(logLevel);
    });

    it('should have property testFn', function () {
        (typeof rule.testFn).should.equal('function');
    });
});
