import {IButtonProps, PrimaryButton} from "office-ui-fabric-react"
import * as React from "react"
import Spinner from "./Spinner"

export interface ButtonProps extends IButtonProps {
    loading?: boolean
}

const Button = (props: ButtonProps) => {
    const {loading, children, ...pbProps} = props
    return <PrimaryButton {...pbProps}>
        {
            loading ? <Spinner /> : children
        }
    </PrimaryButton>
}

export default Button
