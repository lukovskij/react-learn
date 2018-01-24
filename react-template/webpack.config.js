const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context : __dirname,
    entry : './src/main.js',
    output : {
        path:  path.resolve(__dirname,'public', 'build'),
        publicPath : '/build/',
        filename: 'bundle.js'
    },
    devtool : NODE_ENV === 'development' && 'eval-source-map',
    watch : NODE_ENV === 'development',
    module:{
        loaders : [
            {
                test : /\.(js|jsx)$/,
                exclude : '/node_modules/',
                loader : 'babel-loader'
            }
        ]
    },
    plugins : [
        new webpack.DefinePlugin({
            'process.env' : {
                'NODE_ENV' : JSON.stringify(NODE_ENV)
            }
        })
    ]
}