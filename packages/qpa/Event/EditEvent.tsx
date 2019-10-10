import { Spinner } from "qpa-components"
import * as React from "react"
import {useAppContext} from "../App/Context/AppContext"
import removeTypename from "../App/remove-typename"
import EditEventMutation from "./EditEventMutation"
import EventForm from "./EventForm"
import GetEventQuery from "./GetEventQuery"

interface Props {
  eventId: string
}

const EditEvent = (props: Props) => {
    const { supportedLocales } = useAppContext()

    return (
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
                                        locales={supportedLocales}
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
                                            location: {
                                                address: event.location.address || '',
                                                name: event.location.name || ''
                                            },
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

}

export default EditEvent
