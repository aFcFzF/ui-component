/**
*@file: webpack.base.conf.js
*@author: afcfzf (9301462@qq.com)
*/

const {join, resolve} = require('path');
const webpack = require('webpack');
const glob = require('glob');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// markdown 配置
const slugify = require('transliteration').slugify;
const md = require('markdown-it')();
const striptags = require('./strip-tags');

function convert(str) {
    str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
        return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
    });
    return str;
}

function wrap(render) {
    return function () {
        return render.apply(this, arguments)
            .replace('<code v-pre class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">');
    };
}

// markdown 配置_结束

const extractCSS = new ExtractTextPlugin({
    filename: 'assets/css/[name].css',
    allChunks: true
});
const extractLESS = new ExtractTextPlugin({
    filename: 'assets/css/[name].css',
    allChunks: true
});

const entries = {};
const chunks = [];
const htmlWebpackPluginArray = [];
glob.sync('./src/pages/**/app.js').forEach(path => {

    const chunk = path.split('./src/pages/')[1].split('/app.js')[0];
    entries[chunk] = path;
    chunks.push(chunk);

    const filename = chunk + '.html';
    const htmlConf = {
        filename: filename,
        template: path.replace(/.js/g, '.html'),
        inject: 'body',
        favicon: './src/assets/img/logo.png',
        hash: true,
        chunks: ['commons', chunk]
    };
    htmlWebpackPluginArray.push(new HtmlWebpackPlugin(htmlConf));
});

const styleLoaderOptions = {
    loader: 'style-loader',
    options: {
        sourceMap: true
    }
};

const cssOptions = [
    {
        loader: 'css-loader',
        options: {
            sourceMap: true
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true
        }
    }
];

const lessOptions = [
    ...cssOptions,
    {
        loader: 'less-loader',
        options: {
            sourceMap: true
        }
    },
    {
        loader: 'sass-resources-loader',
        options: {
            // resolve 必须是绝对路径，绝对路径！！
            resources: [resolve(__dirname, '../src/themes/var.less')]
        }
    }
];

const stylOptions = [...cssOptions, {
    loader: 'stylus-loader',
    options: {
        sourceMap: true
    }
}];

const config = {
    entry: entries,
    output: {
        path: resolve(__dirname, '../dist'),
        filename: 'assets/js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': join(__dirname, '../src'),
            '@theme': join(__dirname, '../src/components/theme-pkg'),
            '@assets': join(__dirname, '../src/assets'),
            '@components': join(__dirname, '../src/components')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                use: ['fecs-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                            use: cssOptions,
                            fallback: styleLoaderOptions
                        })),
                        styl: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                            use: stylOptions,
                            fallback: styleLoaderOptions
                        })),
                        less: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                            use: lessOptions,
                            fallback: styleLoaderOptions
                        })),
                        postcss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                            use: cssOptions,
                            fallback: styleLoaderOptions
                        }))
                    }
                }
            },
            {
                test: /\.md$/,
                loader: 'vue-markdown-loader',
                options: {
                    use: [
                        [require('markdown-it-anchor'), {
                            level: 2,
                            slugify: slugify,
                            permalink: true,
                            permalinkBefore: true
                        }],
                        [require('markdown-it-container'), 'demo', {
                            validate(params) {
                                return params.trim().match(/^demo\s*(.*)$/);
                            },

                            render(tokens, idx) {
                                var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                                if (tokens[idx].nesting === 1) {
                                    var description = (m && m.length > 1) ? m[1] : '';
                                    var content = tokens[idx + 1].content;
                                    var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                                    var script = striptags.fetch(content, 'script');
                                    var style = striptags.fetch(content, 'style');
                                    var jsfiddle = {
                                        html: html,
                                        script: script,
                                        style: style
                                    };
                                    var descriptionHTML = description
                                        ? md.render(description)
                                        : '';

                                    jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));

                                    return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                                    <div class="source" slot="source">${html}</div>
                                    ${descriptionHTML}
                                    <div class="highlight" slot="highlight">`;
                                }
                                return '</div></demo-block>\n';
                            }
                        }],
                        [require('markdown-it-container'), 'tip'],
                        [require('markdown-it-container'), 'warning']
                    ],
                    preprocess(MarkdownIt, source) {
                        MarkdownIt.renderer.rules['table_open'] = function () {
                            return '<table class="table">';
                        };
                        MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
                        return source;
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    use: cssOptions,
                    fallback: styleLoaderOptions
                }))
            },
            {
                test: /\.less$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    use: lessOptions,
                    fallback: styleLoaderOptions
                }))
            },
            {
                test: /\.styl$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    use: stylOptions,
                    fallback: styleLoaderOptions
                }))
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        root: resolve(__dirname, 'src'),
                        attrs: ['img:src', 'link:href']
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|mp4)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'assets/img/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 3,
                    name: 'commons',
                    enforce: true
                }
            }
        }
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        extractLESS,
        extractCSS
    ]
};
config.plugins = [...config.plugins, ...htmlWebpackPluginArray];
module.exports = config;
