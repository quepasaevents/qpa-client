import config, {
  Configuration,
  HtmlWebpackPlugin,
} from "qpa-webpack/webpack.config"
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
    ...config.plugins,
    new HtmlWebpackPlugin({
      template: "./index-dev.html",
    }),
  ],
  devtool: process.env.NODE_ENV === 'development' ? "#@source-map" : null,
  output: {
    path: path.resolve(__dirname, "../../dist/static"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}

export default qpaConfig
