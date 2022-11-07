const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    test: /\.(scss|css)$/,
    use: [MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
        {
            loader: 'sass-resources-loader',
            options: {
                resources: ['./src/styles/mixins.scss']
            }
        }]
}
