import * as React from "react"
import MUISelect, { SelectProps } from "@material-ui/core/Select"

interface Props extends SelectProps {}

const Select = (props: Props) => <MUISelect {...props} />

export default Select
