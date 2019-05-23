/* eslint-disable no-undef*/
const Path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");

const baseConfig = require("./webpack.config.base");
const projectDir = Path.resolve(__dirname, "../");

const createManifestPlugin = (bundleName, sector, packageVersion, seed) => {
    return new ManifestPlugin({
        fileName: "asset-manifest.json", 
        seed,
        map: (fd) => {
            if (fd.name.match(/\.css/)) {
                return {
                    ...fd,
                    name: fd.name.replace(`-${bundleName}`, ""),
                    path: fd.path.replace(`-${bundleName}`, "")
                };
            }
            return fd;
        },
        generate: (seed, assets) => {
            return assets.reduce(
                (manifest, asset) => {
                    if (asset.name.match(/LICENSE$/)) {
                        return manifest;
                    }

                    let newAssetName = `${sector}-${bundleName}-${asset.name}`;
                    if (newAssetName.match(/[a-z0-9]{20}.*gz.*/) || newAssetName.match(/[a-z0-9]{20}.*br.*/)) {
                        // These look like hashes which anyway are not useful. Lets make them better
                        newAssetName = newAssetName.replace(new RegExp(`-${bundleName}-${packageVersion}-[a-z0-9]{20}`), "");
                        newAssetName = newAssetName.replace(new RegExp(`-${packageVersion}-[a-z0-9]{20}`), "");
                        newAssetName = newAssetName.replace(new RegExp(`-${bundleName}-[a-z0-9]{20}`), "");
                        newAssetName = newAssetName.replace(new RegExp(`wc-${sector}-`), "");
                    }
                    manifest[newAssetName] = asset.path;
                    return manifest;
                },
                seed
            );
        }
    });
};

module.exports = (env, argv) => {
    const assets = Object.create(null);
    const sectors = argv.sector ? [argv.sector] : ["IN"];
    const esVariants = argv.esVariant? [argv.esVariants] : ["es2015", "es2016"];
    const packageVersion = require(Path.resolve(projectDir, "package.json")).version;
    const bundles = [];
    sectors.forEach((sector) => {
        esVariants.forEach((esVariant) => {
            bundles.push(
                baseConfig.createBundlesFor({
                    esVariant, 
                    sector, 
                    packageVersion, 
                    chunkHashAlgo: "contenthash",
                    additionalPlugins: [
                        createManifestPlugin(esVariant, sector, packageVersion, assets)
                    ], 
                    additionalConfig: {
                        stats: {
                            children: false,
                            warnings: false,
                            modules: false,
                            assets: false,
                            entrypoints: false,
                            builtAt: false,
                            hash: false,
                            timings: false,
                            version: false
                        }
                    }
                })
            );
        });
    });
    return bundles;
};
