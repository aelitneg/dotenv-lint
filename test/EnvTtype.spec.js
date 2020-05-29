import chai from 'chai';

import EnvType from '../src/EnvType';
chai.should();

describe('EnvType', function () {
    it('should have MASTER type', function () {
        EnvType.should.have.property('MASTER');
    });

    it('should have TEST type', function () {
        EnvType.should.have.property('TEST');
    });
});
