const webpack = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'envlint.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node',
            raw: true,
            entryOnly: true,
        }),
        new NodemonPlugin({
            args: ['--path', '/test'],
        }),
    ],
    stats: {
        // Ignore warnings due to yarg's dynamic module loading
        warningsFilter: [/node_modules\/yargs/],
    },
};
