import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import updateEventTagMutation from "./updateEventTagMutation"
import { EventTagFullData } from "./useGetAllTagsWithTranslationsQuery"
import {
  EventTagData,
  EventTagTranslationData,
} from "./useGetAvaiableTagsQuery"
import styled from "@emotion/styled"

interface Props {
  eventTag: EventTagFullData
}

const EditEventTag = (props: Props) => {
  const { addMessage } = useMessageCenter()
  const [mutation, { data, loading, error }] = updateEventTagMutation({
    onCompleted: () => {},
  })
  return <Root></Root>
}

const Root = styled.div``
export default EditEventTag
