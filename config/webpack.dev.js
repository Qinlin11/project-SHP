const path = require("path");
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

const getStyleLoaders = (pre) => {
    return [
        "vue-style-loader", // 提出css成单独的文件,
        'css-loader',
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        pre
    ].filter(Boolean)
}

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        path: undefined,
        // 输出js文件名
        filename: 'static/js/[name].js',
        // 给打包输出的其他文件命名
        chunkFilename: 'static/js/[name].chunk.js',
        // 处理图片、字体等其他资源名字
        assetModuleFilename: 'static/media/[hash:10][ext][query]',

    },
    // 加载器
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: getStyleLoaders(),
            },
            {
                test: /\.less$/,
                use: getStyleLoaders("less-loader"),
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader"),
            },
            {
                test: /\.styl$/,
                use: getStyleLoaders("stylus-loader"),
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            // 处理其他资源
            {
                test: /\.(woff2?|ttf)$/,
                type: "asset/resource",
            },
            // 处理js
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                },
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    // 开启缓存
                    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/vue-loader"),
                },
            },
        ],
    },
    plugins: [
        new ESLintWebpackPlugin({
            // 指定检查文件
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules", // 默认值
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new VueLoaderPlugin(),
        // cross-env定义的环境变量给打包工具使用
        // DefinePlugin定义环境变量给源代码使用，从而解决vue3页面警告的问题
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),


    ],
    optimization:{
        //代码分割配置
        splitChunks: {
            chunks: "all",
            //其他都用默认
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
    },

    // webpack解析模块加载选项
    resolve: {
        // 自动补全文件扩展名
        extensions: [".vue", ".js", ".json"],
        // 路径别名
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
    },

    mode: 'development',
    devtool: "cheap-module-source-map",
    // 其他省略
    devServer: {

        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                changeOrigin: true,
                // pathRewrite: {'^/api': ''}
            }
        }
    },
}
