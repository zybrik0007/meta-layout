const {ProvidePlugin} = require('webpack');

module.exports = new ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
})
