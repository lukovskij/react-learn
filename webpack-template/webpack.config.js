const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context : __dirname,
    entry : './main.js',
    output : {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devtool : NODE_ENV === 'development' && 'eval-source-map',
    watch : NODE_ENV === 'development',
    module:{
        loaders : [
            {
                test : /\.js$/,
                exclude : '/node_modules/',
                loader : 'babel-loader'
            }
        ]
    }
}