import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import updateEventTagMutation from "./updateEventTagMutation"
import { EventTagData } from "./useGetAvaiableTagsQuery"
import styled from "@emotion/styled"

interface Props {
  eventTag: EventTagData
}

const EditEventTag = (props: Props) => {
  const { addMessage } = useMessageCenter()
  const [mutation, { data, loading, error }] = updateEventTagMutation({
    onCompleted: () => {

    },
  })
  return <Root></Root>
}

const Root = styled.div``
export default EditEventTag
