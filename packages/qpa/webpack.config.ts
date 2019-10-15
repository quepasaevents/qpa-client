import config, {Configuration, HtmlWebpackPlugin} from 'qpa-webpack/webpack.config'
import * as path from "path"

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
    new HtmlWebpackPlugin({
      template: "./index-dev.html",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "../../dist/static"),
    filename: "bundle.js",
    publicPath: "/",
  }
}

export default qpaConfig
