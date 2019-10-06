import * as React from "react"
import {useMessageCenter} from "qpa-message-center"
import {useAppContext} from "../App/Context/AppContext"
import CreateEventMutation from "./CreateEventMutation"
import EventForm, {EventFormData} from "./EventForm"

const CreateEvent = () => {
  const { addMessage } = useMessageCenter()
  const { supportedLanguages } = useAppContext()

  return <CreateEventMutation onCompleted={() => {
    addMessage({
      type: "success",
      text: "Event was created successfully",
    })
  }}>
    {
      (createEvent, { loading }) => (
        <EventForm
          languages={supportedLanguages}
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
