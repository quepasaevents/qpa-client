import mouse, { css, Global } from "qpa-emotion"
import { MessageCenterDisplay } from "qpa-message-center"
import * as React from "react"
import Footer from "./Footer"
import Header from "./Header/Header"
import Routes from "./Routes"
import * as intl from "react-intl-universal"
import { Helmet } from "react-helmet"
import AppMessages from "./App.msg.json"

const App = () => {
  intl.init({
    currentLocale: "es-ES",
    locales: {
      "en-GB": AppMessages.en,
      "es-ES": AppMessages.es,
    },
  })
  return (
    <Root>
      <Helmet>
        <title>{intl.get("APP_TITLE")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Global
        styles={css`
          body {
            margin: 0;
            height: 100vh;
            --sansserif: "Segoe UI Web (East European)", Segoe UI, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
            font-family: var(--sansserif);
          }
          #app {
            height: 100%;
          }
        `}
      />
      <StyledHeader />
      <Content>
        <Routes />
      </Content>
      <MessageCenterDisplay />
      <StyledFooter />
    </Root>
  )
}
const Root = mouse.div`
  display: grid;
  height: 100%;
  grid-template-columns:
    [left-start full-start] minmax(0, 240px)
    [left-end content-start] minmax(320px, 1200px)
    [content-end right-start] minmax(0, 240px)
    [right-end full-end];
  grid-template-rows:
    [header-start] 48px
    [header-end center-start] 1fr
    [center-end footer-start] 32px
    [footer-end];
`

const Content = mouse.div`
  grid-row: center;
  grid-column: content;
`

const StyledFooter = mouse(Footer)`
  grid-row: footer;
  grid-column: full;
`
const StyledHeader = mouse(Header)`
  grid-column: full;
  grid-row: header;
`
export default App
