const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const getPlugins = env =>
  [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "public/index.html"),
      inject: true,
      chunks: ["app", "vendors"]
    }),
    env.analyze && new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: env.development ? "[name].css" : "css/[name].[chunkhash:8].css"
    })
  ].filter(plugin => plugin);

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
    },
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 9000
    },
    plugins: getPlugins(env),
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ["cache-loader", "babel-loader?cacheDirectory", "thread-loader"]
        },
        {
          test: /\.(sc|c)ss$/,
          use: [
            env.development ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          },
          styles: {
            test: /\.css$/,
            name: "styles",
            chunks: "all",
            enforce: true
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            compress: {
              dead_code: true,
              conditionals: true,
              booleans: true
            },
            module: false,
            output: {
              comments: false,
              beautify: false
            }
          }
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require("cssnano"),
          cssProcessorPluginOptions: {
            preset: ["default", { discardComments: { removeAll: true } }]
          },
          canPrint: true
        })
      ]
    }
  };
  return config;
};
