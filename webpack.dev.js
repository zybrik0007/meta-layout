const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/main.js')
    },
    output: {
        filename: './js/[name].js',
        clean: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            require('./webpack/rules/pug'),
            require('./webpack/rules/js'),
            require('./webpack/rules/css'),
            require('./webpack/rules/font'),
            require('./webpack/rules/image')
        ]
    },
    plugins: [
        require('./webpack/plugins/css'),
        require('./webpack/plugins/jquery'),
        ...require('./webpack/plugins/html'),
        require('./webpack/plugins/favicon'),
        new ESLintPlugin({context: path.resolve(__dirname, './src')})
    ],
    devServer: require('./webpack/others/server')
}


