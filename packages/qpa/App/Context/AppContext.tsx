import { Spinner } from "qpa-components"
import * as React from "react"
import App from "../App"
import MeQuery, { UserData } from "./MeQuery"
interface IAppContext {
  me: UserData
  isSSR: boolean
  supportedLanguages: string[]
}

interface Props {
  isSSR: boolean
  children: React.ReactChild
}

const SUPPORTED_LANGUAGES = ['en', 'es']
const AppContext = React.createContext<IAppContext>({ me: null, isSSR: false, supportedLanguages: SUPPORTED_LANGUAGES })
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
          supportedLanguages: SUPPORTED_LANGUAGES
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
