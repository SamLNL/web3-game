// base config

// node modules
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ManifestPlugin = require("webpack-manifest-plugin");
const { getManifest } = require("../gulp/lib/manifest");

// config
const pkg = require("../../package.json");
const { getEnv } = require("../gulp/lib/getEnv");

const LEGACY_CONFIG = "legacy";
const MODERN_CONFIG = "modern";
const webpackBuildCache = {};

const configureBabelLoader = targets => {
  return {
    test: /\.m?js$/,
    exclude: /\bcore-js\b/, // https://github.com/babel/babel/issues/7559
    use: {
      loader: "babel-loader",
      options: {
        sourceType: "unambiguous",
        babelrc: false,
        plugins: ["@babel/plugin-syntax-dynamic-import"],
        presets: [
          [
            "@babel/env",
            {
              // debug: true,
              modules: false,
              useBuiltIns: "usage",
              corejs: {
                version: 2,
                proposals: true
              },
              targets
            }
          ]
        ]
      }
    }
  };
};

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

const configureManifest = buildType => {
  let manifestFilename = pkg.vars.manifest.modern;
  if (buildType === LEGACY_CONFIG) {
    manifestFilename = pkg.vars.manifest.legacy;
  }
  return {
    seed: getManifest(manifestFilename),
    fileName: path.resolve(
      __dirname,
      "../../",
      `${pkg.paths.dist.manifest}${manifestFilename}`
    )
  };
};

const configureEntry = buildType => {
  if (buildType === LEGACY_CONFIG) {
    return {
      main: `./${pkg.paths.src.js}${pkg.vars.jsNameLegacy}`
    };
  }
  return {
    main: `./${pkg.paths.src.js}${pkg.vars.jsName}`
  };
};

const baseConfig = {
  context: path.resolve(__dirname, "../../"),
  plugins: [
    // Identify each module by a hash, so caching is more predictable.
    new webpack.HashedModuleIdsPlugin(),
    // Allows minifiers to removed dev-only code.
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(getEnv())
    })
  ],
  cache: webpackBuildCache,
  stats: {
    hash: false,
    version: false,
    timings: false,
    children: false,
    errorDetails: false,
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    publicPath: false
  },
  optimization: {
    splitChunks: getSplitChunksConfig()
  }
};

// Legacy webpack config
const legacyConfig = {
  entry: configureEntry(LEGACY_CONFIG),
  module: {
    rules: [configureBabelLoader({ browsers: Object.values(pkg.browserslist) })]
  },
  plugins: [new ManifestPlugin(configureManifest(LEGACY_CONFIG))]
};

// Modern webpack config
const modernConfig = {
  entry: configureEntry(MODERN_CONFIG),
  module: {
    rules: [
      configureBabelLoader({
        esmodules: true
      })
    ]
  },
  plugins: [new ManifestPlugin(configureManifest(MODERN_CONFIG))]
};

module.exports = {
  legacyConfig: merge(legacyConfig, baseConfig),
  modernConfig: merge(modernConfig, baseConfig)
};
