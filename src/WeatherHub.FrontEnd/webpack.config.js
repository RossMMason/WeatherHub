const path = require("path");
//const CleanWebpackPlugin = require("clean-webpack-plugin");

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
        ]
    },
    /*plugins: [
        new CleanWebpackPlugin(["wwwroot/js/*"]),
    ]*/
};