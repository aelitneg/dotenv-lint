const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding
const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'env-complete.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new NodemonPlugin()],
};
