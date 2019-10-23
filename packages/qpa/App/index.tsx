import 'react-hot-loader' // has to be before react

import * as React from "react"
import * as ReactDOM from "@hot-loader/react-dom"
import App from "./App"
import Providers from "./Providers"

console.log('App/index.tsx')
const container = document.getElementById("app")

const mainElement = (
  <Providers>
    <App />
  </Providers>
)

if ((window as any).__QPA_SSR__) {
    console.log('Will hydrate now')
  ReactDOM.hydrate(mainElement, container)
} else {
    console.log('Will render now')
    ReactDOM.render(mainElement, container)
}
