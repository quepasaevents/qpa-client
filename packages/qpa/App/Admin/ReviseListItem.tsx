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
  DeleteForeverIcon,
} from "qpa-components"
import styled from "@emotion/styled"
import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import { Link } from "react-router-dom"
import { useAppContext } from "../Context/AppContext"
import useDismissRevisionMutation from "./useDismissRevisionMutation"
import useStartRevisionMutation from "./useStartRevisionMutation"
import { RevisionPendingEventData } from "./useEventsPendingRevisionQuery"
import useSubmitRevisionMutation from "./useSubmitRevisionMutation"
import intl from "react-intl-universal"

interface Props {
  isChecked: boolean
  onCheckedChange: () => void
  event: RevisionPendingEventData
  language: string
}

const ReviseListItem = (props: Props) => {
  const { notifyError, notifySuccess } = useMessageCenter()
  const { me } = useAppContext()
  const [comment, setComment] = React.useState<string>(null)
  const [isCommentOpen, setCommentOpen] = React.useState<boolean>(false)
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

  const [
    dismissRevision,
    { data: dismissData, loading: dismissLoading, error: dismissError },
  ] = useDismissRevisionMutation({
    variables: {
      revisionId: latestRevision?.id,
    },
    onError: notifyError,
  })

  const [
    submitRevision,
    { data: submitData, loading: submitLoading, error: submitError },
  ] = useSubmitRevisionMutation({
    onError: notifyError,
    onCompleted: () => notifySuccess(intl.get("revision-successful")),
  })
  const loading = startLoading || dismissLoading || submitLoading
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
        <StyledListItemText primary={languageInfo.title} />
      </Link>
      <ActionItems>
        <IconButton
          edge="end"
          aria-label="accept"
          label="accept"
          disabled={!isMeCanSubmitRevision}
          onClick={() =>
            submitRevision({
              variables: {
                input: {
                  revisionId: latestRevision.id,
                  conclusion: "accept",
                  comment,
                },
              },
            })
          }
        >
          <CheckIcon
            color="primary"
            style={{ color: !isMeCanSubmitRevision ? "grey" : "green" }}
          />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="decline"
          label="decline"
          disabled={!isMeCanSubmitRevision}
          onClick={() =>
            submitRevision({
              variables: {
                input: {
                  revisionId: latestRevision.id,
                  conclusion: "decline",
                  comment,
                },
              },
            })
          }
        >
          <DeleteForeverIcon
            color="error"
            style={{ color: !isMeCanSubmitRevision ? "grey" : null }}
          />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="request changes"
          label="request changes"
          disabled={!isMeCanSubmitRevision}
          onClick={() =>
            submitRevision({
              variables: {
                input: {
                  revisionId: latestRevision.id,
                  conclusion: "request_changes",
                  comment,
                },
              },
            })
          }
        >
          <CrossNoIcon
            color="error"
            style={{ color: !isMeCanSubmitRevision ? "grey" : null }}
          />
        </IconButton>
        {isLatestRevisionOpen ? (
          <IconButton
            edge="end"
            aria-label="dismiss"
            label="dismiss"
            onClick={() => dismissRevision()}
          >
            <StopIcon color="action" style={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton
            edge="end"
            aria-label="start"
            label="start"
            onClick={() => startRevision()}
          >
            <PlayIcon color="action" style={{ color: "green" }} />
          </IconButton>
        )}
      </ActionItems>
    </ListItem>
  )
}

const ActionItems = styled.div`
  display: flex;
  flex-direction: row;
  > *:not(:first-of-type) {
    margin-left: 8px;
  }
`

const StyledListItemText = styled(ListItemText)`
  width: 300px;
  font-size: 0.8em;
  @media(max-width: 630px) {
    width: 240px;
  }
`
export default ReviseListItem
