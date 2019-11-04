import * as React from "react"
import { useMessageCenter } from "qpa-message-center"
import { useAppContext } from "../App/Context/AppContext"
import useCreateEventMutation from "./useCreateEventMutation"
import EventForm, { EventFormData } from "./EventForm"
import intl from "react-intl-universal"

const CreateEvent = () => {
  const { addMessage } = useMessageCenter()
  const { supportedLocales } = useAppContext()
  const [createEvent, { loading }] = useCreateEventMutation({
    onCompleted: () =>
      addMessage({
        type: "success",
        text: intl.get("event-create-success"),
      }),
    onError: error => {
      addMessage({
        type: "error",
        text: intl.get("event-create-error", { message: error.message }),
      })
    },
  })
  return (
    <div>
      <EventForm
        locales={supportedLocales}
        loading={loading}
        onSubmit={(values: EventFormData) => {
          createEvent({
            variables: {
              input: {
                infos: values.infos,
                location: values.location,
                time: {
                  ...values.time,
                  timeZone: "Europe/Madrid",
                },
                status: "confirmed",
                meta: values.meta,
              },
            },
          })
        }}
      />
    </div>
  )
}

export default CreateEvent
