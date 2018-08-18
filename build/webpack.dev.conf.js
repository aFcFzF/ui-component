/**
*@file: webpack.dev.conf.js
*@author: afcfzf (9301462@qq.com)
*/

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '127.0.0.1',
        port: 8010,
        historyApiFallback: false,
        noInfo: true,
        proxy: {
            '/api': {
                target: 'http://bcrkkb.6v:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        open: true,
        openPage: 'doc.html'
    }
});

module.exports = devWebpackConfig;
