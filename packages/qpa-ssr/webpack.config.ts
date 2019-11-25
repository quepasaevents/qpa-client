import * as path from "path"
import config, { WebpackConfig } from "qpa-webpack/webpack.config"

const ssrConfig: WebpackConfig = {
  ...config,
  entry: "./index.ts",
  target: "node",
  output: {
    path: path.resolve(__dirname, "../../dist/ssr"),
    filename: "ssr-server.js",
    publicPath: "/",
  },
}

export default ssrConfig
