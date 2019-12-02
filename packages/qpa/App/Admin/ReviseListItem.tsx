import {
  Checkbox,
  Icon,
  IconButton,
  CheckIcon,
  CrossNoIcon,
  PlayIcon,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Spinner,
} from "qpa-components"
import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import { EventData } from "../Event/useGetEventQuery"
import useStartRevisionMutation from "./useStartRevisionMutation"

interface Props {
  isChecked: boolean
  onCheckedChange: () => void
  event: EventData
  language: string
}

const ReviseListItem = (props: Props) => {
  const { notifyError } = useMessageCenter()
  const [
    startRevision,
    { data: startData, loading: startLoading, error: startError },
  ] = useStartRevisionMutation({
    variables: {
      eventId: props.event.id,
    },
    onError: notifyError,
  })
  const languageInfo =
    props.event.infos.find(info => info.language === props.language) ||
    props.event.infos[0]

  return (
    <ListItem key={props.event.id}>
      <Spinner size={16} />
      <Checkbox
        checked={props.isChecked}
        onChange={() => props.onCheckedChange()}
      />
      <ListItemText primary={languageInfo.title} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="accept">
          <CheckIcon color="primary" />
        </IconButton>
        <IconButton edge="end" aria-label="accept">
          <CrossNoIcon color="error" />
        </IconButton>
        <IconButton edge="end" aria-label="start" onClick={startRevision}>
          <PlayIcon color="action" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
export default ReviseListItem
