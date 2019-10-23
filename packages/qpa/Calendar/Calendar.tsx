import styled from "@emotion/styled"
import { addMonths, endOfMonth, startOfMonth, isBefore } from "date-fns"
import { Button } from "qpa-components"
import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router"
import RangedCalendar from "./RangedCalendar"
import { hot } from "react-hot-loader"

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
  const monthBeforeIsPast = isBefore(
    startOfMonth(monthBefore),
    startOfMonth(new Date())
  )

  const monthAfter = addMonths(from, 1)
  const monthAfterName = MONTH_NAMES[monthAfter.getMonth()]

  return (
    <CalendarRoot>
      <Controls>
        <Button
          disabled={!!monthBeforeIsPast}
          onClick={() => {
            props.history.push(`/${monthBeforeName}`)
          }}
        >
          {"<"}
        </Button>
        <ThisMonth>{MONTH_NAMES[from.getMonth()]}</ThisMonth>
        <Button
          onClick={() => {
            props.history.push(`/${monthAfterName}`)
          }}
        >
          {">"}
        </Button>
      </Controls>
      <RangedCalendar from={from} to={to} className={props.className} />
    </CalendarRoot>
  )
}

const Controls = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  ${Button} {
    width: 38px;
  }
`

const ThisMonth = styled.div`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
  font-size: 24px;
  text-transform: capitalize;
`

const CalendarRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  ${Controls} {
    margin-bottom: 24px;
  }
`

export default withRouter(Calendar)
