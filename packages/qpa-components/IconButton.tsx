import * as React from 'react'
import MUIIconButton, {IconButtonProps} from '@material-ui/core/IconButton'
import styled from '@emotion/styled'

interface Props extends IconButtonProps {
    label?: string
}

const IconButton = (props: Props) => {
    const {label, ...muiIconButtonProps} = props
    const button = <StyledMUIIconButton {...muiIconButtonProps} />
    if (label) {
        return <LabelRoot className={props.className}>
            { button }
            <Label>{ label }</Label>
        </LabelRoot>
    } else {
        return button
    }
}

const LabelRoot = styled.div`
  width: 48px;
`
const Label = styled.div`
  font-size: 10px;
  text-align: center;
  position: relative;
  top: -8px;
`
const StyledMUIIconButton = styled(MUIIconButton)`

`
export default IconButton
