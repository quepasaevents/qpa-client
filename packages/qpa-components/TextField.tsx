import styled from "@emotion/styled"
import * as React from "react"
import MUITextField, { TextFieldProps } from "@material-ui/core/TextField"

const TextField = (props: TextFieldProps) => {
  return <MUITextField {...props} />
}
export { TextFieldProps }

export default styled(TextField)`
  border-radius: 8px;
  border-color: #5E8036;
`
