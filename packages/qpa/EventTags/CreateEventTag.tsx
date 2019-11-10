import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import EventTagForm, { EventTagFormData } from "./EventTagForm"
import useCreateEventTagMutation from "./useCreateEventTagMutation"
import {
  EventTagFullData,
} from "./useGetAllTagsWithTranslationsQuery"
import intl from "react-intl-universal"

interface Props {
  existingTags: EventTagFullData[]
  onDone: () => void
}

const CreateEventTag = (props: Props) => {
  const { addMessage } = useMessageCenter()
  const [createEventTag, { data, loading, error }] = useCreateEventTagMutation({
    onCompleted: data => {
      addMessage({
        type: "success",
        text: intl.get("event-tag-create-success", {
          name: data.createEventTag.name,
        }),
      })
      props.onDone()
    },
    onError: err => {
      addMessage({
        type: "error",
        text: intl.get("event-tag-create-error", { error: error.message }),
      })
    },
  })
  return (
    <EventTagForm
      loading={loading}
      existingTags={props.existingTags}
      onSubmit={(values: EventTagFormData) => {
        createEventTag({
          variables: {
            input: {
              name: values.name,
              translations: values.translations.map(translationValue => ({
                language: translationValue.language,
                text: translationValue.text,
              })),
            },
          },
        })
      }}
    />
  )
}

export default CreateEventTag
