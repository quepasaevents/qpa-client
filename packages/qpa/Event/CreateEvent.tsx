import * as React from "react"
import { useMessageCenter } from "qpa-message-center"
import { RouteComponentProps, withRouter } from "react-router"
import { useAppContext } from "../App/Context/AppContext"
import useCreateEventMutation from "./useCreateEventMutation"
import EventForm, { EventFormData } from "./EventForm"
import intl from "react-intl-universal"

const CreateEvent = (props: RouteComponentProps) => {
  const { addMessage } = useMessageCenter()
  const { supportedLocales } = useAppContext()
  const [createEvent, { loading }] = useCreateEventMutation({
    onCompleted: data => {
      addMessage({
        type: "success",
        text: intl.get("event-create-success"),
      })
      props.history.push(`/event/${data.createEvent.id}/edit`)
    },
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
                tagNames: values.tagNames,
              },
            },
          })
        }}
      />
    </div>
  )
}

export default withRouter(CreateEvent)
