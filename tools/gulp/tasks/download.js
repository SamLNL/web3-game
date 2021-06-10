const gulp = require('gulp');
const errorHandler = require('../lib/errorHandler');
const path = require('path');
const URL = require('url');
const logSymbols = require('log-symbols');
const fancyLog = require('fancy-log');
const cp = require('child_process');
const pkg = require('../../../package');

const downloadFile = async (download) => {
  const url = new URL.parse(download.url);
  const filename = path.basename(url.pathname);

  let command = `curl --create-dirs -so ${download.dest}${filename} '${download.url}'`;
  cp.execSync(command);
  fancyLog(
    `${logSymbols.success} Downloaded: ${download.url} -> ${download.dest}${filename}`
  );
};

const downloadTask = async (cb) => {
  try {
    await Promise.all(
      pkg.globs.download.map(async (download) => {
        await downloadFile(download);
      })
    );
  } catch (e) {
    errorHandler(e, cb);
  }
};

gulp.task('download', downloadTask);
module.exports = downloadTask;
