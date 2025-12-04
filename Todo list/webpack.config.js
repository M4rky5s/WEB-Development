const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    mode: 'development',

    devServer: {
        static: path.resolve(__dirname, 'dist'),
        hot: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
        }),
    ],
};