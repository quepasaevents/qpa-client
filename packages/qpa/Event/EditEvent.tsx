import { Spinner } from "qpa-components"
import * as React from "react"
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
  const [
    deleteEvent,
    { loading: deleteEventLoading },
  ] = useDeleteEventMutation()
  const [editEvent, { loading: editLoading }] = useEditEventMutation({
    onCompleted: () => {
      alert("Event edited successfully")
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
    return <p>{ error.message }</p>
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
