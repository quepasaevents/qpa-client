import * as React from 'react'
import styled from "qpa-emotion"

interface Props {
  className?: string
}
const Footer = (props: Props) => (
  <Root className={props.className}>

  </Root>
)

const Root = styled.div`
  background: ${props => props.theme.colors.secondary};
`

export default Footer
