import {InMemoryCache} from "apollo-cache-inmemory"
import {ApolloClient} from "apollo-client"
import * as React from "react"
import {ApolloProvider} from "react-apollo"
import { StaticRouter } from "react-router"
import {AppContextProvider} from "qpa/App/Context/AppContext"

interface Props {
  children: React.ReactChild | React.ReactChildren
  graphqlClient: ApolloClient<InMemoryCache>
  location: string
}

const SSRProviders = (props: Props) => (
  <ApolloProvider client={props.graphqlClient}>
    <AppContextProvider isSSR={true}>
      <StaticRouter location={props.location}>
        { props.children }
      </StaticRouter>
    </AppContextProvider>
  </ApolloProvider>
)

export default SSRProviders
