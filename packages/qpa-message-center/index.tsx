import * as React from "react"
import MessageCenterDisplay from "./MessageCenterDisplay"

const idGenerator = (function*() {
  let counter = 1
  while (true) {
    yield counter
    counter++
  }
}())

interface Message extends MessageRequest {
  text: string
  id: number
  show: boolean
}

export interface MessageRequest {
  text: string
  type?: "info" | "debug" | "warning" | "error" | "success"
}

interface State {
  messages: Message[]
}

export interface IMessageCenterContext {
  messages: Message[]
  addMessage?: (m: MessageRequest) => void
  closeMessage?: (m: Message) => void
  removeMessage?: (m: Message) => void
}

interface Props {}

const MessageCenterContext = React.createContext<IMessageCenterContext>({ messages: [] })
const { Provider, Consumer } = MessageCenterContext
const MessageCenter = Consumer as React.Consumer<IMessageCenterContext>
const useMessageCenter = () => React.useContext<IMessageCenterContext>(MessageCenterContext)

class MessageCenterProvider extends React.Component<Props, State, IMessageCenterContext> {
  constructor(props: Props) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  addMessage = (m: MessageRequest) => {
    const message: Message = {
      id: idGenerator.next().value,
      ...m,
      show: true,
    }
    this.setState({
      messages: [...this.state.messages, message],
    })
  }

  closeMessage = (m: Message) => {
    const index = this.state.messages.findIndex((msg) => msg.id === m.id)
    if (index > -1) {
      this.setState({
        messages: this.state.messages.map(
          (msg, i) =>
            (i === index
              ? {
                ...msg,
                show: false,
              }
              : msg),
        ),
      })
    }
  }

  removeMessage = (m: Message) => {
    this.setState({
      messages: this.state.messages.filter((msg) => msg.id !== m.id),
    })
  }

  render() {
    return (
      <Provider
        value={{
          messages: this.state.messages,
          addMessage: this.addMessage,
          closeMessage: this.closeMessage,
          removeMessage: this.removeMessage,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { MessageCenter, MessageCenterContext, Message, MessageCenterProvider, MessageCenterDisplay, useMessageCenter }
