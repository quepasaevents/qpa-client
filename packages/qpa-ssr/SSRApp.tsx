import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "../qpa/App/App"
import Providers from "../qpa/App/Providers"

const container = (document).getElementById("app")
ReactDOM.hydrate(
  <Providers>
    <App />
  </Providers>,
  container,
)
