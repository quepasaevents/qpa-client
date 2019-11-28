import { Button, ButtonGroup } from "qpa-components"
import { css, useTheme } from "qpa-emotion"
import * as React from "react"
import styled from "@emotion/styled"
import flagGB from "./flag-gb.png"
import flagES from "./flag-es.png"

interface Props {
  locales: string[]
  value: string
  onChange: (newLocale: string) => void
  className?: string
}

const LANGUAGE_DISPLAY = {
  "en-GB": {
    name: "English",
    icon: flagGB,
  },
  "es-ES": {
    name: "Español",
    icon: flagES,
  },
}

const LocaleSelector = (props: Props) => {
  const theme = useTheme()

  return (
    <Root className={props.className}>
      <ButtonGroup>
        {props.locales.map(availableLocale => {
          const isActive = availableLocale === props.value
          return (
            <Button
              size="small"
              key={availableLocale}
              onClick={() => props.onChange(availableLocale)}
              css={css`
                && {
                  background-color: ${isActive ? theme.colors.gray : null};
                  &:hover {
                    background-color: ${!isActive
                      ? theme.colors.secondary
                      : null};
                  }
                  border-color: rgba(255, 255, 255, 0.5);
                }
              `}
            >
              <LocaleIconImg src={LANGUAGE_DISPLAY[availableLocale].icon} />
            </Button>
          )
        })}
      </ButtonGroup>
    </Root>
  )
}
const Root = styled.div``
const LocaleIconImg = styled.img`
  height: 24px;
  @media (max-width: 800px) {
    height: 18px;
  }
`
export default LocaleSelector
