import { Spinner } from "qpa-components"
import * as React from "react"
import useMeQuery, { UserData } from "./useMeQuery"

interface IAppContext {
  me: UserData
  isSSR: boolean
  supportedLocales: string[]
  refetch: () => void
}

interface Props {
  isSSR: boolean
  children: React.ReactChild
}

const SUPPORTED_LOCALES = ["en-GB", "es-ES"]

const AppContext = React.createContext<IAppContext>({
  me: null,
  isSSR: false,
  supportedLocales: SUPPORTED_LOCALES,
  refetch: () => {}
})

const { Provider, Consumer } = AppContext
const AppContextProvider = (props: Props) => {
  const { data, loading, error, refetch } = useMeQuery()
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <p>Error {error.message}</p>
  }
  return (
    <Provider
      value={{
        me: data.me,
        isSSR: props.isSSR,
        supportedLocales: SUPPORTED_LOCALES,
        refetch,
      }}
    >
      {props.children}
    </Provider>
  )
}
export const useAppContext = () => React.useContext<IAppContext>(AppContext)
export { AppContextProvider, Consumer as AppContext }
