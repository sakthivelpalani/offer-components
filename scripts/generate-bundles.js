/*eslint-disable no-console, no-undef*/

const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const lodash = require("lodash");
const chalk = require("chalk");

const projectDir = path.resolve(__dirname, "../");
const targetDir = path.resolve(projectDir, "dist/bundles");

/**
 * 
 * Implementation Notes:
 * ---------------------
 * Call the Webpack Bundle Generator which will generate the various standalone bundles for each browser, sector. 
 * The respective configurations are all in webpack.config.bundle.js and at the end it will generate asset-manifest.json
 * which will contain the bundle name along with the hash-based filename for that bundle. Even though we generate
 * multiple ES specific bundles, there is no need for separate ES specific bundles for CSS... but that has been left to 
 * be generated so that we dont run into any unforeseen CSS-to-JS-variable naming issues. Similarly there is no need for 
 * separate vendor bundles for each sector for now... but again has been left to be generated. 
 * 
 * We still want asset-manifest.json to be perfect devoic of any orphaned assets and also unwanted redirections to the 
 * compressed assets. Similarly, there will be license related artifacts geneated in the target folder which need not 
 * be published. We should remove them
 */

console.log(chalk.blueBright.bold("Bundling our sources for various browsers so that this package can be used as an end application"));
shell.exec("NODE_ENV=production webpack --config scripts/webpack.config.bundle.js --progress --mode production");
console.log();

console.log(chalk.blue("  Cleaning up asset-manifest.json to be devoid of orphaned keys"));
const assetManifestFile = targetDir + "/asset-manifest.json";
const assetManifest = require(assetManifestFile);
Object.keys(assetManifest).forEach(function(key) {
    ["gz.js", "gz.css", "br.js", "br.css"].some(function(compressFileExtn) {
        if (assetManifest[`${key}.${compressFileExtn}`]) {
            assetManifest[key] = assetManifest[`${key}.${compressFileExtn}`];
            delete assetManifest[`${key}.${compressFileExtn}`];
            console.log(chalk.blue.dim.italic(`    Fixing the asset for "${key}" and deleting the key "${key}.${compressFileExtn}" from asset-manifest.json`));
            return true;
        }
        return false;
    });
});
fs.writeFileSync(assetManifestFile, JSON.stringify(assetManifest, null, 2));

console.log(chalk.blue("  Cleaning up target bundles director to be devoid of unwanted files"));
const generatedAssets = lodash.uniq(Object.values(assetManifest));
shell.ls(targetDir).forEach((f) => {
    if (f.match(/asset-manifest.json/) || generatedAssets.includes(f)) {
        return;
    }
    console.log(chalk.blue.dim.italic(`    Deleting "${targetDir}/${f}"`));
    shell.rm(targetDir + `/${f}`);
});

console.log(chalk.green.bold("Final List of Generated Bundles are..."));
shell.ls("-l", targetDir).forEach((f) => {
    const filename = lodash.padEnd(f.name, 60);
    const filesize = lodash.padStart(lodash.floor(f.size/1000, 2), 6) + " KB";
    console.log(chalk.green(`  ${filename} = ${filesize}`));
});