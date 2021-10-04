/* eslint-disable no-undef */
const path = require("path");

const config = {
  entry: ["regenerator-runtime/runtime.js", "./client/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

module.exports = config;
