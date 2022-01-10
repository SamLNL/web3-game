// node modules
const gulp = require('gulp');
const browserSync = require('browser-sync').create('dev');

// config
const pkg = require('../../../package');

const serverTask = (cb) => {
  browserSync.init({
    notify: false,
    port: 3000,
    open: false,
    logPrefix: 'DFS',
    proxy: {
      target: 'web3-game.test',
    },
  });

  browserSync.watch(`${pkg.paths.dist.css}**/*.css`, (event) => {
    if (event === 'change') {
      browserSync.reload('*.css');
    }
  });

  browserSync.watch(`${pkg.paths.dist.js}**/*.js`, (event) => {
    if (event === 'change') {
      browserSync.reload('*.js');
    }
  });
  browserSync.watch(`${pkg.paths.dist.images}**/*.svg`, (event) => {
    if (event === 'change') {
      browserSync.reload();
    }
  });

  browserSync.watch(`${pkg.paths.dist.base}*.html`, (event) => {
    if (event === 'change') {
      browserSync.reload();
    }
  });

  cb();
};

gulp.task('server', serverTask);
module.exports = serverTask;
