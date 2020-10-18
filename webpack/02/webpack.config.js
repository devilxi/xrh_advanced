//commonJS 的语法
const path = require('path')
module.exports={
    // mode:'prouction', //打包模式
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
            {
                test:'/\.jpg/',
                use:{
                    loader:'file-loader'
                }
            }
        ]
    }
}