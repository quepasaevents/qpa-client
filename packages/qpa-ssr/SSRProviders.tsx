import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import theme from "qpa/App/theme"
import * as React from "react"
import { ApolloProvider } from "react-apollo"
import { StaticRouter } from "react-router"
import { AppContextProvider } from "qpa/App/Context/AppContext"
import { ThemeProvider } from "styled-components"

interface Props {
  children: React.ReactChild | React.ReactChildren
  graphqlClient: ApolloClient<InMemoryCache>
  location: string
}

const SSRProviders = (props: Props) => (
  <ApolloProvider client={props.graphqlClient}>
    <AppContextProvider isSSR={true}>
      <ThemeProvider theme={theme}>
        <StaticRouter location={props.location}>{props.children}</StaticRouter>
      </ThemeProvider>
    </AppContextProvider>
  </ApolloProvider>
)

export default SSRProviders
