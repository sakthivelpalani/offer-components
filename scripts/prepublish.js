/**
 * This is the script that prepares our library folder for NPM  upload. This is automatically called by NPM whenever
 * "npm publish" command is run. It exports this package into NPM in various formats - some targeted towards 
 * consuming this as a direct application (eg. Websites) and some targeted towards consuming this as a library in 
 * another application (eg. Shastra)
 */

const shell = require("shelljs");
shell.rm("-rf", "dist");
shell.exec("node ./scripts/compile-for-library.js --color=true");
shell.exec("node ./scripts/generate-bundles.js --color=true");
