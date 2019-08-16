import { History } from "history"
import { MessageBar } from "qpa-components"
import * as React from "react"
import { IMessageCenterContext } from "./index"

interface State {
  preventAutoClose: boolean
}

interface Props extends IMessageCenterContext {
  history?: History
}

export default class MessagesStage extends React.Component<Props, State> {
  componentDidUpdate() {
    const { messages } = this.props
    if (messages.length > 1 && messages[0].show) {
      this.props.closeMessage(messages[0])
    }
  }

  render() {
    const { removeMessage, closeMessage, messages } = this.props

    const msg = messages[0]

    return (
      <div>
        {msg && msg.show && (
          <MessageBar
            key={msg.id}
          ><span>{msg.text}</span></MessageBar>
        )}
      </div>
    )
  }
}
