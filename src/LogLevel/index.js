'use strict';

/**
 * LogLevel
 *
 * Available log levels for Rules
 * @typedef {Object} LogLevel
 * @property {Number} ERROR
 * @property {Number} WARN
 */
const LogLevel = Object.freeze({
    ERROR: { name: 'error', value: 0 },
    WARN: { name: 'warn', value: 1 },
});

export default LogLevel;
