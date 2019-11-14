import styled, { css, Global } from "qpa-emotion"
import * as React from "react"
import { hot } from "react-hot-loader/root"
import Footer from "./Footer"
import Header from "./Header/Header"
import Routes from "./Routes"
import * as intl from "react-intl-universal"
import { Helmet } from "react-helmet"
import AppMessages from "./App.msg.json"
import MessageStage from "qpa-message-center/MessageStage"

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
            --sansserif: "Segoe UI Web (East European)", Segoe UI, -apple-system,
              BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
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
      <StyledFooter />
      <MessageStage />
    </Root>
  )
}
const Root = styled.div`
  display: grid;
  height: 100%;
  width: 100vw;
  grid-template-columns:
    [left-start full-start] minmax(0, 240px)
    [left-end content-start] auto
    [content-end right-start] minmax(0, 240px)
    [right-end full-end];
  grid-template-rows:
    [header-start] 48px
    [header-end center-start] 1fr
    [center-end footer-start] 32px
    [footer-end];
    
  @media(max-width: 640px) {
    grid-template-columns:
     [left-start full-start] 0
     [left-end content-start] auto
     [content-end right-start] 0
     [right-end full-end];
  }
`

const Content = styled.div`
  grid-row: center;
  grid-column: content;
  //padding: 0 4px 0 4px;
`

const StyledFooter = styled(Footer)`
  grid-row: footer;
  grid-column: full;
  margin-top: 8px;
`
const StyledHeader = styled(Header)`
  grid-column: full;
  grid-row: header;
`
export default hot(App)
