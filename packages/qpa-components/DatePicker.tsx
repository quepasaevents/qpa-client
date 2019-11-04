import {
  TimePicker,
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers"
import * as React from "react"

export interface DatePickerProps extends KeyboardDatePickerProps {}

const DatePicker = (props: DatePickerProps) => {
  return (
    <KeyboardDatePicker
      onChange={newDate => {
        if (newDate) {
          props.onChange(newDate)
        }
      }}
      format="dd/MM/yyyy"
      {...props}
    />
  )
}

export default DatePicker
