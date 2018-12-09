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
    },
    resolve: {
      alias: {
        view: path.resolve(__dirname, "./src/View"),
        container: path.resolve(__dirname, "./src/Container")
      },
      extensions: [".js"],
      modules: [
        path.resolve(__dirname, "./src"),
        path.resolve(__dirname, "./node_modules")
      ]
    }
  };
  return config;
};
