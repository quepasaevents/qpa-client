import { IconButton } from "@material-ui/core"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import Snackbar from "@material-ui/core/Snackbar"
import * as React from "react"
import WarningIcon from "@material-ui/icons/Warning"
import ErrorIcon from "@material-ui/icons/Error"
import InfoIcon from "@material-ui/icons/Info"
import CloseIcon from "@material-ui/icons/Close"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

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

const MessageBar = (props: MessageBarProps) => {
  const Icon = variantIcon[props.variant || "info"]

  return (
    <Snackbar open={props.open}>
      <SnackbarContent
        message={
          <span>
            <Icon />
            {props.message}
          </span>
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
      />
    </Snackbar>
  )
}

export default MessageBar
