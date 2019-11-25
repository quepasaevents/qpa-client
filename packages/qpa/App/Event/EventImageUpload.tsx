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
      <Button label={props.title} />
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

const Root = styled.div`
  position: relative;
  width: 140px;
  height: 48px;
  > * {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  input {
    opacity: 0;
  }
`

export default styled(EventImageUpload)``
