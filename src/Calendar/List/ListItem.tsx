import styled from "@emotion/styled"
import * as React from "react"
import { hot } from "react-hot-loader"
import { Link } from "react-router-dom"
import { AppContext } from "../../App/Context/AppContext"
import { OccurrenceData } from "../../Event/OccurrencesQuery"

interface Props {
  occurrence: OccurrenceData
  canEdit: boolean
}

const sanitizeEventName = (name: string) => {
  return encodeURIComponent(name.trim().toLocaleLowerCase()
    .replace(/\s+/g, "-"))

}
const ListItem = (props: Props) => {
  const { occurrence } = props
  const { event } = occurrence
  const info = event.info[0]
  const startTime = occurrence.start.split(" ")[1].substring(0, 5)
  return (
    <div>
      {startTime}
      &nbsp;
      <Link to={`/o/${sanitizeEventName(event.info[0].title)}/${occurrence.id}`}>
        {info.title}
      </Link>
      {
        props.canEdit ? (
          <EditLink to={`/event/${event.id}/edit`}>Edit</EditLink>
        ) : null
      }
    </div>
  )
}

const EditLink = styled(Link)`
  margin-left: 8px;
  font-size: 0.6em;
`

export default hot(module)(ListItem)
