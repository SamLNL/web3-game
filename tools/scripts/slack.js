const Slack = require("slack");
const fs = require("fs");
const token = "xoxb-4189027885-465884918000-R1ZObRULuF2ZB17uuXN5pxDa";
const bot = new Slack({ token });

const messageColor = {
  SUCCESS: "#28a745",
  WARNING: "#ffc107",
  ERROR: "#dc3545",
  INFO: "#17a2b8"
};

const messageType = {
  BUILD_FINISHED: 1,
  BUILD_FAILED: 2,
  DEPLOYED: 3
};

const getUser = async () => {
  let gitUserName = require("git-user-name")();

  if (gitUserName === null || typeof gitUserName === undefined) {
    // Try & fetch git username from env
    gitUserName = process.env.GIT_USER || "";
  }

  const users = await bot.users.list();
  const user = users.members
    .filter(user => {
      const realName = user.real_name || "";
      const name = user.name || "";

      return (
        realName.toLowerCase() === gitUserName.toLowerCase() ||
        name.toLowerCase() === gitUserName.toLowerCase()
      );
    })
    .map(user => {
      return {
        id: user.id,
        name: user.name
      };
    })[0];

  if (!user) {
    throw new Error(
      `Unable to send Slack message.\nCouldn't find a user named ${gitUserName}`
    );
  }

  return user;
};

const getBuildChannelId = async () => {
  const result = await bot.conversations.list({
    types: "private_channel"
  });

  return result.channels
    .filter(channel => {
      return channel.name === "buildstatus";
    })
    .map(channel => {
      return channel.id;
    })[0];
};

const determineChannel = async () => {
  let channelId = await getBuildChannelId();
  const user = await getUser();

  if (typeof channelId === undefined) {
    channelId = user.id;

    // Try & send DM message
    const dm = await bot.im.open({ user: user.id });
    if (dm.ok) {
      channelId = dm.channel.id;
    }
  }
  return {
    channelId: channelId,
    user: user
  };
};

const sendMessage = async (message, attachment) => {
  try {
    const destinationInfo = await determineChannel();

    await bot.chat.postMessage({
      link_names: true,
      channel: destinationInfo.channelId || destinationInfo.user.id,
      text: `@${destinationInfo.user.name}\n${message}`,
      attachments: [attachment]
    });
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};

const uploadFileToSlack = async (comment, filename) => {
  try {
    const destinationInfo = await determineChannel();

    await bot.files.upload({
      initial_comment: comment || "",
      channels: destinationInfo.channelId || destinationInfo.user.id,
      filename,
      // You can use a ReadableStream or a Buffer for the file option
      file: fs.createReadStream(filename)
    });
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
};
module.exports = {
  sendMessage,
  uploadFileToSlack,
  messageType,
  messageColor
};
