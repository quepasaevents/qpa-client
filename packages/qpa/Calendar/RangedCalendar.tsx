import { Spinner } from "qpa-components"
import * as React from "react"
import UseOccurrencesQuery from "../Event/OccurrencesQuery"
import List from "./List"

interface Props {
  from: Date
  to: Date
  className: string
}

const RangedCalendar = (props: Props) => (
  <UseOccurrencesQuery
    variables={{
      filter: {
        from: props.from,
        to: props.to,
      },
    }}
  >
    {({data, error, loading}) => {
      if (loading) {
        return <Spinner />
      }
      if (error) {
        return error.message
      }

      if (!data.occurrences.length) {
        return <p>No occurrences</p>
      }
      return <List className={props.className} occurrences={data.occurrences}/>
    }}
  </UseOccurrencesQuery>
)

export default RangedCalendar
