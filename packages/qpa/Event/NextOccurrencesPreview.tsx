import * as React from "react"
import styled from "@emotion/styled"
import { EventTimeFormData } from "./EventForm"
import { computeOccurrences } from "./Recurrence/recurrenceUtils"
import { format } from "date-fns"
import intl from "react-intl-universal"
import messages from "./NextOccurrencesPreview.msg.json"

interface Props {
    eventTime: EventTimeFormData
    className?: string
}
const NextOccurrencesPreview = (props: Props) => {
    if (!props.eventTime) {
        return <p>No time</p>
    }
    if (!props.eventTime.recurrence) {
        return <p>No recurrence</p>
    }
    intl.load({
        "en-GB": messages.en,
        "es-ES": messages.es,
    })

    return (
        <Root className={props.className}>
            {computeOccurrences(props.eventTime).map(occ => (
                <Occurrence key={new Date(occ.start).getTime()}>
                    {intl.get(format(occ.start, "eeee").toLowerCase())}
                    &nbsp;
                    {format(occ.start, "yyyy-dd-MM")}
                </Occurrence>
            ))}
        </Root>
    )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const Occurrence = styled.div``

export default NextOccurrencesPreview
