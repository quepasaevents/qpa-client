import Chip from "qpa-components/Chip"
import styled, { css } from "qpa-emotion"
import * as React from "react"
import { hot } from "react-hot-loader"
import { Link } from "react-router-dom"
import { OccurrenceData } from "../../Event/useOccurrencesQuery"

interface Props {
  occurrence: OccurrenceData
  canEdit: boolean
}

const sanitizeEventName = (name: string) => {
  return encodeURIComponent(
    name
      .trim()
      .toLocaleLowerCase()
      .replace(/\s+/g, "-")
  )
}
const ListItem = (props: Props) => {
  const { occurrence } = props
  const { event } = occurrence
  const startTime = occurrence.start.split(" ")[1].substring(0, 5)
  return (
    <Root>
      <Time>{startTime}</Time>
      <Link
        to={`/o/${sanitizeEventName(event.info.title)}/${event.id}`}
        css={css`
          white-space: nowrap;
        `}
      >
        {event.info.title}
      </Link>
      <Location>{event.location.name}</Location>
      <Address>{event.location.address}</Address>
      <Tags>
        {event.tags.map(tag => (
          <Chip key={tag.id} label={tag.translation.text} size="small" />
        ))}
      </Tags>
      {props.canEdit ? (
        <EditLink to={`/event/${event.id}/edit`}>Edit</EditLink>
      ) : null}
    </Root>
  )
}
const Root = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-template-columns: [time] 48px [details] 1fr [tags] 1fr [edit] 24px;
  grid-template-rows: [main] 24px [line1] auto [line2] auto;
`
const EditLink = styled(Link)`
  margin-left: 8px;
  font-size: 0.6em;
  grid-row: line2;
  grid-column: -1;
`
const Time = styled.div`
  grid-column: time;
  grid-row: main;
`
const SubInfoLine = styled.div`
  grid-column: details;
  font-size: 0.8em;
  color: rgba(0, 0, 0, 0.7);
`
const Location = styled(SubInfoLine)`
  grid-row: line1;
`
const Address = styled(SubInfoLine)`
  grid-row: line2;
`
const Tags = styled.div`
  grid-column: tags;
`
export default hot(module)(ListItem)
