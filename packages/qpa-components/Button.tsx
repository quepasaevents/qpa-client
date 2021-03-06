import * as React from "react"
import Spinner from "./Spinner"
import { useTheme } from "qpa-emotion"
import styled from "@emotion/styled"
import MUIButton, {
  ButtonProps as MUIButtonProps,
} from "@material-ui/core/Button"
export interface ButtonProps extends MUIButtonProps {
  loading?: boolean
  label?: string
}

const Button = (props: ButtonProps) => {
  const theme = useTheme()
  const { loading, children, label, ...muiButtonProps } = props
  return (
    <MUIButton variant="contained" {...muiButtonProps}>
      {loading ? <Spinner /> : (children || label)}
    </MUIButton>
  )
}

export default styled(Button)``
