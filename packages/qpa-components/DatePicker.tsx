import {
  TimePicker,
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers"
import * as React from "react"

export interface DatePickerProps extends KeyboardDatePickerProps {}

const DatePicker = (props: DatePickerProps) => {
  return <KeyboardDatePicker format="dd/MM/yyyy" {...props} />
}

export default DatePicker
