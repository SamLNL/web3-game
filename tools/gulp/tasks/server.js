// node modules
const gulp = require("gulp");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const Webpack = require("webpack");
const browserSync = require("browser-sync").create("dev");

// config
const hmrConfig = require("../../webpack-config/webpack.hmr");
const pkg = require("../../../package");

const serverTask = cb => {
  const compiler = Webpack(hmrConfig);

  browserSync.init({
    notify: false,
    port: 3000,
    open: false,
    logPrefix: "DFS",
    proxy: {
      target: "localhost:8000",
      middleware: [
        (req, res, next) => {
          res.setHeader("Access-Control-Allow-Origin", "*");
          next();
        },
        webpackDevMiddleware(compiler, {
          publicPath: hmrConfig[0].output.publicPath,
          stats: "errors-only"
        }),
        webpackHotMiddleware(compiler)
      ]
    }
  });

  browserSync.watch(`${pkg.paths.dist.css}**/*.css`, event => {
    if (event === "change") {
      browserSync.reload("*.css");
    }
  });
  // HMR should handle this for us
  // browserSync.watch(`${pkg.paths.dist.js}**/*.js`, event => {
  //   if (event === 'change') {
  //     browserSync.reload('*.js');
  //   }
  // });
  browserSync.watch(`${pkg.paths.dist.images}**/*.svg`, event => {
    if (event === "change") {
      browserSync.reload();
    }
  });

  browserSync.watch(`${pkg.paths.templates.base}**/*.{html,htm,twig}`, event => {
    if (event === "change") {
      browserSync.reload();
    }
  });

  cb();
};

gulp.task("server", serverTask);
module.exports = serverTask;
