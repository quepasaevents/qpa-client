import styled from "@emotion/styled"
import { ReplayIcon, IconButton, ListItem, ListItemText } from "qpa-components"
import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import { Link } from "react-router-dom"
import { EventRevisionState } from "../Event/useEventDetailsQuery"
import { PastRevisionData } from "./usePastRevisionsQuery"
import intl from "react-intl-universal"
import useRequestNewRevisionMutation from "./useRequestNewRevisionMutation"
import css from "@emotion/css"
interface Props {
  revision: PastRevisionData
  language: string
  onRefetchPendingEvents: () => void
}

const PastRevisionListItem = (props: Props) => {
  const event = props.revision.event
  const { notifyError } = useMessageCenter()
  const languageIndex = event.infos.findIndex(
    info => info.language === props.language
  )
  const [
    requestNewRevision,
    {
      data: requestNewRevisionData,
      loading: requestNewRevisionLoading,
      error: requestNewRevisionError,
    },
  ] = useRequestNewRevisionMutation({
    variables: {
      input: { eventId: event.id },
    },
    onError: notifyError,
  })
  const eventInfo = props.revision.event.infos[languageIndex || 0]
  const eventIsPendingRevision = [
    EventRevisionState.PENDING_SUGGESTED_REVISION,
    EventRevisionState.PENDING_MANDATORY_REVISION,
  ].includes(event.revisionState)

  return (
    <ListItem>
      <ListItemText>
        <Link to={`/e/aaa/${event.id}`}>{eventInfo.title}</Link>
        <div>
          {props.revision.dismissedBy
            ? intl.get("dismissed-by", {
                name: props.revision.dismissedBy.name,
              })
            : props.revision.conclusion}
        </div>
        <div
          css={css`
            font-size: 12px;
          `}
        >
          {intl.get("last-change")}: {props.revision.lastChangedAt}
        </div>
      </ListItemText>
      <ActionItems>
        <IconButton
          edge="end"
          aria-label="request new revision"
          label={intl.get("request-new-revision")}
          onClick={() => requestNewRevision()}
          disabled={eventIsPendingRevision}
        >
          <ReplayIcon />
        </IconButton>
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

export default PastRevisionListItem
