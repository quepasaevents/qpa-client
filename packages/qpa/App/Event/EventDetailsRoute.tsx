import { Spinner } from "qpa-components"
import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router"
import { useAppContext } from "../Context/AppContext"
import EventDetails from "./EventDetails"
import useEventDetailsQuery from "./useEventDetailsQuery"

interface Params {
  eventId: string
}

interface Props extends RouteComponentProps<Params> {}

const EventDetailsRoute = (props: Props) => {
  const { language } = useAppContext()
  const { data, loading, error } = useEventDetailsQuery({
    variables: {
      eventId: props.match.params.eventId,
      language,
    },
  })

  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return <EventDetails event={data.event} />
}

export default withRouter(EventDetailsRoute)
