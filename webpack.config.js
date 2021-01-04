const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

module.exports = (env) => ({
    entry: './src/index.js',
    mode: env.environment,
    devServer: {
        historyApiFallback: true
      },
    context: __dirname,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "build"),
        publicPath: '/'
    },
    performance : {
    hints : false
    },
    optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    mangleExports: 'deterministic',
    nodeEnv: 'production',
    flagIncludedChunks: true,
    concatenateModules: true,
    splitChunks: {
        hidePathInfo: true,
        minSize: 30000,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
    },
    emitOnErrors: false,
    checkWasmTypes: true,
    minimize: true,
    },
    module : {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
                
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
         }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./public/index.html", filename: 'index.html'}),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'REACT_APP_BACKEND_LINK': JSON.stringify(process.env.REACT_APP_BACKEND_LINK)
            }
        }),
        new Dotenv()
    ],
});