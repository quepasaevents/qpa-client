import { Button } from "qpa-components"
import * as React from "react"
import styled from "@emotion/styled"
import { EventImageType } from "../../../../@types"
import { EventDetailsData } from "./useEventDetailsQuery"
import useSetEventImage from "./useSetEventImage"

interface Props {
  event: EventDetailsData
  canEdit: boolean
  imageType: EventImageType
  title?: string
}

const EventImageUpload = (props: Props) => {
  const [uploadImage, { data, loading, error }] = useSetEventImage()
  return (
    <Root>
      {props.canEdit && props.title ? <span>{props.title}</span> : null}
      <img src={props.event?.images?.cover?.url} />
      <input
        type="file"
        accept="image/*"
        onChange={event => {
          const file = (event.currentTarget as any).files[0]
          uploadImage({
            variables: {
              eventId: props.event.id,
              file,
              imageType: props.imageType,
            },
          })
        }}
      />
    </Root>
  )
}

const Root = styled.div``

export default EventImageUpload
