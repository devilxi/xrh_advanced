//commonJS 的语法
const path = require('path');
//打包完成生成一个html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports={
    // mode:'development', //打包模式/
    //入口
    entry:'./src/index.js',
    //打包位置
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist') //必须用绝对路径
    },
    plugins:[new HtmlWebpackPlugin({
        template:'src/index.html'
    }), new CleanWebpackPlugin()],
    //webpack 默认只能打包js,其余的打包方式在module里面处理
    module:{
        rules:[
            //打包图片文件
            {
                test: /\.(jpg|png|gif)$/,
                use:{
                    loader:'file-loader',
                    options:{
                        //打包的图片名
                        name:'[name]_[hash].[ext]',
                        //存储图片的文件夹
                        outputPath:'images/'
                    }
                }
            },
            //打包css文件
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
            },
            //打包sass
            {
                test:/\.scss$/,
                use: ['style-loader','css-loader','sass-loader','postcss-loader'] //从下到上从右到左的执行顺序
            }
        ]
    }
}