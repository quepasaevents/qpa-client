import {
  Checkbox,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Spinner,
} from "qpa-components"
import { List } from "qpa-components/List"
import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router"
import { useAppContext } from "../Context/AppContext"
import PastRevisionListItem from "./PastRevisionListItem"
import ReviseListItem from "./ReviseListItem"
import useEventsPendingRevisionQuery from "./useEventsPendingRevisionQuery"
import messages from "./ReviseEvents.msg.json"
import intl from "react-intl-universal"
import styled from "@emotion/styled"
import usePastRevisionsQuery from "./usePastRevisionsQuery"

interface Props extends RouteComponentProps {}

const ReviseEvents = (props: Props) => {
  intl.load(messages)
  const {
    data: pendingEventsData,
    loading: pendingEventsLoading,
    error: pendingEventsError,
    refetch: pendingEventsRefetch,
  } = useEventsPendingRevisionQuery()
  const {
    data: pastRevisionsData,
    loading: pastRevisionsLoading,
    error: pastRevisionsError,
  } = usePastRevisionsQuery()

  const { language } = useAppContext()
  const [selectedIds, setSelectedIds] = React.useState(new Set<string>())
  if (pendingEventsLoading) {
    return <Spinner />
  }
  if (pendingEventsError) {
    return <p>{pendingEventsError.message}</p>
  }
  return (
    <Root>
      <Section>
        <Title>{intl.get("events-pending-revision")}</Title>
        {pendingEventsLoading ? (
          <Spinner />
        ) : (
          <List>
            {pendingEventsData.events.map(event => {
              const isChecked = selectedIds.has(event.id)
              return (
                <ReviseListItem
                  key={event.id}
                  isChecked={isChecked}
                  event={event}
                  language={language}
                  onCheckedChange={() => {
                    const newSelectedIds = new Set(selectedIds)
                    if (isChecked) {
                      newSelectedIds.delete(event.id)
                    } else {
                      newSelectedIds.add(event.id)
                    }
                    setSelectedIds(newSelectedIds)
                  }}
                />
              )
            })}
          </List>
        )}
      </Section>
      <Section>
        <Title>Past revisions</Title>
        {pastRevisionsLoading ? (
          <Spinner />
        ) : (
          <List>
            {pastRevisionsData.revisions?.map(revision => {
              return (
                <PastRevisionListItem
                  revision={revision}
                  language={language}
                  key={revision.id}
                  onRefetchPendingEvents={() => pendingEventsRefetch()}
                />
              )
            })}
          </List>
        )}
      </Section>
    </Root>
  )
}

const Root = styled.div`
  padding: 24px;
`
const Section = styled.section``
const Title = styled.div`
  color: rgba(0, 0, 0, 0.8);
  font-size: 1.5em;
`
export default withRouter(ReviseEvents)
