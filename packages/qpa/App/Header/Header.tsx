import styled, { Theme, useTheme } from "qpa-emotion"
import * as React from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../Context/AppContext"
import { hot } from 'react-hot-loader'

interface Props {
  className?: string
}

const Header = (props: Props) => {
  const theme = useTheme()

  return (
    <AppContext>
      {({ me }) => (
        <Root className={props.className} css={{
          background: theme.colors.lead
        }}>
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
}
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:not(:first-of-type) {
    margin-left: 14px;
  }
`

const Menu = styled.div``
const Title = styled.div`
  flex: 1;
`
const Root = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 14px;
`

const LinksSection = styled.div`
  align-self: center;
  padding: 4px;
`
export default hot(module)(Header)
