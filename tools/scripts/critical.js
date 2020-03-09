const argv = require("yargs").argv;
const critical = require("critical");
const chalk = require("chalk");
const pkg = require("../../package.json");
const URL = require("url");
const fancyLog = require("fancy-log");

const createCriticalCSS = async (baseUrl, crit) => {
  if (baseUrl.charAt(-1) !== "/") {
    baseUrl += "/";
  }
  const pageUrl = URL.parse(`${baseUrl}${crit.url}`);
  const criticalDest = pkg.paths.dist.critical + crit.template + "_critical.min.css";
  fancyLog(
    chalk`-> Generating critical CSS: {cyan ${pageUrl.href}} -> {magenta ${criticalDest}}`
  );

  return await critical.generate({
    src: pageUrl.href,
    target: criticalDest,
    inline: false,
    penthouse: {
      blockJSRequests: false,
      forceInclude: pkg.globs.criticalWhitelist
    },
    ignore: [],
    minify: true,
    width: 1440,
    height: 1280
  });
};

const generateCssFromPackage = async baseUrl => {
  const critical = pkg.globs.critical;
  for (const crit of critical) {
    await createCriticalCSS(baseUrl, crit);
  }
};

const init = async () => {
  if (argv.url) {
    await generateCssFromPackage(argv.url);
  }
};

init()
  .then(() => {
    fancyLog(chalk`-> All critical CSS generated!`);
    process.exit(0);
  })
  .catch(e => {
    fancyLog(chalk`-> {red Task failed!} ${e}`);
    process.exit(1);
  });
