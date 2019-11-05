const path = require('path');
const webpack = require('webpack');
// const theme = require('../theme');
// const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    'mode': 'development',
    'devtool': 'cheap-module-eval-source-map',
    'entry': {
        'main': [
            'eventsource-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            path.resolve(__dirname, '../client/main.js')
        ],
        'lodash': 'lodash',
    },
    'output': {
        'filename': '[name].bundle.js',
        'publicPath': '/',
        'path': path.resolve(__dirname, '../public/'),
    },
    'module': {
        'rules': [
            {
                'enforce': 'pre',
                'test': /\.(js|jsx)$/,
                'exclude': /node_modules/,
                'loader': 'eslint-loader',
            },
            {
                'test': /\.(js|jsx)$/, // babel 转换为兼容性的 js
                'exclude': /node_modules/,
                'loader': 'babel-loader',
                'query': {
                    'presets': ['react', 'latest', 'stage-0', 'react-hmre'],
                    'plugins': [['import', {libraryName: 'antd-mobile', style: 'css'}]]
                },
                'include': path.resolve(__dirname, '../client')
            },
            {
                'test': /\.css$/,
                'loader': ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                'test': /\.less$/,
                'loader': ['style-loader', 'css-loader', {
                    'loader': 'less-loader',
                    'options': {
                        // 'modifyVars': theme,
                        'javascriptEnabled': true
                    }
                }]
            },
            {
                'test': /\.(png|jpg|gif|ico)$/,
                'use': [
                    {
                        'loader': 'url-loader',
                        'options': {
                            'limit': 8192
                        }
                    }
                ]
            },
            {
                'test': /\.(woff|ttf|eot)$/,
                'use': [
                    {
                        'loader': 'file-loader',
                        'options': {}
                    }
                ]
            },
            {
                'test': /\.svg$/,
                'use': [
                    {
                        'loader': 'svg-react-loader',
                    },
                ],
            },
        ]
    },
    'devServer': {
        'historyApiFallback': true,
        'contentBase': '../',
        'hot': true
    },
    'resolve': {
        'extensions': [
            '.js',
            '.jsx',
            '.png',
            '.gif',
            '.jpg',
            '.ico',
            '.scss',
            '.css'
        ],
        'alias' :{
            '@client': path.resolve(__dirname, '../client'),
            '@server': path.resolve(__dirname, '../server')
        }
    },
    'plugins': [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            'hase': true,
            'title': '调试页面',
            'filename': 'index.html',
            'template': path.resolve(__dirname, '../views/index.ejs'),
            'inject': 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedChunksPlugin()
    ]
}
