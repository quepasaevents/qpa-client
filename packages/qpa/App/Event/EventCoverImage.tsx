import { useFormik } from "formik"
import { Button } from "qpa-components"
import { Props } from "react"
import * as React from "react"
import styled from "@emotion/styled"
import { EventDetailsData } from "./useEventDetailsQuery"
import useSetCoverImage from "./useSetCoverImage"

interface Props {
  event: EventDetailsData
  canEdit: boolean
}

const EventCoverImage = (props: Props) => {
  const [uploadImage, { data, loading, error }] = useSetCoverImage()
  return (
    <Root>
      <img src={props.event?.images?.cover?.url} />
      <input
        type="file"
        accept="image/*"
        onChange={event => {
          const file = (event.currentTarget as any).files[0]
          uploadImage({
            variables: {
              eventId: props.event.id,
              file
            }
          })
        }}
      />
      <Button label="upload" />
    </Root>
  )
}

const Root = styled.div``

export default EventCoverImage
