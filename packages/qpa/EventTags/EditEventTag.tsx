import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import EventTagForm, { EventTagFormData } from "./EventTagForm"
import updateEventTagMutation from "./updateEventTagMutation"
import { EventTagFullData } from "./useGetAllTagsWithTranslationsQuery"
import styled from "@emotion/styled"
import intl from "react-intl-universal"

interface Props {
  eventTag: EventTagFullData
  existingTags: EventTagFullData[]
}

const EditEventTag = (props: Props) => {
  const { addMessage } = useMessageCenter()
  const [updateEventTag, { data, loading, error }] = updateEventTagMutation({
    onCompleted: () => {
      addMessage({
        type: "success",
        text: intl.get("tag-update-success"),
      })
    },
    onError: (err) => {
      addMessage({
        type: "error",
        text: intl.get("tag-update-error", {error: error.message})
      })
    }
  })
  return (
    <Root>
      <EventTagForm
        values={props.eventTag}
        existingTags={props.existingTags}
        onSubmit={(values: EventTagFormData) => {
          updateEventTag({
            variables: {
              input: {
                id: props.eventTag.id,
                translations: values.translations,
                name: values.name,
              },
            },
          })
        }}
      />
    </Root>
  )
}

const Root = styled.div``
export default EditEventTag
