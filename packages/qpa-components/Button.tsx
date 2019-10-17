import { IButtonProps, PrimaryButton } from "office-ui-fabric-react"
import * as React from "react"
import Spinner from "./Spinner"
import styled, { useTheme } from "qpa-emotion"

export interface ButtonProps extends IButtonProps {
  loading?: boolean
}

const Button = (props: ButtonProps) => {
  const theme = useTheme()
  const { loading, children, ...pbProps } = props
  return (
    <PrimaryButton
      {...pbProps}
      css={{
        backgroundColor: theme.colors.lead,
      }}
    >
      {loading ? <Spinner /> : children}
    </PrimaryButton>
  )
}

export default styled(Button)``
