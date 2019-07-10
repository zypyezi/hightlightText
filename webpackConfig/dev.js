const path = require('path')
var webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./base')

const webpackConfig = {

    mode: 'development',
    devtool: 'inline-source-map',

    module:{
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", 'css-loader?modules']
            },
            {
                test: /\.scss$/,
                use: ["style-loader", 'css-loader?modules','sass-loader']
            }
        ]
    },
    plugins:[

    ],
    devServer: {
        disableHostCheck: true,
        port: 8082,
        host: '0.0.0.0',
        inline: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        contentBase: path.join(__dirname, './src'),
        proxy: {

        }
      }
}


module.exports =  webpackMerge(webpackBaseConfig, webpackConfig )