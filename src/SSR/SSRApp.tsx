import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "../App/App"
import Providers from "../App/Providers"

const container = document.getElementById("app")
ReactDOM.hydrate(
  <Providers>
    <App />
  </Providers>,
  container,
)
