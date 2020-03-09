const getEnv = () => {
  return process.env.NODE_ENV || "development";
};
const isDevMode = () => {
  return process.env.NODE_ENV === "development";
};

module.exports = {
  getEnv,
  isDevMode
};
