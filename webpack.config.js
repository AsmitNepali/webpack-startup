const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: {
                                    'autoprefixer': {},
                                },
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ],
            },
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
            },

        ],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "./js/[name].bundle.js",
    },

    plugins: [
        // sync html files dynamically
        ...glob.sync('src/html/**/*.html').map(fileName => {
            return new HtmlWebpackPlugin({
                template: fileName,
                minify: false, // Disable minification during production mode
                filename: fileName.replace("src/html/", ""),
                hash: true,
            });
        }),

        // Extracts CSS into separate files
        new MiniCssExtractPlugin({
            filename: './css/[name].css'
        }),

    ],
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
}