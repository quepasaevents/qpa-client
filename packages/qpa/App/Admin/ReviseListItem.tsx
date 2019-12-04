import {
  Checkbox,
  Icon,
  IconButton,
  CheckIcon,
  CrossNoIcon,
  PlayIcon,
  StopIcon,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Spinner,
} from "qpa-components"
import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import {Link} from "react-router-dom"
import { useAppContext } from "../Context/AppContext"
import useDismissRevisionMutation from "./useDismissRevisionMutation"
import useStartRevisionMutation from "./useStartRevisionMutation"
import { RevisionPendingEventData } from "./useEventsPendingRevisionQuery"

interface Props {
  isChecked: boolean
  onCheckedChange: () => void
  event: RevisionPendingEventData
  language: string
}

const ReviseListItem = (props: Props) => {
  const { notifyError } = useMessageCenter()
  const { me } = useAppContext()
  const [
    startRevision,
    { data: startData, loading: startLoading, error: startError },
  ] = useStartRevisionMutation({
    variables: {
      eventId: props.event.id,
    },
    onError: notifyError,
  })

  const latestRevision = props.event.revisions.sort((r1, r2) =>
      new Date(r1.createdAt).getTime() < new Date(r2.createdAt).getTime() ? 1 : 0
  )[0]

  const isLatestRevisionOpen =
      latestRevision &&
      !(latestRevision.submittedAt || latestRevision.dismissedBy)
  const isMeAuthorOfLatestRevision = me?.id === latestRevision?.author.id
  const isMeCanSubmitRevision =
      isLatestRevisionOpen && isMeAuthorOfLatestRevision


  const [dismissRevision, { data: dismissData, loading: dismissLoading, error: dismissError }] = useDismissRevisionMutation({
    variables: {
      revisionId: latestRevision?.id
    },
    onError: notifyError
  })
  const loading = startLoading || dismissLoading
  const languageInfo =
    props.event.infos.find(info => info.language === props.language) ||
    props.event.infos[0]

  return (
    <ListItem key={props.event.id}>
      {loading ? (
        <Spinner size={16} />
      ) : (
        <Checkbox
          checked={props.isChecked}
          onChange={() => props.onCheckedChange()}
        />
      )}
      <Link to={`/e/aaa/${props.event.id}`}>
        <ListItemText primary={languageInfo.title} />
      </Link>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="accept"
          disabled={!isMeCanSubmitRevision}
        >
          <CheckIcon color="primary" />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="decline"
          disabled={!isMeCanSubmitRevision}
        >
          <CrossNoIcon color="error" />
        </IconButton>
        {isLatestRevisionOpen ? (
          <IconButton
            edge="end"
            aria-label="dismiss"
            onClick={() => dismissRevision()}
          >
            <StopIcon color="action" style={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton
            edge="end"
            aria-label="start"
            onClick={() => startRevision()}
          >
            <PlayIcon color="action" style={{ color: "green" }} />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  )
}
export default ReviseListItem
