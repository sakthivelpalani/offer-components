const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const projectDir = path.resolve(__dirname, "../");
const publicDir = path.resolve(projectDir, "public/");
const appDir = path.resolve(projectDir, "src/");
const distDir = path.resolve(projectDir, "dist/");


module.exports = {
  entry: appDir + "/App.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: distDir,
    filename: "offer-components.js",
    libraryTarget: "var",
    library: "offercomponents"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: publicDir,
    port: 3000,
    publicPath: "/",
    hotOnly: true
  },
  plugins: [
     new HTMLWebpackPlugin({
      template: path.resolve("public/index.html"),
      minify: false,
      inject: "head"
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};