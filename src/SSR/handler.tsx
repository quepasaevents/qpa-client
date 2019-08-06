import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import apolloLogger from "apollo-link-logger"
import { renderStylesToString } from "emotion-server"
import { Request, Response } from "express-serve-static-core"
import * as fs from "fs"
import * as Mustache from "mustache"
import fetch from "node-fetch"
import * as path from "path"
import * as React from "react"
import { getDataFromTree } from "react-apollo"
import * as ReactDOMServer from "react-dom/server"
import App from "../App/App"
import SSRProviders from "./SSRProviders"
export const httpSSRHandler = async (req: Request, res: Response) => {
  res.status(200)
  console.log("Cookie header", req.header("Cookie"))

  const httpLink = new HttpLink({
    uri: process.env.API_URL || "http://localhost:4000/graphql",
    fetch,
    headers: {
      cookie: req.header("Cookie"),
    },
  })

  const link = ApolloLink.from([apolloLogger, httpLink])

  const graphqlClient = new ApolloClient({
    connectToDevTools: true,
    link,
    cache: new InMemoryCache(),
    ssrMode: true,
  }) as ApolloClient<any>

  const app = (
    <SSRProviders location={req.path} graphqlClient={graphqlClient}>
      <App />
    </SSRProviders>
  )

  const appWithData = await getDataFromTree(app)

  const appBody = renderStylesToString(appWithData)
  const initialState = graphqlClient.extract()

  const template = fs.readFileSync(
    path.join(__dirname, "./index.html.mustache"),
    "utf-8",
  )

  const result = Mustache.render(template, {
    appBody,
    apolloData: JSON.stringify(initialState),
  })
  res.send(result)
}
