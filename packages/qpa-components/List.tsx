import * as React from "react"
import MUIList, { ListProps } from "@material-ui/core/List"
import MUIListItemSecondaryAction, {
  ListItemSecondaryActionProps,
} from "@material-ui/core/ListItemSecondaryAction"
import MUIListItem, { ListItemProps } from "@material-ui/core/ListItem"
import MUIListItemText, {
  ListItemTextProps,
} from "@material-ui/core/ListItemText"
import styled from "@emotion/styled"

const List = styled((props: ListProps) => <MUIList {...props} />)``
const ListItemSecondaryAction = styled(
  (props: ListItemSecondaryActionProps) => (
    <MUIListItemSecondaryAction {...props} />
  )
)``
const ListItem = styled((props: ListItemProps) => <MUIListItem {...props} />)``
const ListItemText = styled((props: ListItemTextProps) => (
  <MUIListItemText {...props} />
))``
export { List, ListItem, ListItemText, ListItemSecondaryAction }
