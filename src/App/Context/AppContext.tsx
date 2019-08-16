import { Spinner } from "qpa-components"
import * as React from "react"
import App from "../App"
import MeQuery, { UserData } from "./MeQuery"
interface IAppContext {
  me: UserData
  isSSR: boolean
}

interface Props {
  isSSR: boolean
  children: React.ReactChild
}

const AppContext = React.createContext<IAppContext>({ me: null, isSSR: false })
const { Provider, Consumer } = AppContext
const AppContextProvider = (props: Props) => (
  <MeQuery>
    {({ data, loading, error }) => {
      if (loading) {
        return <Spinner />
      }
      if (error) {
        return <p>Error {error.message}</p>
      }
      return (
        <Provider value={{
          me: data.me,
          isSSR: props.isSSR,
        }}>
          {
            props.children
          }
        </Provider>
      )
    }}
  </MeQuery>
)

export const useAppContext = () => React.useContext<IAppContext>(AppContext)
export { AppContextProvider, Consumer as AppContext }
