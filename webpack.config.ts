import * as express from "express"
import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as path from "path"
import * as webpack from "webpack"
import * as WebpackDevServer from "webpack-dev-server"
import {httpSSRHandler} from "./src/SSR/handler"

const config: webpack.Configuration = {
  entry: "./src/App/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    // before: (app: express.Application, server: WebpackDevServer) => {
    //   todo: improve the regex
    // app.get(/^((?!\.\w+).)*$/, httpSSRHandler)
    // },
    proxy: {
      "/graphql": {
        redirect: false,
        changeOrigin: true,
        target: `http://localhost:4000`,
      },
      "/api": {
        redirect: false,
        changeOrigin: true,
        target: `http://localhost:4000`,
      },

    },
  },
  module: {
    rules: [
      {
        exclude: path.resolve(__dirname, "node_modules"),
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
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
              // "module:@emotion/babel-preset-css-prop"
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.(woff|woff2)$/i,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
    ],
  },
  devtool: "@source-map",
  output: {
    path: path.resolve(__dirname, "./bin"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [new HtmlWebpackPlugin({
    title: "blabla",
    template: "./src/index-dev.html",
  })],

}

export default config
