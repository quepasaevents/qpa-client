import {
    TimePicker as MUITimePicker,
    TimePickerProps as MUITimePickerProps,
    TimePickerProps,
    KeyboardTimePicker,
    KeyboardTimePickerProps,
} from "@material-ui/pickers"
import * as React from "react"

export interface TimePickerProps extends MUITimePickerProps {}

const TimePicker = (props: TimePickerProps) => {
    return <KeyboardTimePicker {...props} />
}

export default TimePicker
