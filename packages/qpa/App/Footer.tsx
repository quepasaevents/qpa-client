import * as React from 'react'
import styled from '@emotion/styled'

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
