//commonJS 的语法
const path = require('path');
//打包完成生成一个html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports={
    mode:'production', //打包模式/
    // devtool:'cheap-module-eval-source-map', //映射到具体什么位置报错 映射关系
    //production - cheap-module-source-map
    //入口配置
    entry:{
        main:'./src/main.js', //对应生成的文件main.js
        // sub:'./src/index.js'
    },
    //打包配置
    output:{
        // publicPath:'http://cdn.com.cn', //添加js的前缀地址
        // filename:'main.js',
        filename:'[name].js', //生成多个文件
        path:path.resolve(__dirname,'dist') //必须用绝对路径
    },
    //第三方的配置项
    plugins:[new HtmlWebpackPlugin({
        template:'./src/index.html'
    }), new CleanWebpackPlugin()],
    //打包规则： webpack 默认只能打包js,其余的打包方式在module里面处理
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