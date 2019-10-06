import { Spinner } from "qpa-components"
import * as React from "react"
import removeTypename from "../App/remove-typename"
import EditEventMutation from "./EditEventMutation"
import EventForm from "./EventForm"
import GetEventQuery from "./GetEventQuery"

interface Props {
  eventId: string
}

const EditEvent = (props: Props) => (
  <EditEventMutation onCompleted={() => {
    alert("Event edited successfully")
  }}>
    {
      (editEvent, { loading: editLoading }) => (
        <GetEventQuery skip={!props.eventId} variables={{id: props.eventId}}>
          {
            ({data, error, loading}) => {
              if (loading) {
                return <Spinner />
              }
              if (error) {
                return error.message
              }
              const event = removeTypename(data.event)

              return (
                <EventForm
                  loading={editLoading}
                  onSubmit={(values) => {
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
                    location: event.location,
                    infos: event.infos,
                    status: event.status,
                  }}/>
              )
            }
          }
        </GetEventQuery>
      )
    }
  </EditEventMutation>
)
export default EditEvent
