import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as path from "path"
import { Configuration } from "webpack"
import * as webpackDevServer from "webpack-dev-server"

interface WebpackConfig extends Configuration {
  devServer?: webpackDevServer.Configuration
}

export { HtmlWebpackPlugin, WebpackConfig }

const config: WebpackConfig = {
  entry: "./App/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        exclude: path.resolve(__dirname, "node_modules"),
        test: /\.[tj]sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              "@babel/preset-typescript",
              "@emotion/babel-preset-css-prop",
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "react-hot-loader/babel",
                "@babel/plugin-proposal-optional-chaining"
            ],
          },
        },
      },
      {
        test: /\.(woff|woff2|png)$/i,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: "react-svg-loader",
      },
    ],
  },
  plugins: [],
  // devtool: "@source-map",
}

export default config
