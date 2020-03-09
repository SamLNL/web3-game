// webpack.prod.js - production builds
const LEGACY_CONFIG = "legacy";
const MODERN_CONFIG = "modern";

// node modules
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

// config files
const pkg = require("../../package.json");
const common = require("./webpack.common.js");

// Configure Bundle Analyzer
const configureBundleAnalyzer = buildType => {
  if (buildType === LEGACY_CONFIG) {
    return {
      analyzerMode: "static",
      reportFilename: "report-legacy.html"
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      analyzerMode: "static",
      reportFilename: "report-modern.html"
    };
  }
};

// Configure split chunks
const getSplitChunksConfig = () => ({
  chunks: "all",
  maxInitialRequests: 1,
  minSize: 0,
  cacheGroups: {
    npm: {
      test: /node_modules/,
      name: mod => {
        const pkgName = mod.context.match(/node_modules\/([^/]+)/)[1];
        return `npm.${pkgName}`;
      }
    },
    // Split code common to all chunks to its own chunk
    commons: {
      name: "commons",
      chunks: "initial",
      minChunks: 2
    }
  }
});

// Configure terser
const configureTerser = () => {
  return {
    cache: true,
    parallel: true,
    sourceMap: true
  };
};

// Configure optimization
const configureOptimization = buildType => {
  if (buildType === LEGACY_CONFIG) {
    return {
      splitChunks: getSplitChunksConfig(),
      minimizer: [new TerserPlugin(configureTerser())]
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      splitChunks: getSplitChunksConfig(),
      minimizer: [new TerserPlugin(configureTerser())]
    };
  }
};

// Production module exports
module.exports = [
  merge(common.legacyConfig, {
    output: {
      path: path.resolve(__dirname, "../../", pkg.paths.dist.js),
      publicPath: pkg.paths.abs.js,
      filename: "[name]-[chunkhash:10].es5.js",
      chunkFilename: "[id]-[chunkhash:10].es5.js"
    },
    mode: "production",
    optimization: configureOptimization(LEGACY_CONFIG),
    performance: {
      hints: "error"
    },
    plugins: [new BundleAnalyzerPlugin(configureBundleAnalyzer(LEGACY_CONFIG))]
  }),
  merge(common.modernConfig, {
    output: {
      path: path.resolve(__dirname, "../../", pkg.paths.dist.js),
      publicPath: pkg.paths.abs.js,
      filename: "[name]-[chunkhash:10].js",
      chunkFilename: "[id]-[chunkhash:10].js"
    },
    mode: "production",
    optimization: configureOptimization(MODERN_CONFIG),
    performance: {
      hints: "error"
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new BundleAnalyzerPlugin(configureBundleAnalyzer(MODERN_CONFIG))
    ]
  })
];
