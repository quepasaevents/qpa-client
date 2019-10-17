import * as React from "react"
import styled, { useTheme } from "qpa-emotion"

interface Props {
  className?: string
}
const Footer = (props: Props) => {
  const theme = useTheme()
  return (
    <Root
      className={props.className}
      css={{
        background: theme.colors.secondary,
      }}
    ></Root>
  )
}
const Root = styled.div``

export default Footer
