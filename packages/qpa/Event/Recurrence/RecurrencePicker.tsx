import * as React from 'react'
import rrule from 'rrule'

interface Props {
    firstOccurrence: {
        startDate: string
        endDate: string
    }
    rrule: string
    onChange: (rrule: string) => void
}

const RecurrencePicker = (props: Props) => {

}
