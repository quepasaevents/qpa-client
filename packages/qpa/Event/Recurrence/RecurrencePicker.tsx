import { Select } from "qpa-components"
import * as React from "react"
import RRule, { Frequency } from "rrule"
import rrule from "rrule"
import styled from "@emotion/styled"
import messages from "./RecurrencePicker.msg.json"
import intl from "react-intl-universal"

interface Props {
  firstOccurrence: {
    start: string
    end: string
  }
  rrule?: string
  onChange: (rrule: string) => void
  disabled?: boolean
}

const RecurrencePicker = (props: Props) => {
  const [freq, setFreq] = React.useState(RRule.WEEKLY)

  intl.load({
    "en-GB": messages.en,
    "es-ES": messages.es,
  })

  const recurrence = new RRule({
    freq,
    dtstart: new Date(props.firstOccurrence.start),
  })

  React.useEffect(() => {
    if (!props.disabled) {
      props.onChange(recurrence.toString())
    }
  }, [freq, props.firstOccurrence.start, props.disabled])

  return (
    <Root>
      <Select
        disabled={props.disabled}
        native
        label={intl.get("repeat")}
        value={freq}
        onChange={e => {
          setFreq(e.currentTarget.value as Frequency)
        }}
      >
        <option value={RRule.DAILY}>{intl.get("daily")}</option>
        <option value={RRule.WEEKLY}>{intl.get("weekly")}</option>
        <option value={RRule.MONTHLY}>{intl.get("monthly")}</option>
      </Select>
    </Root>
  )
}

const Root = styled.div``

export default RecurrencePicker
