import * as React from "react"
import { EventData } from "./useEventsQuery"
import styled from "@emotion/styled"

interface Props {
  event: EventData
  language?: string
}

const Event = (props: Props) => {
  // Get desired language or fallback to first language
  const localInfo = props.language
    ? props.event.infos.find(info => info.language === props.language)
    : props.event.infos[0]

  return (
    <div>
      {
        localInfo ? (
          <React.Fragment>
            <Title> {localInfo.title} </Title>
            <Description> {localInfo.description} </Description>
          </React.Fragment>
        ) : 'Info not available'
      }

    </div>
  )
}

const Title = styled.div`
  font-size: 24px;
`
const Description = styled.div``
export default Event
