module.exports = {
    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
    type: 'asset/resource',
    generator: {
        filename: './fonts/[name][ext]'
    }
}
