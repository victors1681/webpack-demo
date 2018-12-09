const path = require("path");

module.exports = env => {
  const config = {
    mode:
      env.NODE_ENV.development === "development" ? "development" : "production",
    entry: {
      app: [path.resolve(__dirname, "./src/index.js")]
    }
  };
  return config;
};
