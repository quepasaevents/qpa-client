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
  language: string
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
const COOKIE_NAMES = ["locale"]

const AppContext = React.createContext<IAppContext>({
  me: null,
  isSSR: false,
  supportedLocales: SUPPORTED_LOCALES,
  locale: "es",
  language: "es",
  refetch: () => {},
  setLocale: () => null,
  refuseDataStorage: false,
  setRefuseDataStorage: (refuse: boolean) => null,
})

const { Provider, Consumer } = AppContext
const AppContextProvider = (props: Props) => {
  const { data, loading, error, refetch } = useMeQuery()

  const [refuseDataStorageState, setRefuseDataStorageState] = React.useState<
    boolean
  >(false)
  const [cookies, setCookie, removeCookie] = useCookies(COOKIE_NAMES)

  // todo: instead of navigator pass values from Accepted-Language HTTP header
  const browserLocale = props.isSSR ? null : navigator.language.substring(0, 2)
  const matchingBrowserLocale = SUPPORTED_LOCALES.find(
    sL => sL === browserLocale
  )
  const closestBrowserLocale = matchingBrowserLocale
    ? matchingBrowserLocale
    : browserLocale
    ? SUPPORTED_LOCALES.find(
        sL => sL.substring(0, 2) === browserLocale.substring(0, 2)
      )
    : null

  const defaultlocale = closestBrowserLocale
    ? closestBrowserLocale
    : SUPPORTED_LOCALES[0]
  const cookieLocale =
    cookies.locale && SUPPORTED_LOCALES.includes(cookies.locale)
      ? cookies.locale
      : null
  const resultingLocale = cookies.locale ? cookies.locale : defaultlocale

  if (error) {
    return <p>Error {error.message}</p>
  }

  return (
    <Provider
      value={{
        me: data?.me,
        isSSR: props.isSSR,
        supportedLocales: SUPPORTED_LOCALES,
        locale: resultingLocale,
        language: resultingLocale.substring(0, 2),
        refetch,
        setRefuseDataStorage: (refuse: boolean) => {
          if (refuse) {
            COOKIE_NAMES.forEach(name => removeCookie(name))
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
