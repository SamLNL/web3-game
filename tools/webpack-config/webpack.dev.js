// Development builds
const LEGACY_CONFIG = "legacy";
const MODERN_CONFIG = "modern";

// node modules
const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

// config files
const pkg = require("../../package.json");
const common = require("./webpack.common.js");

// Development module exports
module.exports = [
  merge(common.legacyConfig, {
    output: {
      path: path.resolve(__dirname, "../../", pkg.paths.dist.js),
      publicPath: pkg.paths.abs.js,
      filename: "[name].es5.js",
      chunkFilename: "[id].es5.js"
    },
    mode: "development",
    devtool: "inline-source-map",
    performance: {
      hints: "warning"
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  }),
  merge(common.modernConfig, {
    output: {
      path: path.resolve(__dirname, "../../", pkg.paths.dist.js),
      publicPath: pkg.paths.abs.js,
      filename: "[name].js",
      chunkFilename: "[id].js"
    },
    mode: "development",
    devtool: "inline-source-map",
    performance: {
      hints: "warning"
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  })
];
