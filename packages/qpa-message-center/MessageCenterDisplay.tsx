import { History } from "history"
import * as React from "react"
import { MessageCenter } from "./index"
import Stage from "./MessageStage"

interface Props {
  history?: History
}

const MessageCenterDisplay = (props: Props) => (
  <MessageCenter>
    {({ messages, closeMessage, removeMessage }) => (
      <Stage
        history={props.history}
        messages={messages}
        closeMessage={closeMessage}
        removeMessage={removeMessage}
      />
    )}
  </MessageCenter>
)

export default MessageCenterDisplay
