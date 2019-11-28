import config, {
  WebpackConfig,
  HtmlWebpackPlugin,
} from "qpa-webpack/webpack.config"

import * as path from "path"
import * as WebpackDevServer from "webpack-dev-server"

const isDev = process.env.NODE_ENV === "development"

const devServer: WebpackDevServer.Configuration = {
  historyApiFallback: true,
  hot: true,
  proxy: {
    "/graphql": {
      redirect: false,
      changeOrigin: true,
      target: process.env.API_URL || "https://quepasaorgiva.com",
    },
    "/api": {
      redirect: false,
      changeOrigin: true,
      target: process.env.API_URL || "https://quepasaorgiva.com",
    },
  },
}
const qpaConfig: WebpackConfig = {
  ...config,
  entry: "./App/index.tsx",
  devServer,
  plugins: [
    ...config.plugins,
    new HtmlWebpackPlugin({
      template: "./index-dev.html",
    }),
  ],

  devtool: isDev ? "@source-map" : false,
  output: {
    path: path.resolve(__dirname, "../../dist/static"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  optimization: {
    splitChunks: isDev
      ? {
          chunks: "all",
        }
      : false,
  },
}

export default qpaConfig
