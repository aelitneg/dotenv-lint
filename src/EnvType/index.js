'use strict';

/**
 * EnvType
 *
 * Types of EnvFiles
 * @typedef {Object} EnvType
 * @property {Symbol} MASTER
 * @property {Symbol} TEST
 */

const EnvType = Object.freeze({
    MASTER: Symbol('MASTER'),
    TEST: Symbol('TEST'),
});

export default EnvType;
