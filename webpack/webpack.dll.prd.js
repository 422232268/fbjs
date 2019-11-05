const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        bundle: ['react', 'react-router-dom', 'moment', 'axios', 'redux', 'react-redux', 'antd', 'antd-mobile', 'lodash', 'react-dom', 'redux-logger', 'redux-promise'] // 提取公共模块
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../build', '[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};
