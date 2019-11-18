import { Button, ButtonGroup } from "qpa-components"
import * as React from "react"
import styled from "@emotion/styled"

interface Props {
  locales: string[]
  value: string
  onChange: (newLocale: string) => void
}

const LANGUAGE_NAMES = {
  en: "English",
  es: "Español",
}

const LocaleSelector = (props: Props) => (
  <Root>
    <ButtonGroup>
      {props.locales.map(availableLocale => {
        const availableLanguage = availableLocale.substr(0, 2)
        const isActive = availableLocale === props.value
        return (
          <Button
            size="small"
            key={availableLocale}
            color={isActive ? "primary" : "secondary"}
            onClick={() => props.onChange(availableLocale)}
          >
            {LANGUAGE_NAMES[availableLanguage]}
          </Button>
        )
      })}
    </ButtonGroup>
  </Root>
)

const Root = styled.div``

export default LocaleSelector
