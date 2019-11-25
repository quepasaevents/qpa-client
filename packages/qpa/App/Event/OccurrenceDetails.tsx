import { Spinner } from "qpa-components"
import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router"
import EventDetails from "./EventDetails"
import useOccurrenceDetailsQuery from "./useOccurrenceDetailsQuery"
import messages from "./OccurrenceDetails.msg.json"
import intl from "react-intl-universal"

interface Params {
  occurrenceId: string
}
interface Props extends RouteComponentProps<Params> {}
const OccurrenceDetails = (props: Props) => {
  intl.load(messages)
  const { addMessage } = useMessageCenter()
  const { data, loading, error } = useOccurrenceDetailsQuery({
    variables: {
      id: props.match.params.occurrenceId,
    },
  })
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <p>{error.message}</p>
  }

  if (!data.occurrence) {
    addMessage({
      type: "warning",
      text: intl.get("event-not-found"),
    })
    props.history.push("/")
    return <br />
  }
  return <EventDetails event={data.occurrence.event} />
}

export default withRouter(OccurrenceDetails)
