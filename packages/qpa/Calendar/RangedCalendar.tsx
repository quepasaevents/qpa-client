import { Spinner } from "qpa-components"
import * as React from "react"
import useOccurrencesQuery from "../Event/useOccurrencesQuery"
import List from "./List"

interface Props {
  from: Date
  to: Date
  className: string
}

const RangedCalendar = (props: Props) => {
  const { data, error, loading } = useOccurrencesQuery({
    variables: {
      filter: {
        from: props.from,
        to: props.to,
      },
    },
  })
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return error.message
  }

  if (!data.occurrences.length) {
    return <p>No occurrences</p>
  }
  return <List className={props.className} occurrences={data.occurrences} />
}
export default RangedCalendar
