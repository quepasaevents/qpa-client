import styled from "@emotion/styled"
import * as React from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../Context/AppContext"

interface Props {
  className?: string
}

const Header = (props: Props) => (
  <AppContext>
    {({ me }) => (
      <Root className={props.className}>
        <Menu />
        <Title />
        <LinksSection>
          {me ? (
            <>
              <StyledLink to="/create">Create event</StyledLink>
              <StyledLink to="/logout">Log out</StyledLink>
            </>
          ) : (
            <>
              <StyledLink to="/login">Log In</StyledLink>
              <StyledLink to="/signup">Sign Up</StyledLink>
            </>
          )}
        </LinksSection>
      </Root>
    )}
  </AppContext>
)

const StyledLink = styled(Link)`
  color: rgba(0,0,0,.7);
  &:not(:first-of-type) {
    margin-left: 8px;
  }
`

const Menu = styled.div``
const Title = styled.div`
  flex: 1;
`
const Root = styled.div`
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  padding-right: 14px;
`

const LinksSection = styled.div`
  align-self: center;
  padding: 4px;
`
export default Header
