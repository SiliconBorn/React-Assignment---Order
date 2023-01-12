const path = require('path');
const HTMLWebPlugin = require('html-webpack-plugin');


module.exports={

    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js',
    },
    devServer:{
      historyApiFallback:true
    },
    plugins:[
        new HTMLWebPlugin({
            template:'./src/index.html'
        }),
    ],
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react']
                    }
                }
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx'],
    }
}