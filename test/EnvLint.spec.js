import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import EnvLint from '../src/EnvLint';
import EnvLintResult from '../src/EnvLintResult';

chai.use(chaiAsPromised);
chai.should();

describe('EnvLint', function () {
    describe('constructor', function () {
        it('should be instance of EnvLint', function () {
            const envLint = new EnvLint();
            envLint.should.be.instanceOf(EnvLint);
        });

        describe('defaults', function () {
            const envLint = new EnvLint();

            it('should not have default path', function () {
                envLint.should.have.property('path').with.equal('');
            });

            it('should have a default master', function () {
                envLint.should.have
                    .property('master')
                    .with.equal('.env.template');
            });

            it('should have a default test', function () {
                envLint.should.have.property('test').with.members(['.env']);
            });
        });

        describe('arguments', function () {
            const path = '/test';
            const master = '.env.example';
            const test = ['.env.test'];

            const envLint = new EnvLint(path, master, test);

            it('should accept path argument', function () {
                envLint.should.have.property('path').with.equal(path);
            });

            it('should accept master argument', function () {
                envLint.should.have.property('master').with.equal(master);
            });

            it('should accept test argument', function () {
                envLint.should.have.property('test').with.members([test[0]]);
            });
        });
    });

    describe('load', async function () {
        it('should load master file', function (done) {
            const envLint = new EnvLint('./test');
            return envLint
                .load()
                .then(function () {
                    envLint.files.should.have
                        .property('.env.template')
                        .with.property('data')
                        .with.property('COMPLETE_KEY');
                })
                .should.notify(done);
        });

        it('should load test file', function (done) {
            const envLint = new EnvLint('./test');
            return envLint
                .load()
                .then(function () {
                    envLint.files.should.have
                        .property('.env')
                        .with.property('data')
                        .with.property('COMPLETE_KEY');
                })
                .should.notify(done);
        });
    });

    describe('lint', function () {
        const envLint = new EnvLint('./test');

        it('should return instance of Array of EnvLintResult with results', function (done) {
            return envLint
                .load()
                .then(function () {
                    const results = envLint.lint();

                    results.should.be.instanceOf(Array);
                    const [result] = results;

                    result.should.be.instanceOf(EnvLintResult);

                    result.should.have
                        .property('missingKeys')
                        .with.length(1)
                        .and.members(['MISSING_KEY']);

                    result.should.have
                        .property('incompleteKeys')
                        .with.length(1)
                        .and.members(['MISSING_VALUE']);
                })
                .should.notify(done);
        });
    });

    describe('findMissingKeys', function () {
        const envLint = new EnvLint('/test');

        const master = {
            a: true,
            b: false,
        };

        const test = {
            a: true,
        };

        it('should return array of missing keys', function () {
            const result = envLint.findMissingKeys(master, test);
            result.should.be
                .instanceOf(Array)
                .and.have.length(1)
                .and.have.members(['b']);
        });
    });

    describe('findIncompleteKeys', function () {
        const envLint = new EnvLint('/test');

        const master = {
            a: true,
            b: false,
        };

        const test = {
            a: true,
            b: '',
        };

        it('should return array of keys with incomplete values', function () {
            const result = envLint.findIncompleteKeys(master, test);
            result.should.be
                .instanceOf(Array)
                .and.have.length(1)
                .and.have.members(['b']);
        });
    });

    describe('run', function () {
        it('should return Array of EnvLintResult', function (done) {
            return EnvLint.run('./test')
                .then(function (results) {
                    results.should.be.instanceOf(Array);

                    const [result] = results;
                    result.should.be.instanceOf(EnvLintResult);
                })
                .should.notify(done);
        });

        it('should reject when files are not found', function () {
            return EnvLint.run('/doesNotExist').should.be.rejected;
        });
    });
});
