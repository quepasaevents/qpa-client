import styled from "@emotion/styled"
import { addWeeks, endOfWeek, startOfWeek, isBefore, format } from "date-fns"
import { Button } from "qpa-components"
import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router"
import RangedCalendar from "./RangedCalendar"
import { hot } from "react-hot-loader"
import intl from "react-intl-universal"
import messages from "./calendar.msg.json"

interface Params {
  dateFrom?: string
  dateTo?: string
}
interface Props extends RouteComponentProps<Params> {
  className?: string
}

const now = new Date()

const MONTH_NAMES = Object.keys(messages).map(lang =>
  Object.keys(messages[lang])
    .filter(key => /^month\d{2}$/.test(key))
    .map(key => messages[lang][key])
)

const Calendar = (props: Props) => {
  intl.load({
    "es-ES": messages.es,
    "en-GB": messages.en,
  })

  console.log('props.match.params', props.match.params)

  const fromDate = props.match.params.dateFrom ? new Date(props.match.params.dateFrom) : now
  const toDate = props.match.params.dateTo ? new Date(props.match.params.dateTo) : addWeeks(fromDate, 1)

  return (
    <CalendarRoot>
      <RangedCalendar from={fromDate} to={toDate} className={props.className} />
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
