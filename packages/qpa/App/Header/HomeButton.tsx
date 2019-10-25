import * as React from 'react'
import Button from 'qpa-components/Button'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const HomeButton = (props) => <StyledLink className={props.className} to="/" css={{textDecoration: 'none'}}>
    QuéPasa
</StyledLink>

const StyledLink = styled(Link)`
  font-size: 24px;
  text-decoration: none;
  color: white;
`
export default styled(HomeButton)``
