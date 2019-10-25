import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import * as React from "react"

const PickersProvider = ({ children }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    {children}
  </MuiPickersUtilsProvider>
)

export default PickersProvider
