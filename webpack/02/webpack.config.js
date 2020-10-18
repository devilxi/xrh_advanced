//commonJS 的语法
const path = require('path')
module.exports={
    // mode:'development', //打包模式/
    //入口
    entry:'./src/index.js',
    //打包位置
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist') //必须用绝对路径
    },
    //webpack 默认只能打包js,其余的打包方式在module里面处理
    module:{
        rules:[
            //打包图片
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
            //打包sass
            // {
            //     test: /\.scss$/,
            //     use: {
            //         loader:'scss-loader'
            //     }
            // }
        ]
    }
}