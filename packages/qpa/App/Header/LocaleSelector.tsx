import { Button, ButtonGroup } from "qpa-components"
import { css, useTheme } from "qpa-emotion"
import * as React from "react"
import styled from "@emotion/styled"

interface Props {
  locales: string[]
  value: string
  onChange: (newLocale: string) => void
  className?: string
}

const LANGUAGE_NAMES = {
  en: "English",
  es: "Español",
}

const LocaleSelector = (props: Props) => {
  const theme = useTheme()

  return (
    <Root className={props.className}>
      <ButtonGroup>
        {props.locales.map(availableLocale => {
          const availableLanguage = availableLocale.substr(0, 2)
          const isActive = availableLocale === props.value
          return (
            <Button
              size="small"
              key={availableLocale}
              onClick={() => props.onChange(availableLocale)}
              css={css`
                && {
                  color: ${isActive
                    ? theme.colors.secondary
                    : theme.colors.gray};
                  &:hover {
                    background-color: ${!isActive
                      ? theme.colors.secondary
                      : null};
                  }
                  border-color: rgba(255, 255, 255, 0.5);
                }
              `}
            >
              {LANGUAGE_NAMES[availableLanguage]}
            </Button>
          )
        })}
      </ButtonGroup>
    </Root>
  )
}
const Root = styled.div``

export default LocaleSelector