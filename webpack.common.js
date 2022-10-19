const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: ["web", "es5"],
    module: {
        rules: [
            {
                test: /\.(js|tsx|ts)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg)/,
                type: 'asset/resource'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        })
    ],

}