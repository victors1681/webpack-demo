const path = require("path");

module.exports = env => {
  const config = {
    mode:
      env.NODE_ENV.development === "development" ? "development" : "production",
    entry: {
      app: [path.resolve(__dirname, "./src/index.js")],
      vendors: ["react", "react-dom"]
    },
    output: {
      path: path.join(__dirname, ".", "myDistribution", "ui"),
      filename: "js/[name]".concat(".[chunkhash:8].js")
    }
  };
  return config;
};
