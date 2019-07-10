const path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')



const ENV = process.env.ENV

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}


const webpackConfig = {
    entry : './src/index.js',
    output:{
        filename:'bundle.[hash:5].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath:''
    },

    resolve: {
        alias: {
            SRC: path.join(__dirname, '../src')
        }
    },


    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options:{
                        "plugins": [["import", {
                            "libraryName": "antd",//按需引入antd样式
                            "style": true
                        }
                        ]]
                    }

                }
            },{
            test: /\.(png|jpg|gif|ico|svg|woff)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        }, {
            test: /\.(eot|ttf)$/,
            use: {
                loader: 'file-loader'
            }

        }, 
                   
       ]
    },
    plugins:[


        new HtmlWebpackPlugin({
            title : '',    //生成html文件的标题
            filename : 'index.html', //生成文件名字
            template : './index.html',
            inject : true,   // true |  body | head |false -- script标签的位置
            favicon : '' , //<link rel="shortcut icon" href="example.ico">
            chunksSortMode: 'none', //如果使用webpack4将该配置项设置为'none'
            minify : {  // 压缩
                removeComments : true,

            },
            hash :  false, // 是否生成hash添加在引入文件地址的末尾
            //  自定义字段

            _title_ : '自定义title'  // <%= htmlWebpackPlugin.options.__title__ %>
        }),

        new webpack.DefinePlugin({
             "process.env.NODE_ENV": JSON.stringify(ENV)
        })
    ]
}


module.exports = webpackConfig
