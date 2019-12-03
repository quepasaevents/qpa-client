import { QueryHookOptions, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

export const RevisionPendingEventFragment = gql`
  fragment PendingEvent on CalendarEvent {
    id
    infos {
      title
      language
    }
    revisionState
    revisions {
      id
      author {
        id
        name
      }
      createdAt
      submittedAt
      dismissedBy {
        id
        name
      }
    }
  }
`
const query = gql`
  ${RevisionPendingEventFragment}
  query EventsPendingRevision {
    events(filter: { pendingRevision: true }) {
      ...PendingEvent
    }
  }
`
interface RevisionData {
  id: string
  author: {
    id: string
    name: string
  }
  createdAt: Date
  submittedAt?: Date
  dismissedBy?: RevisionDismissingUserData
}
interface RevisionDismissingUserData {
  id: string
  name: string
}
interface PendingEventInfoData {
  id: string
  title: string
}
interface RevisionPendingEventInfo {
  title: string
  language: string
}
export interface RevisionPendingEventData {
  id: string
  revisions: RevisionData[]
  revisionState: string
  infos: RevisionPendingEventInfo[]
}

interface Data {
  events: RevisionPendingEventData[]
}

const useEventsPendingRevisionQuery = (options?: QueryHookOptions<Data>) =>
  useQuery<Data>(query, options)
export default useEventsPendingRevisionQuery
