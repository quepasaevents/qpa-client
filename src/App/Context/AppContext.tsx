import * as React from "react"
import MeQuery, { UserData } from "./MeQuery"
import App from "../App";

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
