/* eslint-disable */
const Path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const baseConfig = require("./webpack.config.base");
const projectDir = Path.resolve(__dirname, "../");
const buildDir = Path.resolve(projectDir, "build");

const devServerConfig = {
    host: "0.0.0.0",
    port: 8082,
    disableHostCheck: true,
    publicPath: "/",
    contentBase: "public",
    stats: {colors: true},
    before: function(app, instance) {
        app.use(function(req, res, next) {
            if (req.url.match(/.*.br.*/)) {
                res.header('Content-Encoding', "br");
            }
            next();
        });
    },
    proxy: {
        "/images": {
            target: "https://www.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/queried-options.html": {
            target: "https://www.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/grouped-options.html": {
            target: "https://www.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },   
        "/getRtaLocationByName.html" : {
            target: "https://www.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/*/sendOTP.html": {
            target: "https://stg2.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/*/verifyOTP.html": {
            target: "https://stg2.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/get-city-from-pincode.html": {
            target: "https://stg2.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/*/verifyMobileViaCall.html": {
            target: "https://stg2.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/*/checkCallVerifStatus.html": {
            target: "https://stg2.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/pinCodePrefixes.html": {
            target: "https://stg2.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/isOneTabLoginAttemptedInSession.html": {
            target: "https://stg2.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/user-popup-cancellation.html": {
            target: "https://stg2.bankbazaar.com",
            secure: false,
            changeOrigin: true
        },
        "/signin_social.html": {
            target: "https://stg2.bankbazaar.com",
            secure: false,
            changeOrigin: true
        }
    },
    stats: {
        children: false,
        warnings: false,
        modules: false,
        assets: true,
        entrypoints: true,
        builtAt: true,
        hash: false,
        timings: false,
        version: false
    }
};


class HTMLWebpackExtensionChangePlugin {
    constructor(options) {
        this.options = options;
    }

    apply (compiler) {
        const self = this;
        compiler.hooks.compilation.tap('HtmlWebpackChangeAssetsExtensionPlugin', function (compilation) {
            const hook = compilation.hooks.htmlWebpackPluginAlterAssetTags;
            hook.tapAsync(
                'HTMLWebpackExtensionChangePlugin',
                function (data, cb) {
                    const compressionFormat = self.options.esVariant == "es2016" ? "br" : "gz";
                    data.head = data.head.map(function(tag) {
                        if (tag.tagName == "link") {
                            tag.attributes.href += `.${compressionFormat}.css`;
                        } else if (tag.tagName == "script" && !tag.attributes.src.includes("runtime")) {
                            tag.attributes.src += `.${compressionFormat}.js`;
                        }
                        return tag;
                    });
                    return cb(null, data)
                }
            )
        });
    }
}

module.exports = (env, argv) => {
    const sector = "IN";
    const esVariant = "es2016";
    const packageVersion = require(Path.resolve(projectDir, "package.json")).version;
    const htmlWebpackPlugin = new HTMLWebpackPlugin({
        template: Path.resolve("public/index.html"),
        minify: false,
        inject: "head"
    });

    const config = {esVariant, sector, packageVersion};
    if (argv.mode == "production") {
        Object.assign(config, {
            chunkHashAlgo: "hash",
            additionalPlugins: [
                htmlWebpackPlugin,
                new HTMLWebpackExtensionChangePlugin({esVariant, sector})
            ],
            additionalConfig: {
                devtool: "none",
                devServer: devServerConfig
            }
        });
    } else {
        Object.assign(config, {
            additionalPlugins: [
                htmlWebpackPlugin
            ],
            additionalConfig: {
                devtool: "inline-source-map",
                devServer: devServerConfig
            }
        });
    }

    return baseConfig.createBundlesFor(config);
}
