import chai from 'chai';

import { find } from 'lodash';

import EnvFile from '../src/EnvFile';
import EnvType from '../src/EnvType';
import Rules from '../src/Rules';
import Rule from '../src/Rules/Rule.js';
import LogLevel from '../src/LogLevel';
import TestResult from '../src/TestResult';

chai.should();

const master = {
    COMPLETE_KEY: true,
    INCOMPLETE_KEY: true,
    MISSING_KEY: true,
};

const test = {
    COMPLETE_KEY: true,
    INCOMPLETE_KEY: '',
};

describe('Rules', function () {
    describe('no-missing-keys', function () {
        const rule = find(Rules, { name: 'no-missing-keys' });

        it('should be an instance of Rule', function () {
            rule.should.be.instanceOf(Rule);
        });

        it('should have name', function () {
            rule.name.should.equal('no-missing-keys');
        });

        it('should be ERROR', function () {
            rule.logLevel.should.equal(LogLevel.ERROR);
        });

        it('should return instance of TestResult', function () {
            const result = rule.testFn(master, test);

            result.should.be.instanceOf(TestResult);
        });

        it('should find missing keys', function () {
            const result = rule.testFn(master, test);
            result.should.have.property('data').with.members(['MISSING_KEY']);
        });
    });

    describe('no-incomplete-keys', function () {
        const rule = find(Rules, { name: 'no-incomplete-keys' });

        it('should be an instance of Rule', function () {
            rule.should.be.instanceOf(Rule);
        });

        it('should have name', function () {
            rule.name.should.equal('no-incomplete-keys');
        });

        it('should be WARN', function () {
            rule.logLevel.should.equal(LogLevel.WARN);
        });

        it('should return instance of TestResult', function () {
            const result = rule.testFn(master, test);

            result.should.be.instanceOf(TestResult);
        });

        it('should find incomplete keys', function () {
            const result = rule.testFn(master, test);
            result.should.have
                .property('data')
                .with.members(['INCOMPLETE_KEY']);
        });
    });
});
