const $ = require('../lib/loadPlugins');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const { isDevMode } = require('../lib/getEnv');

const getErrorMessage = (e) => {
  let errorMsg = e.formatted || e.message;
  if (e.stack !== undefined && e.stack.length) {
    errorMsg = e.stack;
  }
  return errorMsg;
};

const terminate = (e, cb) => {
  if (typeof cb === 'function') {
    cb(e);
  } else {
    $.fancyLog(chalk.red(`${logSymbols.error} ${getErrorMessage(e)}`));
    process.exit(1);
  }
};

const errorHandler = (errorObject, cb) => {
  if (!(errorObject instanceof Error)) {
    errorObject = new Error(errorObject);
  }

  if (isDevMode()) {
    $.fancyLog(chalk.red(`${logSymbols.error} ${getErrorMessage(errorObject)}`));
  } else {
    // Terminate pipe
    terminate(errorObject, cb);
  }
  if (typeof this.emit === 'function') this.emit('end');
};

module.exports = errorHandler;
