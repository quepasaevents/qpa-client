import { Icon } from "qpa-components"
import styled, { Theme, useTheme } from "qpa-emotion"
import * as React from "react"
import { hot } from "react-hot-loader"
import { Link } from "react-router-dom"
import { AppContext } from "../Context/AppContext"
import HomeButton from "./HomeButton"
import LocaleSelector from "./LocaleSelector"
import MeMenu from "./MeMenu"
import PlusIcon from "./plus_icon.svg"
import intl from "react-intl-universal"
import messages from "./header.msg.json"

interface Props {
  className?: string
}

const Header = (props: Props) => {
  const theme = useTheme()
  intl.load(messages)

  return (
    <AppContext>
      {({ me, locale, setLocale, supportedLocales }) => (
        <Root
          className={props.className}
          css={{
            background: theme.colors.lead,
          }}
        >
          <HomeButton />
          <Menu />
          <Title />
          <StyledLocaleSelector
            locales={supportedLocales}
            value={locale}
            onChange={setLocale}
          />
          <LinksSection>
            {me ? (
              <>
                <StyledLink to="/create">
                  <Icon label="Add Event">
                    <PlusIcon />{" "}
                  </Icon>
                </StyledLink>
                <MeMenu me={me} />
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
  font-size: 10px;
  color: white;
  text-decoration: none;
  &:not(:first-of-type) {
    margin-left: 14px;
  }
`

const StyledLocaleSelector = styled(LocaleSelector)`
  button {
    font-size: 10px;
  }
  margin-right: 12px;
`

const Menu = styled.div``
const Title = styled.div`
  flex: 1;
`
const Root = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 14px;
  align-items: center;
  ${HomeButton} {
    padding-left: 8px;
  }
`

const LinksSection = styled.div`
  align-self: center;
  align-items: center;
  padding: 4px;
  display: flex;
  flex-direction: row;
  > *:not(:last-child) {
    margin-right: 8px;
  }
`
export default hot(module)(Header)
