import { IconButton } from "@material-ui/core"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import Snackbar from "@material-ui/core/Snackbar"
import * as React from "react"
import WarningIcon from "@material-ui/icons/Warning"
import ErrorIcon from "@material-ui/icons/Error"
import InfoIcon from "@material-ui/icons/Info"
import CloseIcon from "@material-ui/icons/Close"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import styled from "@emotion/styled"
import css from "@emotion/css"
import { makeStyles } from "@material-ui/core/styles"
import { amber, green } from '@material-ui/core/colors';

interface MessageBarProps {
  message: React.ReactNode
  open: boolean
  onClose?: () => void
  variant?: "error" | "warning" | "info" | "success"
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const backgroundColor = {
  success: green[600],
  warning: 'black',
  error: 'grey',
  info: 'blue',
}

const MessageBar = (props: MessageBarProps) => {
  const variant = props.variant || "info"
  const Icon = variantIcon[variant]

  return (
    <Snackbar open={props.open} onClose={props.onClose}>
      <SnackbarContent
        message={
          <MessageRoot>
            <Icon
              css={css`
                margin-right: 4px;
              `}
            />
            <MessageText>{props.message}</MessageText>
          </MessageRoot>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
        style={{
          backgroundColor: backgroundColor[variant]
        }}
      />
    </Snackbar>
  )
}

const MessageRoot = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
`

const MessageText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: normal;
  font-size: 14px;
`

export default MessageBar
