import * as React from "react"
import MUICheckbox, { CheckboxProps } from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"

interface Props extends CheckboxProps {
  label: string
}

const Checkbox = (props: Props) => {
  const { label, ...checkboxProps } = props
  const checkbox = <MUICheckbox {...checkboxProps} />

  if (label) {
    return <FormControlLabel control={checkbox} label={label} />
  } else {
    return checkbox
  }
}

export default Checkbox
