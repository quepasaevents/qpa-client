import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as path from "path"
import * as webpack from "webpack"
import { Configuration } from "webpack"

export { Configuration, HtmlWebpackPlugin }

const config: webpack.Configuration = {
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
    ],
  },
  plugins: [],
  // devtool: "@source-map",
}

export default config
