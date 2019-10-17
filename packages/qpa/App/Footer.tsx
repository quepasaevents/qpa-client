import * as React from "react"
import mouse, { useTheme } from "qpa-emotion"

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
const Root = mouse.div``

export default Footer
