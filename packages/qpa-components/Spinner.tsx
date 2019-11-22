import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress"
import * as React from 'react'

interface Props extends CircularProgressProps {}

const Spinner = (props: Props) => <CircularProgress {...props} />

export default Spinner
