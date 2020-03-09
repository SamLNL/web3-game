/* eslint-disable no-console */
const gulp = require("gulp");
const webpack = require("webpack");
const { clearManifestOfExt } = require("../lib/manifest");
const { isDevMode } = require("../lib/getEnv");
const errorHandler = require("../lib/errorHandler");
const $ = require("../lib/loadPlugins");

const pkg = require("../../../package.json");

// webpack configs
const prodConfig = require("../../webpack-config/webpack.prod");
const devConfig = require("../../webpack-config/webpack.dev");

// create async webpack instance
const createCompiler = config => {
  const compiler = webpack(config);
  return () => {
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) return reject(err);
        console.log(
          stats.toString({
            colors: true,
            // Uncomment to see all bundled modules.
            maxModules: 0
          })
        );
        resolve();
      });
    });
  };
};

// Create webpack bundles
const compileJavascriptTask = async done => {
  try {
    clearManifestOfExt(
      [pkg.vars.manifest.legacy, pkg.vars.manifest.modern],
      ".js",
      ".map"
    );

    const compiler = createCompiler(isDevMode() ? devConfig : prodConfig);
    await compiler();
  } catch (err) {
    console.error(err);
    errorHandler(err, done);
  }
};

// Lint our js files
const lintJavascriptTask = () => {
  return gulp
    .src(pkg.globs.lintJs)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!isDevMode(), $.eslint.failAfterError()));
};

gulp.task("lint:javascript", lintJavascriptTask);
gulp.task("compile:javascript", gulp.series(lintJavascriptTask, compileJavascriptTask));

module.exports = {
  compileJavascriptTask,
  lintJavascriptTask
};
