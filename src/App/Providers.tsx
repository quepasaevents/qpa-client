import {InMemoryCache} from "apollo-cache-inmemory"
import {ApolloClient} from "apollo-client"
import {HttpLink} from "apollo-link-http"
import fetch from "node-fetch"
import * as React from "react"
import {ApolloProvider} from "react-apollo"
import {BrowserRouter as Router} from "react-router-dom"
import {AppContextProvider} from "./Context/AppContext"

interface Props {
  children: React.ReactChild | React.ReactChildren
}

const httpLink = new HttpLink({
  uri: "/graphql",
  fetch,
})

const graphqlClient = new ApolloClient({
  connectToDevTools: true,
  link: httpLink,
  cache: new InMemoryCache().restore((window as any).__APOLLO_DATA__),
}) as ApolloClient<any>

const Providers = (props: Props) => (
  <ApolloProvider client={graphqlClient}>
    <AppContextProvider isSSR={false}>
      <Router>
        { props.children }
      </Router>
    </AppContextProvider>
  </ApolloProvider>
)

export default Providers
