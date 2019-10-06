import * as React from "react"
import {useMessageCenter} from "qpa-message-center"
import CreateEventMutation from "./CreateEventMutation"
import EventForm, {EventFormData} from "./EventForm"

const CreateEvent = () => {
  const { addMessage } = useMessageCenter()

  return <CreateEventMutation onCompleted={() => {
    addMessage({
      type: "success",
      text: "Event was created successfully",
    })
  }}>
    {
      (createEvent, { loading }) => (
        <EventForm
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
        }} />
      )}
  </CreateEventMutation>
}

export default CreateEvent
