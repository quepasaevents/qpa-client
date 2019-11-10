import * as React from "react"
import { Route, Switch, useRouteMatch, withRouter } from "react-router"
import styled from "@emotion/styled"
import intl from "react-intl-universal"
import EditEventTags from "../../EventTags/EditEventTags"
import { useAppContext } from "../Context/AppContext"
import messages from "./admin.msg.json"

const Admin = () => {
  const { path } = useRouteMatch()
  const { me } = useAppContext()
  intl.load(messages)
  return (
    <Root>
      <Title>{intl.get("admin_title")}</Title>
      <p>
        {intl.get("available-roles", {
          roles: me.roles.map(role => role.type).join(", "),
        })}
      </p>
      <Switch>
        <Route path={`${path}/tags`} component={EditEventTags} />
      </Switch>
    </Root>
  )
}

const Root = styled.div``
const Title = styled.div`
  font-size: 24px;
`
export default withRouter(Admin)
