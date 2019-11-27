import { format } from "date-fns"
import Chip from "qpa-components/Chip"
import styled, { css, Theme } from "qpa-emotion"
import * as React from "react"
import { hot } from "react-hot-loader"
import { Link } from "react-router-dom"
import { OccurrenceData } from "../../Event/useOccurrencesQuery"
import EventTags from "../../EventTags/EventTags"

interface Props {
  occurrence: OccurrenceData
  canEdit: boolean
  className?: string
  language: string
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
  const startTime = format(new Date(occurrence.start), "HH:mm")
  return (
    <Root className={props.className}>
      <Time>{startTime}</Time>
      <Title to={`/o/${sanitizeEventName(event.info.title)}/${occurrence.id}`}>
        {event.info.title}
      </Title>
      <Details>
        <Location>{event.location.name}</Location>
        <Address>{event.location.address}</Address>
      </Details>
      <Tags tags={event.tags} language={props.language} />
      {props.canEdit ? (
        <EditLink to={`/event/${event.id}/edit`}>Edit</EditLink>
      ) : null}
    </Root>
  )
}
const BreakPoint = "640px"

const Root = styled.div`
  padding: 4px;
  box-sizing: border-box;
  display: grid;
  grid-gap: 4px;
  grid-template-columns:
    [time-start] 48px [time-end details-start] minmax(0, 1fr)
    [edit-start] 24px [edit-end details-end];
  grid-template-rows:
    [main] auto
    [line1] auto
    [line2] auto
    [tags] auto;
`

const Details = styled.div`
  grid-column: details;
`

const Title = styled(Link)`
  color: ${(props: { theme: Theme }) => props.theme.colors.lead};
  font-size: 1.1em;
  text-decoration: none;
  @media (max-width: 640px) {
    font-size: 14px;
  }
`

const EditLink = styled(Link)`
  margin-left: 8px;
  font-size: 0.6em;
  grid-row: line2;
  grid-column: -1;
  text-decoration: none;
  color: inherit;
`
const Time = styled.div`
  grid-column: time;
  grid-row: main;
  @media (max-width: 640px) {
    font-size: 14px;
  }
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
const Tags = styled(EventTags)`
  grid-row: tags;
  grid-column: details;
`
export default hot(module)(ListItem)
