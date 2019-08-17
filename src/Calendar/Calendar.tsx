import styled from "@emotion/styled"
import addMonths from "date-fns/add_months"
import endOfMonth from "date-fns/end_of_month"
import startOfMonth from "date-fns/start_of_month"
import {PrimaryButton} from "qpa-components"
import * as React from "react"
import {hot} from "react-hot-loader"
import RangedCalendar from "./RangedCalendar"

interface Props {
  month?: string
  className?: string

}

const now = new Date()
const MONTH_NAMES = ["january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"]

const Calendar = (props: Props) => {
  const currentDateOfMonth = (props.month && MONTH_NAMES.includes(props.month)) ? (
    now.setMonth(MONTH_NAMES.indexOf(props.month))
  ) : now

  const [from, setFrom] = React.useState<Date>(startOfMonth(currentDateOfMonth))
  const [to, setTo] = React.useState<Date>(endOfMonth(currentDateOfMonth))

  const offset = (months: number) => {
    setFrom(addMonths(from, months))
    setTo(addMonths(to, months))
  }

  const monthBefore = addMonths(from, -1)
  const monthAfter = addMonths(from, 1)

  return (
    <Root>
      <Controls>
        <PrimaryButton title="Previous"
                       onClick={() => offset(-1)}>{"<"}{MONTH_NAMES[monthBefore.getMonth()]}</PrimaryButton>
        <ThisMonth>{ MONTH_NAMES[from.getMonth()] }</ThisMonth>
        <PrimaryButton title="Next" onClick={() => offset(1)}>{MONTH_NAMES[monthAfter.getMonth()]}{">"}</PrimaryButton>
      </Controls>
      <RangedCalendar from={from} to={to} className={props.className}/>
    </Root>
  )

}

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`

const ThisMonth = styled.div`
  font-weight: 600;

color: rgba(0,0,0,.6);

font-size: 24px;
`

const Root = styled.div`
  min-width: 480px;
  display: flex;
  flex-direction: column;
  ${Controls} {
    margin-bottom: 24px;
  }
`

export default hot(module)(Calendar)
