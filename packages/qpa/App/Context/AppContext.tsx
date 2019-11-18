import { Spinner } from "qpa-components"
import * as React from "react"
import { useCookies } from "react-cookie"
import useMeQuery, { UserData } from "./useMeQuery"

interface IAppContext {
  me?: UserData
  isSSR: boolean
  supportedLocales: string[]
  refetch: () => void
  setLocale: (locale: string) => void
  locale: string
  refuseDataStorage: boolean
  setRefuseDataStorage: (refuse: boolean) => void
}

interface StoredPreferences {
  locale?: string
}

interface Props {
  isSSR: boolean
  children: React.ReactChild
}

const SUPPORTED_LOCALES = ["es-ES", "en-GB"]
const PREFERENCES = "preferences"

const AppContext = React.createContext<IAppContext>({
      me: null,
      isSSR: false,
      supportedLocales: SUPPORTED_LOCALES,
      locale: "es",
      refetch: () => {
      },
      setLocale: () => null,
      refuseDataStorage: false,
      setRefuseDataStorage: (refuse: boolean) => null
    }
)

const { Provider, Consumer } = AppContext
const AppContextProvider = (props: Props) => {
  const { data, loading, error, refetch } = useMeQuery()

  const [refuseDataStorageState, setRefuseDataStorageState] = React.useState<boolean>(false)
  const [cookies, setCookie, removeCookie] = useCookies([
    "locale",
  ])
  const browserLocale = navigator.language.substring(0, 2)
  const matchingBrowserLocale = SUPPORTED_LOCALES.find(sL => sL === browserLocale)
  const closestBrowserLocale = matchingBrowserLocale ? matchingBrowserLocale : (
      SUPPORTED_LOCALES.find(sL => sL.substring(0,2) === browserLocale.substring(0,2))
  )
  const defaultlocale = closestBrowserLocale ? closestBrowserLocale : SUPPORTED_LOCALES[0]
  const cookieLocale = cookies.locale && SUPPORTED_LOCALES.includes(cookies.locale) ? cookies.locale : null

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
        locale: cookies.locale ? cookies.locale : defaultlocale,
        refetch,
        setRefuseDataStorage: (refuse: boolean) => {
          if (refuse) {
            removeCookie('locale')
          }
          setRefuseDataStorageState(refuse)
        },
        refuseDataStorage: refuseDataStorageState,
        setLocale: (localeToSet: string) => {
          if (!refuseDataStorageState) {
            setCookie("locale", localeToSet)
          }
        },
      }}
    >
      {props.children}
    </Provider>
  )
}
export const useAppContext = () => React.useContext<IAppContext>(AppContext)
export { AppContextProvider, Consumer as AppContext }
