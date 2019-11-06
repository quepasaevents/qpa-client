import { Spinner } from "qpa-components"
import * as React from "react"
import useOccurrencesQuery from "../Event/useOccurrencesQuery"
import List from "./List"
import { format } from "date-fns"
import intl from "react-intl-universal"
import messages from "./calendar.msg.json"

interface Props {
  from: Date
  to: Date
  className: string
}

const RangedCalendar = (props: Props) => {
  intl.load({
    "en-GB": messages.en,
    "es-ES": messages.es ,
  })
  const { data, error, loading } = useOccurrencesQuery({
    variables: {
      filter: {
        from: format(props.from, "yyyy-MM-dd'T'HH:mm"),
        to: format(props.to, "yyyy-MM-dd'T'HH:mm"),
      },
    },
  })
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <p>{error.message}</p>
  }

  if (!data.occurrences.length) {
    return <p>{intl.get("no-events")}</p>
  }
  return <List className={props.className} occurrences={data.occurrences} />
}
export default RangedCalendar
