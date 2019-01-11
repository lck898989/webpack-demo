const  path = require('path');
let file = function(res){
    return 'js/[name]/index.js'
}
let htmlPlugin = require('html-webpack-plugin');
let vueloaderPlugin = require('vue-loader/lib/plugin');
//css打包插件
// let ExtractPlugin = require('extract-text-webpack-plugin');
module.exports = {
    mode : 'development',
    //可以是字符串，数组和对象
    // entry : ['./src/js/index.js','./src/js/main.js'],
    //创建多页应用时候的配置选项
    entry:{
        index : './src/js/index.js',
        main  : './src/js/main.js',
        cart  : './src/js/cart.js'
    },
    output : {
        //打包后文件进入的路径
        path     : path.resolve(__dirname,'dist/'),
        filename : file,
        //配置线上绝对路径
        // publicPath : 'http://www.listore.top'
    },
    //模块配置
    module:{
        rules : [
            //加载编译.jsx文件
            {
                test    : /\.js?$/,
                include : [
                    path.resolve(__dirname,'src/js/')
                ],
                //node_modules不进行语法转换提高编译时间
                exclude : /node_modules/,
                loader  : 'babel-loader',
            },
            //编译加载css文件
            {
                test : /\.css?$/,
                //加载顺序是从右向左向将css加载
                use  : ['style-loader',{
                    loader : 'css-loader',
                    options : {
                        importLoaders : 1
                    }
                },{
                    loader  : 'postcss-loader',
                    options : {
                        ident : 'postcss',
                        plugins : [
                            require('postcss-import')(),
                            require('autoprefixer')()
                        ],
                        config : {
                            path : ''
                        }
                    } 
                }]
            },
            {
                test : /\.less?$/,
                loader : [
                    'style-loader',{
                        loader : 'css-loader',
                        options : {
                            importLoaders : 1
                        }
                    },{
                        loader  : 'postcss-loader',
                        options : {
                        ident : 'postcss',
                        plugins : [
                            require('postcss-import')(),
                            require('autoprefixer')()
                        ],
                        config : {
                            path : ''
                            }
                        } 
                    },{
                        loader : 'less-loader'
                    }
                ]
            },
            {
                test : /\.hbs?$/,
                loader : 'handlebars'
            },
            {
                test : /\.(png|jpeg|jpg|svg|gif)$/,
                loaders : [
                    'url-loader?name=[name]-[hash:5].[ext]?limit=3000',
                    'image-webpack-loader?mozjpeg=true'
                ]
            },
            //加载vue文件
            {
                test : /\.vue$/,
                use  : ['vue-loader'],
                exclude : /node_modules/
            }
        ]
    },
    plugins : [
        new vueloaderPlugin(),
        //生成多页面应用需要创建多个htmlPlugin实例
        new htmlPlugin({
            //生成的html的title
            title    : '首页',
            //输出文件的目录指定
            filename : 'html/index.html',
            //打包html文件的模板文件
            template : './src/view/index/index.html',
            //脚本注入到head标签还是body标签
            inject   : true,
            //公共的页面和属于该页面的html放到这里,会将index.js和main.js文件注入到该页面中去
            chunks   : ['index'],
            //除了cart.js的chunk被排除之外其余的都会被注入到该页面
            excludeChunks : ['cart','main']
        }),
        new htmlPlugin({
            //生成的html的title
            title    : '主页',
            //输出文件的目录指定
            filename : 'html/main.html',
            //打包html文件的模板文件
            template : './src/view/main/main.html',
            //脚本注入到head标签还是"body"标签
            inject   : true,
            chunks   : ['main']
        }),
        new htmlPlugin({
            //生成的html的title
            title    : '购物车',
            //输出文件的目录指定
            filename : 'html/cart.html',
            //打包html文件的模板文件
            template : './src/view/cart/cart.html',
            //脚本注入到head标签还是"body"标签
            inject   : true,
            chunks   : ['cart']
        }),
        // new ExtractPlugin("css/[name].css")
    ]

}