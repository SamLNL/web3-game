const gulp = require('gulp');
const $ = require('../lib/loadPlugins');

const setProdEnvTask = (done) => {
  $.fancyLog('-> Setting NODE_ENV to production');
  process.env.NODE_ENV = 'production';
  done();
};

const setDevEnvTask = (done) => {
  $.fancyLog('-> Setting NODE_ENV to development');
  process.env.NODE_ENV = 'development';
  done();
};

gulp.task('system:env-dev', setDevEnvTask);
gulp.task('system:env-prod', setProdEnvTask);

module.exports = {
  setDevEnvTask,
  setProdEnvTask,
};
