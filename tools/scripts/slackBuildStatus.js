const { sendMessage, messageColor } = require("./slack");
const argv = require("yargs").argv;

const sendBuildStatus = () => {
  const url = argv.url || "";
  const argType = argv.type || "";

  switch (argType) {
    case "error":
      sendMessage("Build status", {
        color: messageColor.ERROR,
        text: `FAILED: ${url}`
      });
      break;

    case "review":
      sendMessage("Build status", {
        color: messageColor.INFO,
        text: `Review environment deployed: ${url}`
      });
      break;

    case "staging":
      sendMessage("Build status", {
        color: messageColor.SUCCESS,
        text: `Staging environment deployed: ${url}`
      });
      break;
  }
};

sendBuildStatus();
