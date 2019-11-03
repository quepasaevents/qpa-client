import * as React from "react"
import Spinner from "./Spinner"
import { useTheme } from "qpa-emotion"
import styled from "@emotion/styled"
import MUIButton, {
  ButtonProps as MUIButtonProps,
} from "@material-ui/core/Button"
export interface ButtonProps extends MUIButtonProps {
  loading?: boolean
}

const Button = (props: ButtonProps) => {
  const theme = useTheme()
  const { loading, children, ...muiButtonProps } = props
  return (
    <MUIButton variant="contained" {...muiButtonProps}>
      {loading ? <Spinner /> : children}
    </MUIButton>
  )
}

export default styled(Button)``
