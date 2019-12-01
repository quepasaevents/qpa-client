import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import fetch from "node-fetch"
import { MessageCenterProvider } from "qpa-message-center"
import * as React from "react"
import { ApolloProvider } from "react-apollo"
import { BrowserRouter as Router } from "react-router-dom"
import { AppContextProvider } from "./Context/AppContext"
import { ThemeProvider, theme } from "qpa-emotion"
import { CookiesProvider } from "react-cookie"
import { createUploadLink } from "apollo-upload-client"

interface Props {
  children: React.ReactChild | React.ReactChildren
}

const persistedAuthToken = localStorage.getItem("authentication")
const uploadLink = createUploadLink({
  uri: "/graphql",
  fetch,
  headers: {
    authentication: persistedAuthToken
  }
})

const graphqlClient = new ApolloClient({
  connectToDevTools: true,
  link: uploadLink,
  cache: new InMemoryCache().restore((window as any).__APOLLO_DATA__),
}) as ApolloClient<any>

const Providers = (props: Props) => (
  <ApolloProvider client={graphqlClient}>
    <CookiesProvider>
      <AppContextProvider isSSR={false}>
        <MessageCenterProvider>
          <ThemeProvider theme={theme}>
            <Router>{props.children}</Router>
          </ThemeProvider>
        </MessageCenterProvider>
      </AppContextProvider>
    </CookiesProvider>
  </ApolloProvider>
)

export default Providers
