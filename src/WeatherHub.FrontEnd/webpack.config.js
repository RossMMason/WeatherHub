const path = require("path");
//  HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './ts/index.ts',
    output: {
        path: path.resolve(__dirname, "widgets"),
        filename: "weather-hub-widget.js",
        publicPath: "/widgets",
        libraryTarget: 'var',
        library: 'weatherHub'
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    externals: {
        jquery: 'jQuery',
        toastr: 'toastr'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            /*{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }*/
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["wwwroot/js/*"]),
        /*new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash].css"
        })*/
    ]
};