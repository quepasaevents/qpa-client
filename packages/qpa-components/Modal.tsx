import * as React from "react"
import MUIModal, { ModalProps } from "@material-ui/core/Modal"

interface Props extends ModalProps {
    title?: string
}

const Modal = (props: Props) => {
    const { title, ...modalProps } = props
    return (
        <MUIModal {...modalProps} />
    )

}
export default Modal
