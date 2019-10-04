import styled from "@emotion/styled"
import * as React from "react"
import {hot} from "react-hot-loader"
import {Link} from "react-router-dom"
import {AppContext} from "../../App/Context/AppContext"
import {OccurrenceData} from "../../Event/OccurrencesQuery"

interface Props {
    occurrence: OccurrenceData
    canEdit: boolean
}

const sanitizeEventName = (name: string) => {
    return encodeURIComponent(name.trim().toLocaleLowerCase()
        .replace(/\s+/g, "-"))

}
const ListItem = (props: Props) => {
    const {occurrence} = props
    const {event} = occurrence
    const info = event.info[0]
    const startTime = occurrence.start.split(" ")[1].substring(0, 5)
    return (
        <Root>
            <Time>
                {startTime}
            </Time>
            <Link to={`/o/${sanitizeEventName(event.info[0].title)}/${occurrence.id}`}>
                {info.title}
            </Link>
            <Location>
                {event.location.name}
            </Location>
            <Address>
                {event.location.address}
            </Address>
            {
                props.canEdit ? (
                    <EditLink to={`/event/${event.id}/edit`}>Edit</EditLink>
                ) : null
            }
        </Root>
    )
}
const Root = styled.div`
  display: grid;
  grid-template-columns: [time] 48px [details] 1fr [edit] 24px;
  grid-template-rows: [main] 24px [small1] 12px [small2] 12px;
`
const EditLink = styled(Link)`
  margin-left: 8px;
  font-size: 0.6em;
  grid-row: small2;
  grid-column: -1;
`
const Time = styled.div`
  grid-column: time;
  grid-row: main;
`
const SubInfoLine = styled.div`
  grid-column: details;
  font-size: 0.8em;
  color: rgba(0,0,0,.7);
`
const Location = styled(SubInfoLine)`
  grid-row: small1;
`
const Address = styled(SubInfoLine)`
  grid-row: small2;
`

export default hot(module)(ListItem)