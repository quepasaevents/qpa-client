import styled from "@emotion/styled"
import * as addMonths from "date-fns/add_months"
import * as endOfMonth from "date-fns/end_of_month"
import * as startOfMonth from "date-fns/start_of_month"
import { PrimaryButton } from "qpa-components"
import * as React from "react"
import RangedCalendar from "./RangedCalendar"

interface Props {

  className?: string
}

const now = new Date()

const Calendar = (props: Props) => {
  const [from, setFrom] = React.useState(startOfMonth(now))
  const [to, setTo] = React.useState(endOfMonth(now))

  const offset = (months: number) => {
    setFrom(addMonths(from, months))
    setTo(addMonths(to, months))
  }

  return (
    <Root>
      <Title>
        <p>From: {String(from)}</p><p>To: {String(to)}</p>
      </Title>
      <Controls>
        <PrimaryButton title="Previous" onClick={() => offset(-1)}>Previous month</PrimaryButton>
        <PrimaryButton title="Next" onClick={() => offset(1)}>Next month</PrimaryButton>
      </Controls>
      <RangedCalendar from={from} to={to} className={props.className}/>
    </Root>
  )

}

const Title = styled.div`

`

const Controls = styled.div`

`

const Root = styled.div`

`

export default Calendar
