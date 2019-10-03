import {css, Global} from "@emotion/core"
import styled from "@emotion/styled"
import {MessageCenterDisplay} from "qpa-message-center"
import * as React from "react"
import Footer from "./Footer"
import Header from "./Header/Header"
import Routes from "./Routes"

const App = () => (
  <Root>
    <Global
      styles={css`
        body {
          margin: 0;
          height: 100vh;
        }
        #app {
          height: 100%;
        }
      `}
    />
    <StyledHeader/>
    <Content>
      <Routes />
    </Content>
    <MessageCenterDisplay/>
    <StyledFooter/>
  </Root>
)

const Root = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: [header] 48px [body] 1fr [footer] 32px;
`

const Content = styled.div`
  grid-row: body;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledFooter = styled(Footer)`
  grid-row: footer;
`
const StyledHeader = styled(Header)`
  grid-row: header;
`
export default App
