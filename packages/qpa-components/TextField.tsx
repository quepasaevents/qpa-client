import styled from "@emotion/styled"
import * as React from 'react'
import {ITextFieldProps, TextField as OUITextField} from 'office-ui-fabric-react'

export interface TextFieldProps extends ITextFieldProps {}

const TextField = (props: TextFieldProps) => {
    return <OUITextField {...props} />
}
export default styled(TextField)``
