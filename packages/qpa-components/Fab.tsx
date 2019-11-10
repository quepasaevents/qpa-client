import MUIFab, { FabProps } from "@material-ui/core/Fab"
import * as React from 'react'

interface Props extends FabProps {}

const Fab = (props: Props) => <MUIFab {...props}/>

export default Fab
