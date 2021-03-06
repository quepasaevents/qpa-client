import MUIChip, { ChipProps } from "@material-ui/core/Chip"
import styled from "@emotion/styled"
import * as React from "react"

interface Props extends ChipProps {
}

const Chip = (props: Props) => {
  return <MUIChip {...props} />
}

export default styled(Chip)``
