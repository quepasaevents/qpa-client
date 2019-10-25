import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import apolloLogger from "apollo-link-logger"
import { extractCritical, renderStylesToString } from "emotion-server"
import { renderToString } from "react-dom/server"
import { Request, Response } from "express-serve-static-core"
import fetch from "node-fetch"
import * as React from "react"
import { getDataFromTree } from "react-apollo"
import App from "qpa/App/App"
import SSRProviders from "./SSRProviders"
import Helmet from "react-helmet"
import template from "./template"
import { ServerStyleSheets as MUIServerStyleSheets } from "@material-ui/core/styles"

export const httpSSRHandler = async (req: Request, res: Response) => {
  res.status(200)
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

  const muiSheets = new MUIServerStyleSheets()

  const app = muiSheets.collect(
    <SSRProviders location={req.path} graphqlClient={graphqlClient}>
      <App />
    </SSRProviders>
  )

  const appDataStringPromise = getDataFromTree(app)
  const appDataString = await appDataStringPromise

  const appBody = renderToString(app)
  const emotionCritical = extractCritical(appBody)
  const helmet = Helmet.renderStatic()

  const initialAppoloState = graphqlClient.extract()

  const result = template({
    appBody,
    helmet,
    apolloData: JSON.stringify(initialAppoloState),
    emotionCritical,
    muiStyles: muiSheets.toString(),
  })
  res.send(result)
}
