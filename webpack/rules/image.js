module.exports = {
    test: /\.(png|jpg|svg|jpeg|gif)$/i,
    type: 'asset/resource',
    exclude: /fonts/,
    generator: {
        filename: './images/[name][ext]'
    }
}
