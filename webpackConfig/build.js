const path = require('path')
var webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


const argvs = process.argv.slice(2)


const webpackConfig = {

    mode: 'production',

    optimization:{
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true,
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.(sa|sc|c)ss$/g,  //正则表达式，用于匹配需要优化或者压缩的资源名。默认值是 /\.css$/g
                cssProcessor: require('cssnano'),
                //用于压缩和优化CSS 的处理器，默认是 cssnano
                //这是一个函数，应该按照 cssnano.process 接口(接受一个CSS和options参数，返回一个Promise)
                cssProcessorPluginOptions: {
                  preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true  // 表示插件能够在console中打印信息
    
            })
        ]
    },

    module:{
        rules:[
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },'css-loader?modules', 'sass-loader'
                ]
            },
        ]
    },
    plugins:[

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash:5].css',
            chunkFilename: '[id].css',
        }),

        new CleanWebpackPlugin({
			root:__dirname,
			verbose: true,//是否在console中打印日志，true为是
			dry: false,//false为默认值，代表删除，true代表模拟删除，其实是不删除
			watch: true,//默认为false，代表在此编译的时候不删除，true为删除，开启watch的时候，最好为true
			exclude: [ 'index.html' ],//表示忽略的文件
		})
    ]
}





module.exports =  webpack(webpackMerge(webpackBaseConfig, webpackConfig ), function(err,  stas){
        console.log('err', err)
})