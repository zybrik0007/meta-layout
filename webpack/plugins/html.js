const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = fs.readdirSync('./src/layout/pages');
const pagesUI = fs.readdirSync('./src/layout/ui-pages');

const page = pages.map(page => new HtmlWebpackPlugin({
        template: `./src/layout/pages/${page}/${page}.pug`,
        chunks: ['main'],
        filename: `./${page}.html`
}))

const ui = pagesUI.map(page => new HtmlWebpackPlugin({
        template: `./src/layout/ui-pages/${page}/${page}.pug`,
        chunks: ['main'],
        filename: `./ui-pages/${page}.html`
}))

module.exports = page.concat(ui)
