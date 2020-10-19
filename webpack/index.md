安装webpack:
    1、npm init 
    2、npm i  webpack --save   npm i webpacl-cli --save-dev
    //webpack 翻译index.js文件
    3、npx webpack index.js
什么是webpack:
    1、webpack is a module bundler //模块打包工具【将多个模块打包到一起】
    2、模块：
        ES2015 import 语句
        CommonJS require() 语句
        AMD define 和 require 语句
        css/sass/less 文件中的 @import 语句。
     样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)
webpack配置文件：
    webpack.config.js
    npx webpack --config webpackconfig.js //webpack  已那个文件打包
    
webpack配置环节：
    Loader是什么: 用于对模块的源代码进行转换
    安装： 
        图片文件安装  file-loader
        npm i file-loader -D
        css样式安装
        npm i style-loader css-loader -D
        npm i sass-loader node-sass --save-dev
        //postcss-loader 添加前缀
        npm i -D postcss-loader
        npm i autoprefixer -D


