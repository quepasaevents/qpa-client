import * as path from "path"
import config, { Configuration } from "qpa-webpack/webpack.config"

const ssrConfig: Configuration = {
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
