import * as React from "react"
import { useMessageCenter } from "qpa-message-center"
import { useAppContext } from "../App/Context/AppContext"
import useCreateEventMutation from "./useCreateEventMutation"
import EventForm, { EventFormData } from "./EventForm"

const CreateEvent = () => {
  const { addMessage } = useMessageCenter()
  const { supportedLocales } = useAppContext()
  const [createEvent, { loading }] = useCreateEventMutation({
    onCompleted: () =>
      addMessage({
        type: "success",
        text: "Event was created successfully",
      }),
  })
  return (
    <div>
      <button onClick={() => addMessage({
        text: 'hello'
      })} >hello</button>
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
