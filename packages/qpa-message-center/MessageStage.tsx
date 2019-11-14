import { History } from "history"
import { MessageBar } from "qpa-components"
import * as React from "react"
import { IMessageCenterContext, useMessageCenter } from "./index"
import styled from "@emotion/styled"

interface Props extends IMessageCenterContext {
  history?: History
}

const MessageStage = () => {
  const { messages, closeMessage } = useMessageCenter()

  return (
    <Root>
      {messages.map(msg => (
        <MessageBar
          variant={msg.type}
          key={msg.id}
          open={msg.show}
          onClose={() => closeMessage(msg)}
          message={msg.text}
        />
      ))}
    </Root>
  )
}
const Root = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  left: -1px;
  top: -1px
`

export default MessageStage
