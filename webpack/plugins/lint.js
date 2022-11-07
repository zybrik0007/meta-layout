const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = new ESLintPlugin({context: path.resolve(__dirname, './src')})
