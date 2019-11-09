import * as React from "react"
import {Route, Switch, useRouteMatch, withRouter} from "react-router"
import styled from "@emotion/styled"
import intl from "react-intl-universal"
import EditEventTags from "../../EventTags/EditEventTags"
import messages from "./admin.msg.json"

const Admin = () => {
    let { path } = useRouteMatch();

    intl.load(messages)
  return (
    <Root>
      <Title>{intl.get("admin_title")}</Title>
      <Switch>
          <Route path={`${path}/tags`} component={EditEventTags}/>
      </Switch>
    </Root>
  )
}

const Root = styled.div``
const Title = styled.div`
  font-size: 24px;
`
export default withRouter(Admin)
