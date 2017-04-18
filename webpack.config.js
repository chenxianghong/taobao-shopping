var webpack = require('webpack');

module.exports = {
    entry:{
        'home' : './src/js/entry.js'
    },
    // entry: ['babel-polyfill', './src/js/entry.js'],
    output:{
        path:'./assect/js/',
        filename: '[name].js',
        publicPath: 'http://localhost:8080/static/assect/js/'
    },
    module: {
        loaders:[
            {
                test: /\.css$/,loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.js$/, 
                loader: 'babel-loader',
                exclude:function(path){//匹配不希望处理文件的路径,node_modules里文件太多，不希望匹配
                    var isNpmModule = !!path.match('node_modules');
                    return isNpmModule;
                }, 
                query:{
                    presets:['es2015','react',"stage-0"]//返回的值通过query的格式来传递给es2015,因为用ES6来编写的话，用它来进行语法的解析
                }
            },
            {
                test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
            },
            {
                test: /\.jsx$/, loader: 'babel-loader!jsx-loader?harmony'
            }

        ]
    },
    devtool: 'source-map',
    resolve : {
        extensions : ['.js','.jsx']
    }
}