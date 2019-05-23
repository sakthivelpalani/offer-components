/*eslint-disable no-console*/

const shell = require("shelljs");
const chalk = require("chalk");

const srcDir = "src";
const targetDir = "dist/lib";

/**
 * 
 * Implementation Notes:
 * ---------------------
 * We have embraced component oriented architecture for this library and as a tenet, each Component has its own
 * stylesheet. In order to prevent one CSS Class of a component to not conflict with another CSS Class of a 
 * different component, we have to namespace (modularize) the stylesheets properly and this requires CSS Modules. 
 * But we dont want to modularize the style sheets which are consumed by our 3rd party libraries and which represents
 * our BB theme. In addition to all these, to make our CSS manageable, we need SASS. Thus we have a plethora of
 * conditions on *when* to apply *what*. We need to shield our consumers about all these intricacies. In short, we need 
 * to devise a way to compile our Modularized CSS files and SASS files to be *normal* like the way we transpile our 
 * JS files to ES2015 standards. 
 * 
 * Unfortunately, this is not simple at the time of this writing (8th Sep 2017). CSS Loader which handles
 * modularization of our CSS/SCSS files is available only as a webpack loader and not in any other form. Therefore
 * we cannot invoke it as a CLI tool. Moreover, when we transpile a JS file, we need to ensure that the mapping between
 * a non-scoped CSS to a hash-scoped CSS is maintained in the JS file. That means that this operation has to be
 * performed when Babel is transpiling the JS file. Thus we require a babel-plugin and there is nothing which is 
 * present for pure library consumption. However the plugin https://github.com/michalkvasnicak/babel-plugin-css-modules-transform 
 * exists to enable a client code for SSR (NodeJS consumption) and thus its intent is to strip off CSS from JS files so that NodeJS 
 * doesnt complain. We will use that plugin in an intelligent way to achieve our goal. 
 * @see Refer to https://github.com/michalkvasnicak/babel-plugin-css-modules-transform/issues/57
 * 
 * If we import a stylesheet (say <code>import GenderStyle from "./Gender.scss"</code>) in a JS file and then
 * continue to use that stylesheet variable as a normal JS variable, then even after removing that import the JS
 * file has to be valid. Thats what the plugin does. It replaces the import line with the MAP of the same variable name
 * and the map contains the mapping of non-scoped CSS to scoped CSS. This way the JS file is very much valid. It 
 * removes the import altogether so that it is compatible with a non CSS enabled environments like NodeJS. 
 * 
 *                 [
 *                     "css-modules-transform", 
 *                     {
 *                         "extensions": [".css", ".scss"],                                      --> 1
 *                         "preprocessCss": "./scripts/babel-sass-processor.js",                 --> 2
 *                         "generateScopedName": "[name]_[local]_[hash:base64:5]",               --> 3
 *                         "extractCss": "./dist/styles/extractedStyleSheet.css"                 --> 4
 *                     }
 *                 ]
 * 
 * 1. Plugin attaches itself to Babel process and CSS Modules Require Hook. By default Babel doesnt follow the imports 
 *    of the files it doesnt understand. Thats where the option *extensions* comes into play.
 * 2. Since we are not using Webpack, we need to convert the SASS files through a preprocessor option of the plugin.
 * 3. We need to configure on how we want to scope (make CSS Class Unique) the various classnames we find in the CSS 
 *    file. This is where the attribute *generateScopedName* comes into play. Note that the plugin will only modularize 
 *    and if we dont want to scope it, we just need to populate it as [local]. This plugin actually doesnt modularize.
 *    Rather it uses css-loader behind the scenes through css-loader-require-hook to achieve it.
 * 4. Though the plugin removes all the *imports*, it however has a provision to export the removed CSS definitions 
 *    into a separate file which is not included anywhere by default. The extraction is enabled by *extractCss* option.
 *    In this example, We have configured it to write to dist/styles/extractedStyleSheet.scss.
 */

console.log(chalk.blueBright.bold("Compiling our sources so that it can be consumed by other Applications which uses this package as a library"));
shell.exec(`BABEL_ENV=library babel ${srcDir} --out-dir ${targetDir} --source-maps inline`);
shell.echo("\nrequire(\"./extractedStyleSheet.css\");").toEnd(`${targetDir}/styles/index.js`);

