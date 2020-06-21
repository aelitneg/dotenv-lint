import chai from 'chai';

import LogLevel from '../src/LogLevel';

chai.should();

describe('LogLevel', function () {
    describe('ERROR', function () {
        it('should be named "error"', function () {
            LogLevel.ERROR.should.have.property('name').equal('error');
        });

        it('should be level 0', function () {
            LogLevel.ERROR.should.have.property('value').equal(0);
        });
    });

    describe('WARN', function () {
        it('should be named "warn"', function () {
            LogLevel.WARN.should.have.property('name').equal('warn');
        });

        it('should be level 1', function () {
            LogLevel.WARN.should.have.property('value').equal(1);
        });
    });
});
