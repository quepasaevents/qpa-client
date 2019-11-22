import * as React from "react"
import styled from "@emotion/styled"
import css from "@emotion/css"
import { EventDetailsData } from "./useEventDetailsQuery"

interface Props {
  event: EventDetailsData
  canEdit: boolean
}

const EventCoverImage = (props: Props) => {
  return <Root>
    <img src={props.event?.images?.cover?.url}/>
  </Root>
}

const Root = styled.div``

export default EventCoverImage
