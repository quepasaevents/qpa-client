import * as React from "react"
import Spinner from "./Spinner"
import { useTheme } from "qpa-emotion"
import styled from "@emotion/styled"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

const Button = (props: ButtonProps) => {
  const theme = useTheme()
  const { loading, children, ...pbProps } = props
  return (
    <StyledButton
      {...pbProps}
      css={{
        backgroundColor: props.disabled ? 'grey' : theme.colors.lead,
        color: 'white'
      }}
    >
      {loading ? <Spinner /> : children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  max-width: 120px;
`
export default Button
