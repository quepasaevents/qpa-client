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
            babelrc: false,
            presets: [
              "@babel/typescript",
              "@babel/react",
              [
                "@emotion/babel-preset-css-prop",
                {
                  autoLabel: true,
                  labelFormat: "[local]",
                },
              ],
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
            ].filter(Boolean),
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
  devtool: "@source-map",
}

export default config
