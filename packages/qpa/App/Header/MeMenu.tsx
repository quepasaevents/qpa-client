import { Avatar, IconButton, Menu, MenuItem } from "qpa-components"
import * as React from "react"
import styled from "@emotion/styled"
import { hot } from "react-hot-loader"
import { RouteComponentProps, withRouter } from "react-router"
import { UserData } from "../Context/useMeQuery"

interface Props extends RouteComponentProps {
  me: UserData
}
const MeMenu = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const closeAndGo = (path: string) => {
    setAnchorEl(null)
    props.history.push(path)
  }
  const roleTypes = props.me.roles.map(role => role.type)

  return (
    <Root>
      <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
        <Avatar>{props.me.name.substr(0, 1).toUpperCase()}</Avatar>
      </IconButton>
      <Menu open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
        <MenuItem onClick={() => closeAndGo("/my-events")}>My Events</MenuItem>
        {(roleTypes.includes("admin") || roleTypes.includes("embassador")) && (
          <MenuItem onClick={() => closeAndGo("/admin")}>Manage Users</MenuItem>
        )}
        <MenuItem onClick={() => closeAndGo("/logout")}>Log Out</MenuItem>
      </Menu>
    </Root>
  )
}
const Root = styled.div``

export default hot(module)(withRouter(MeMenu))
