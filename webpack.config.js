const webpack = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'env-complete.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node',
            raw: true,
            entryOnly: true,
        }),
        new NodemonPlugin({
            args: ['--path', './test'],
        }),
    ],
};
