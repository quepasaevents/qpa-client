import * as React from "react"
import styled, { useTheme } from "qpa-emotion"
import messages from "./Footer.msg.json"
import intl from "react-intl-universal"
interface Props {
  className?: string
}
const Footer = (props: Props) => {
  const theme = useTheme()
  intl.load(messages)
  return (
    <Root
      className={props.className}
      css={{
        background: theme.colors.secondary,
        textAlign: "center",
      }}
    >
      {intl.get("footer-message")}
    </Root>
  )
}
const Root = styled.div``

export default Footer
