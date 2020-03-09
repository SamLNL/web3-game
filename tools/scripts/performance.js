const puppeteer = require("puppeteer");
const { URL } = require("url");
const { sendMessage, uploadFileToSlack, messageColor } = require("./slack");
let fs = require("fs");
const lighthouse = require("lighthouse");
const argv = require("yargs").argv;

// TODO: Split up for different audits?
const THRESHOLD = 0.8;

const launchBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ["--no-sandbox"]
  });
};

const runLightHouse = async () => {
  try {
    const url = argv.url;
    if (!url) {
      throw new Error("Missing --url argument");
    }

    // Use Puppeteer to launch headless Chrome and don't use its default 800x600 viewport.
    const warmerUpper = await launchBrowser();

    // Warm up the cache
    const warmup = await warmerUpper.newPage();
    await warmup.goto(url);
    await warmup.reload();
    await warmup.close();
    warmerUpper.close();

    const browser = await launchBrowser();

    const { lhr, report } = await lighthouse(url, {
      port: new URL(browser.wsEndpoint()).port,
      output: "html",
      logLevel: "info",
      blockedUrlPatterns: "cpresources"
    });

    const page = await browser.newPage();
    await page.setContent(report);

    // Open all summaries
    await page.evaluate(() => {
      let elements = document.querySelectorAll(
        ".lh-expandable-details__summary, .lh-audit-group__summary"
      );
      for (let element of elements) element.click();
    });

    await page.pdf({
      path: "./report.pdf"
    });

    await uploadFileToSlack(`Your lighthouse report for ${url}`, "./report.pdf");
    await fs.unlinkSync("./report.pdf");
    await browser.close();

    if (
      lhr.categories.performance.score < THRESHOLD ||
      lhr.categories.pwa.score < THRESHOLD ||
      lhr.categories.accessibility.score < THRESHOLD ||
      lhr.categories["best-practices"].score < THRESHOLD ||
      lhr.categories.seo.score < THRESHOLD
    ) {
      await sendMessage("Lighthouse audit failed", {
        color: messageColor.ERROR,
        text: "Minimum thresholds not met:",
        fields: [
          {
            title: "Performance",
            value: `${lhr.categories.performance.score * 100} (Required: ${THRESHOLD *
              100})`,
            short: false
          },
          {
            title: "Progressive Web App",
            value: `${lhr.categories.pwa.score * 100} (Required: ${THRESHOLD * 100})`,
            short: false
          },
          {
            title: "Accessibility",
            value: `${lhr.categories.accessibility.score * 100} (Required: ${THRESHOLD *
              100})`,
            short: false
          },
          {
            title: "Best Practices",
            value: `${lhr.categories["best-practices"].score *
              100} (Required: ${THRESHOLD * 100})`,
            short: false
          },
          {
            title: "SEO",
            value: `${lhr.categories.seo.score * 100} (Required: ${THRESHOLD * 100})`,
            short: false
          }
        ]
      });
      process.exit(1);
    } else {
      await sendMessage("Lighthouse audit passed", {
        color: messageColor.SUCCESS,
        text: "Scores:",
        fields: [
          {
            title: "Performance",
            value: `${lhr.categories.performance.score * 100} (Required: ${THRESHOLD *
              100})`,
            short: false
          },
          {
            title: "Progressive Web App",
            value: `${lhr.categories.pwa.score * 100} (Required: ${THRESHOLD * 100})`,
            short: false
          },
          {
            title: "Accessibility",
            value: `${lhr.categories.accessibility.score * 100} (Required: ${THRESHOLD *
              100})`,
            short: false
          },
          {
            title: "Best Practices",
            value: `${lhr.categories["best-practices"].score *
              100} (Required: ${THRESHOLD * 100})`,
            short: false
          },
          {
            title: "SEO",
            value: `${lhr.categories.seo.score * 100} (Required: ${THRESHOLD * 100})`,
            short: false
          }
        ]
      });
    }
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
    process.exit(1);
  }
};

runLightHouse();
