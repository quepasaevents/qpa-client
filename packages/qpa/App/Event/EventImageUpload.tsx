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
    className?: string
}

const EventImageUpload = (props: Props) => {
  const [uploadImage, { data, loading, error }] = useSetEventImage()
  return (
    <Root className={props.className}>
      {props.canEdit && props.title ? <span>{props.title}</span> : null}
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

export default styled(EventImageUpload)``
