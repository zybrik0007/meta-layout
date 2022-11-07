const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = new FaviconsWebpackPlugin({
    logo: 'src/images/favicon.png',
    mode: 'webapp',
    devMode: 'webapp',
    prefix: '/favicons/',
    cache: true
})
