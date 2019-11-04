import { Spinner } from "qpa-components"
import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import intl from "react-intl-universal"
import { useAppContext } from "../App/Context/AppContext"
import removeTypename from "../App/remove-typename"
import useEditEventMutation from "./useEditEventMutation"
import useDeleteEventMutation from "./useDeleteEventMutation"
import EventForm from "./EventForm"
import useGetEventQuery from "./useGetEventQuery"

interface Props {
  eventId: string
}

const EditEvent = (props: Props) => {
  const { supportedLocales } = useAppContext()
  const { addMessage } = useMessageCenter()

  const [
    deleteEvent,
    { loading: deleteEventLoading },
  ] = useDeleteEventMutation()
  const [editEvent, { loading: editLoading }] = useEditEventMutation({
    onCompleted: () =>
      addMessage({
        type: "success",
        text: intl.get("event-edit-success"),
      }),
    onError: error => {
      addMessage({
        type: "error",
        text: intl.get("event-edit-error", { message: error.message }),
      })
    },
  })
  const { data, loading, error } = useGetEventQuery({
    variables: { id: props.eventId },
    skip: !props.eventId,
  })
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  const event = removeTypename(data.event)

  return (
    <EventForm
      loading={editLoading}
      deleteEventLoading={deleteEventLoading}
      locales={supportedLocales}
      onDeleteEvent={() => {
        deleteEvent({
          variables: {
            id: props.eventId,
          },
        })
      }}
      onSubmit={values => {
        editEvent({
          variables: {
            input: {
              id: props.eventId,
              ...values,
            },
          },
        })
      }}
      values={{
        meta: {
          tags: event.meta.tags,
        },
        time: event.time,
        location: {
          address: event.location.address || "",
          name: event.location.name || "",
        },
        infos: event.infos,
        status: event.status,
      }}
    />
  )
}

export default EditEvent
