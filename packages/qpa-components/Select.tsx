import { FormControl, InputLabel } from "@material-ui/core"
import * as React from "react"
import MUISelect, { SelectProps } from "@material-ui/core/Select"

interface Props extends SelectProps {
  label: string
}

const Select = (props: Props) => {
  const { id, label, ...selectProps } = props
  let idProp = id ? id : Math.random()
  const select = <MUISelect {...selectProps} id={`${idProp}`}/>
  if (label) {
    return (
      <FormControl>
        <InputLabel>{label}</InputLabel>
        {select}
      </FormControl>
    )
  } else return select
}

export default Select
