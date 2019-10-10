import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as path from "path"
import * as webpack from "webpack"

const config: webpack.Configuration = {
  entry: "./App/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    proxy: {
      "/graphql": {
        redirect: false,
        changeOrigin: true,
        target: process.env.API_URL || "https://alpha.quepasaalpujarra.com",
      },
      "/api": {
        redirect: false,
        changeOrigin: true,
        target: process.env.API_URL || "https://alpha.quepasaalpujarra.com",
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
            plugins: ["@babel/plugin-proposal-class-properties"].filter(
              Boolean
            ),
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
    path: path.resolve(__dirname, "../../dist/static"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index-dev.html",
    }),
  ],
}

export default config
