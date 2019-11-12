import styled from "@emotion/styled"
import { addWeeks, endOfWeek, startOfWeek, isBefore, format } from "date-fns"
import { Button, Spinner } from "qpa-components"
import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router"
import { useAppContext } from "../App/Context/AppContext"
import useOccurrencesQuery from "../Event/useOccurrencesQuery"
import List from "./List"
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

  const [fromDate, setFromDate] = React.useState(now)
  const [toDate, setToDate] = React.useState(addWeeks(fromDate, 1))

  const { language } = useAppContext()
  const { data, error, loading } = useOccurrencesQuery({
    variables: {
      language,
      filter: {
        from: format(fromDate, "yyyy-MM-dd'T'HH:mm"),
        to: format(toDate, "yyyy-MM-dd'T'HH:mm"),
      },
    },
  })
  if (!data && loading) {
    return <Spinner />
  }
  if (error) {
    return <p>{error.message}</p>
  }

  if (!data.occurrences.length) {
    return <p>{intl.get("no-events")}</p>
  }

  return (
    <Root>
      <List className={props.className} occurrences={data.occurrences} />
      <Button loading={loading} onClick={() => setToDate(addWeeks(toDate, 1))}>Load More</Button>
    </Root>
  )
}
const Root = styled.div``

export default withRouter(Calendar)
