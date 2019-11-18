import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import * as React from "react"
import { ApolloProvider } from "react-apollo"
import { StaticRouter } from "react-router"
import { AppContextProvider } from "qpa/App/Context/AppContext"
import { ThemeProvider, theme } from "qpa-emotion"
import { CookiesProvider } from "react-cookie"

interface Props {
  children: React.ReactChild | React.ReactChildren
  graphqlClient: ApolloClient<InMemoryCache>
  location: string
  universalCookies: any
}

const SSRProviders = (props: Props) => (
  <ApolloProvider client={props.graphqlClient}>
    <CookiesProvider cookies={props.universalCookies}>
      <AppContextProvider isSSR={true}>
        <ThemeProvider theme={theme}>
          <StaticRouter location={props.location}>
            {props.children}
          </StaticRouter>
        </ThemeProvider>
      </AppContextProvider>
    </CookiesProvider>
  </ApolloProvider>
)

export default SSRProviders
