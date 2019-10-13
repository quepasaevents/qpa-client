import styled from "@emotion/styled"
import addMonths from "date-fns/add_months"
import endOfMonth from "date-fns/end_of_month"
import startOfMonth from "date-fns/start_of_month"
import { PrimaryButton } from "qpa-components"
import * as React from "react"
import { hot } from "react-hot-loader"
import { RouteComponentProps, withRouter } from "react-router"
import RangedCalendar from "./RangedCalendar"

interface Props extends RouteComponentProps<{ month?: string }> {
  className?: string
}

const now = new Date()
const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
]

const Calendar = (props: Props) => {
  const month = props.match.params.month

  const currentDateOfMonth =
    month && MONTH_NAMES.includes(month)
      ? now.setMonth(MONTH_NAMES.indexOf(month))
      : now

  const from = startOfMonth(currentDateOfMonth)
  const to = endOfMonth(currentDateOfMonth)

  const monthBefore = addMonths(from, -1)
  const monthBeforeName = MONTH_NAMES[monthBefore.getMonth()]
  const monthAfter = addMonths(from, 1)
  const monthAfterName = MONTH_NAMES[monthAfter.getMonth()]

  return (
    <Root>
      <Controls>
        <PrimaryButton
          title="Previous"
          onClick={() => {
            props.history.push(`/${monthBeforeName}`)
          }}
        >
          {"<"}
          {monthBeforeName}
        </PrimaryButton>
        <ThisMonth>{MONTH_NAMES[from.getMonth()]}</ThisMonth>
        <PrimaryButton
          title="Next"
          onClick={() => {
            props.history.push(`/${monthAfterName}`)
          }}
        >
          {monthAfterName}
          {">"}
        </PrimaryButton>
      </Controls>
      <RangedCalendar from={from} to={to} className={props.className} />
    </Root>
  )
}

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`

const ThisMonth = styled.div`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
  font-size: 24px;
`

const Root = styled.div`
  min-width: 480px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  ${Controls} {
    margin-bottom: 24px;
  }
`

export default hot(module)(withRouter(Calendar))
