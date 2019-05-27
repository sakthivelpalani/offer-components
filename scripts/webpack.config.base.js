/* eslint-disable no-undef*/
const Path = require("path");
const Webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const GzipCompressionPlugin = require("compression-webpack-plugin");
const BrotliCompressionPlugin = require("brotli-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const projectDir = Path.resolve(__dirname, "../");
const buildDir = Path.resolve(projectDir, "dist/bundles");
const appDir = Path.resolve(projectDir, "src");
const globalStylesDir = Path.resolve(appDir, "styles");

const loaderRulesConfig = {
    "babelLoader_es2015": [
        {
            test: /\.(js|jsx)$/,
            include: appDir,
            use: {
                loader: "babel-loader",
                options: {
                    envName: "bundle_es2015"
                }
            }
        }
    ],
    "babelLoader_es2016": [
        {
            test: Path.resolve(appDir, "helpers/Polyfills.js"),
            use: "null-loader"
        },
        {
            test: /\.(js|jsx)$/,
            include: appDir,
            use: {
                loader: "babel-loader",
                options: {
                    envName: "bundle_es2016"
                }
            }
        }
    ],
    styleLoader: {
        test: /\.s?css$/,
        include: globalStylesDir,
        use: [
            //TODO: need to figure out how to configure fallback style loader in dev mode
            MiniCssExtractPlugin.loader,
            "css-loader?modules&importLoaders=1&localIdentName=[local]!sass-loader"
        ]
    },
    modularizedStyleLoader: {
        test: /\.s?css$/,
        include: appDir,
        exclude: globalStylesDir,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!sass-loader"
        ]
    },
    imageLoader: { 
        test: /\.(png|jpg)$/, 
        loader: "url-loader?limit=8192" 
    }
};

function computeChunkName(chunkType, esVariant, sector, packageVersion, chunkHashAlgo) {
    chunkHashAlgo = chunkHashAlgo ? `-[${chunkHashAlgo}]` : "";
    switch (chunkType) {
        case "vendor": 
            return `wc-${sector}-[name]-${esVariant}${chunkHashAlgo}.js`;
        case "css":
            return `wc-${sector}-[name]-${packageVersion}${chunkHashAlgo}.css`;
        default:
            return `wc-${sector}-[name]-${esVariant}-${packageVersion}${chunkHashAlgo}.js`;
    }
}

function getCompressionPlugin(esVariant) {
    const options = {
        test: /\.js$|\.css$/,
        threshold: 10240,
        deleteOriginalAssets: true
    };
    const gzipCompression = new GzipCompressionPlugin({
        ...options,
        asset: "[path].gz",
        algorithm: "gzip",
        filename: function(asset) {return asset.endsWith(".css.gz") ? asset + ".css" : asset + ".js";}
    });
    const brotliCompression = new BrotliCompressionPlugin({
        ...options,
        asset: "[path].br.[ext]"
    });
    return esVariant == "es2016" ? brotliCompression : gzipCompression;
}
    
const createBundlesFor = ({esVariant, sector, packageVersion, chunkHashAlgo, additionalPlugins = [], additionalConfig}) => {
    return {
        name: esVariant,
        entry: {
            offer: appDir + "/app.js"
        },
        output: {
            path: buildDir,
            filename: computeChunkName("main", esVariant, sector, packageVersion, chunkHashAlgo),
            libraryTarget: "var",
            library: "offercomponents"
        },
        module: {
            rules: [
                ...loaderRulesConfig["babelLoader_" + esVariant],
                loaderRulesConfig.modularizedStyleLoader,
                loaderRulesConfig.styleLoader,
                loaderRulesConfig.imageLoader
            ]
        },
        plugins: [
            new Webpack.DefinePlugin({__SECTOR__: `'${sector}'`}),
            new MiniCssExtractPlugin({filename: computeChunkName("css", esVariant, sector, packageVersion, chunkHashAlgo)}),
            new Webpack.HashedModuleIdsPlugin(),
            ...additionalPlugins
        ],
        optimization: {
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        filename: computeChunkName("vendor", esVariant, sector, packageVersion, chunkHashAlgo),
                        chunks: "all"
                    }
                }
            },
            minimizer: [
                new OptimizeCssAssetsPlugin({}),
                new UglifyJsPlugin({
                    parallel:true,
                    extractComments: true,
                    uglifyOptions: {
                        mangle: true 
                        // output: {
                        //     beautify: true
                        // }
                    }
                }),
                getCompressionPlugin(esVariant)
            ]
        },
        ...additionalConfig
    };
};

module.exports = {
    createBundlesFor
};
