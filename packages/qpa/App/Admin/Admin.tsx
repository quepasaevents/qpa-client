import * as React from "react"
import { withRouter } from "react-router"
import styled from "@emotion/styled"
import intl from "react-intl-universal"
import messages from "./admin.msg.json"

const Admin = () => {
  intl.load(messages)
  return (
    <Root>
      <Title>{intl.get("admin_title")}</Title>
    </Root>
  )
}

const Root = styled.div``
const Title = styled.div`
  font-size: 24px;
`
export default withRouter(Admin)
