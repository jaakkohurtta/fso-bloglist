const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
  entry: ["regenerator-runtime/runtime.js", "./client/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    publicPath: "/",
  },
  devServer: {
    static: path.resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./assets/index.html",
      filename: "./index.html",
    }),
  ],
};

module.exports = config;
