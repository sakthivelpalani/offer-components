/*eslint-disable no-undef*/
const moduleResolutionOptions = {
    "root": ["./src"],
    "alias": {
        "WCRoot": "./src"
    }
};

const defaultPlugins = [
    ["babel-plugin-module-resolver", moduleResolutionOptions],
    "@babel/plugin-transform-flow-strip-types",
    ["@babel/plugin-proposal-class-properties", {loose: true}],
    ["@babel/plugin-proposal-object-rest-spread", {loose: true, useBuiltIns: true}],
    "@babel/plugin-transform-react-jsx",
];

module.exports = function (api) {
    switch (api.env()) {
        case "bundle_es2016": 
            return {
                presets: [
                    "@babel/preset-react", 
                    ["@babel/preset-env", {"targets": {"chrome": 60}, "modules": false}]
                ], 
                plugins: [...defaultPlugins]
            };
        case "library": 
            return {
                presets: [
                    "@babel/preset-react", 
                    "@babel/preset-env"
                ], 
                plugins: [
                    ...defaultPlugins,
                    [
                        "css-modules-transform",
                        {
                            "preprocessCss": "./scripts/babel-sass-processor.js",
                            "generateScopedName": "[name]_[local]_[hash:base64:5]",
                            "extensions": [".css", ".scss"],
                            "extractCss": "./dist/lib/styles/extractedStyleSheet.css"
                        }
                    ]
                ]
            };
        default: 
            return {
                presets: [
                    "@babel/preset-react", 
                    "@babel/preset-env"
                ], 
                plugins: [...defaultPlugins, "@babel/plugin-transform-object-assign"]
            };
    }
};