import {css, Global} from "@emotion/core"
import styled from "@emotion/styled"
import {MessageCenterDisplay} from "qpa-message-center"
import * as React from "react"
import {RouteComponentProps} from "react-router"
import {Redirect, Route, Switch} from "react-router-dom"
import Calendar from "../Calendar/Calendar"
import CreateEvent from "../Event/CreateEvent"
import EditEvent from "../Event/EditEvent"
import InitializeSession from "./Auth/InitializeSession"
import Login from "./Auth/Login"
import Signout from "./Auth/Signout"
import Signup from "./Auth/Signup"
import Footer from "./Footer"
import Header from "./Header/Header"
import OccurrenceDetails from "./Occurrence/OccurrenceDetails"

import firaSansLatin100 from "typeface-fira-sans/files/fira-sans-latin-100.woff"
import firaSansLatin600 from "typeface-fira-sans/files/fira-sans-latin-600.woff"
import firaSansLatin800 from "typeface-fira-sans/files/fira-sans-latin-800.woff"

const App = () => (
  <Root>
    <Global
      styles={css`
        @font-face {
          font-family: "Fira Sans";
          font-style: normal;
          font-display: swap;
          font-weight: 100;
          src:
            url(${firaSansLatin100}) format('woff'); /* Modern Browsers */
          }
        }
        @font-face {
          font-family: "Fira Sans";
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src:
            url(${firaSansLatin600}) format('woff'); /* Modern Browsers */
          }
        }
        @font-face {
          font-family: "Fira Sans";
          font-style: normal;
          font-display: swap;
          font-weight: 800;
          src:
            url(${firaSansLatin800}) format('woff'); /* Modern Browsers */
          }
        }
        body {
          margin: 0;
          height: 100vh;
          font-family: "Fira Sans";
        }
        #app {
          height: 100%;
        }
      `}
    />
    <StyledHeader/>
    <Content>
      <Switch>
        <Route path="/create" component={CreateEvent}/>
        <Route
          path="/event/:eventId/edit"
          render={(routeProps: RouteComponentProps<{ eventId: string }>) => (
            <EditEvent eventId={routeProps.match.params.eventId}/>
          )}
        />
        <Route
          path="/o/:sanitizedEventName/:occurrenceId"
          component={OccurrenceDetails}
        />
        <Route path="/init-session/:hash" component={InitializeSession}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/logout" component={Signout}/>
        <Route path="/:month" render={(props) => <Calendar month={props.match.params.month} />}/>
        <Route path="/" render={(props) => <Calendar />}/>
        <Redirect to="/"/>
      </Switch>
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
