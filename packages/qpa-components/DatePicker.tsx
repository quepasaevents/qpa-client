import {
  DatePicker as MUIDatePicker,
  DatePickerProps as MUIDatePickerProps,
  TimePicker,
  TimePickerProps,
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers"
import * as React from "react"

export interface DatePickerProps extends MUIDatePickerProps {}

const DatePicker = (props: DatePickerProps) => {
  return <KeyboardDatePicker format="dd/MM/yyyy" {...props} />
}

export default DatePicker
