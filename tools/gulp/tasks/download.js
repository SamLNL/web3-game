const gulp = require("gulp");
const errorHandler = require("../lib/errorHandler");
const http = require("http");
const https = require("https");
const path = require("path");
const URL = require("url");
const fs = require("fs");
const fsExtra = require("fs-extra");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const fancyLog = require("fancy-log");
const pkg = require("../../../package");

const downloadFile = async download => {
  await fsExtra.ensureDir(download.dest);

  return new Promise((resolve, reject) => {
    const url = new URL.parse(download.url);
    const filename = path.basename(url.pathname);
    let client = http;

    if (url.protocol === "https:") {
      client = https;
    }

    const file = fs.createWriteStream(`${download.dest}${filename}`);
    client
      .get(download.url, function(response) {
        response.pipe(file);
        file.on("finish", function() {
          fancyLog(
            chalk`Downloaded: {magenta ${download.url}} to ${download.dest}${filename}`
          );
          file.close(resolve);
        });
      })
      .on("error", function(err) {
        // Handle errors
        fs.unlinkSync(`${download.dest}${filename}`); // Delete the file async. (But we don't check the result)
        fancyLog(chalk`${logSymbols.error} {red Download failed:}`);
        reject(err);
      });
  });
};

const downloadTask = async cb => {
  try {
    await Promise.all(
      pkg.globs.download.map(async download => {
        await downloadFile(download);
      })
    );
  } catch (e) {
    errorHandler(e, cb);
  }
};

gulp.task("download", downloadTask);
module.exports = downloadTask;
