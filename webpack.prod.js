const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/main.js')
    },
    output: {
        filename: './js/[name].js',
        clean: true
    },
    performance: require('./webpack/others/performance'),
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
    ],
    devServer: require('./webpack/others/server')
}


