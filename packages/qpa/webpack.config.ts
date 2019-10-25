import config, {
  Configuration,
  HtmlWebpackPlugin,
} from "qpa-webpack/webpack.config"
import * as path from "path"

const isDev = process.env.NODE_ENV === 'development'

const qpaConfig: Configuration = {
  ...config,
  entry: "./App/index.tsx",
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
  optimization: isDev ? {
    splitChunks: {
      chunks: "all"
    }
  } : null
}

export default qpaConfig
