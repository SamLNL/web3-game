const argv = require("yargs").argv;
const pa11y = require("pa11y");
const htmlReporter = require("pa11y-reporter-html");
const chalk = require("chalk");
const pkg = require("../../package.json");
const URL = require("url");
const fancyLog = require("fancy-log");
const { sendMessage, uploadFileToSlack, messageColor } = require("./slack");
const puppeteer = require("puppeteer");

const pdfReport = "./pa11y.pdf";
const level = process.env.A11Y_LEVEL || "WCAG2A";

const launchBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ["--no-sandbox"]
  });
};

const checkA11y = async (baseUrl, page) => {
  if (!baseUrl.endsWith("/") && !page.url.startsWith("/")) {
    baseUrl = baseUrl + "/";
  }

  const pageUrl = URL.parse(`${baseUrl}${page.url}`);
  fancyLog(chalk`-> Checking accessibility: {cyan ${pageUrl.href}}`);

  const results = await pa11y(pageUrl.href, {
    standard: level
  });
  const html = await htmlReporter.results(results, pageUrl.href);

  let hasError = false;

  if (results.hasOwnProperty("issues")) {
    hasError = results["issues"].filter(item => item.type === "error").length > 0;
  }

  return {
    hasError: hasError,
    html: html
  };
};

const init = async () => {
  let hasErrors = false;
  let htmlReport = "";

  if (argv.url) {
    const a11y = pkg.globs.a11y;
    for (const page of a11y) {
      const result = await checkA11y(argv.url, page);
      if (result.hasError) {
        hasErrors = true;
        htmlReport += result.html;
      }
    }
  } else {
    throw "No url specified";
  }

  if (hasErrors) {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setContent(htmlReport);
    await page.pdf({
      path: pdfReport
    });
    await uploadFileToSlack(
      `Your accessibility report for ${argv.url} (${level})`,
      pdfReport
    );
    await sendMessage(`Accessibility (${level})`, {
      color: messageColor.ERROR,
      text: `Accessibility check for ${
        argv.url
      } failed, see uploaded report for more info.`
    });

    await browser.close();
    process.exit(1);
  } else {
    await sendMessage(`Accessibility (${level})`, {
      color: messageColor.SUCCESS,
      text: `Accessibility check for for ${argv.url} passed!`
    });
  }
};

init()
  .then(() => {
    fancyLog(chalk`-> pa11y run complete!`);
    process.exit(0);
  })
  .catch(e => {
    fancyLog(chalk`-> {red Pa11y task failed!} ${e}`);
    process.exit(1);
  });
