import {
  Checkbox,
  Icon,
  IconButton,
  CheckIcon,
  CrossNoIcon,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "qpa-components"
import { css } from "qpa-emotion"
import * as React from "react"
import { EventData } from "../Event/useGetEventQuery"

interface Props {
  isChecked: boolean
  onCheckedChange: () => void
  event: EventData
  language: string
}

const ReviseListItem = (props: Props) => {
  const languageInfo =
    props.event.infos.find(info => info.language === props.language) ||
    props.event.infos[0]

  return (
    <ListItem key={props.event.id}>
      <Checkbox
        checked={props.isChecked}
        onChange={() => props.onCheckedChange()}
      />
      <ListItemText primary={languageInfo.title} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="accept">
          <CheckIcon color="primary"/>
        </IconButton>
        <IconButton edge="end" aria-label="accept">
          <CrossNoIcon color="error"/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
export default ReviseListItem
