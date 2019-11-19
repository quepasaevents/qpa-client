import {
  KeyboardTimePicker,
  KeyboardTimePickerProps,
} from "@material-ui/pickers"
import * as React from "react"

export interface TimePickerProps extends KeyboardTimePickerProps {}

const TimePicker = (props: TimePickerProps) => {
  return (
    <KeyboardTimePicker
      onChange={newDate => {
        if (newDate) {
          props.onChange(newDate)
        }
      }}
      ampm={false}
      {...props}
    />
  )
}

export default TimePicker
