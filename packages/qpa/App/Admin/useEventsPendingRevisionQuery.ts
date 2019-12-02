import {QueryHookOptions, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

const query = gql`
    query EventsPendingRevision {
        events(filter: {
            pendingRevision: true
        }) {
            id
            infos {
                title
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
            }
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
}
interface PendingEventInfoData {
    id: string
    title: string
}
interface RevisionPendingEventData {
    id: string
    revisions: RevisionData[]
    revisionState: string
}

interface Data {
    events: RevisionPendingEventData[]
}

const useEventsPendingRevisionQuery = (options?: QueryHookOptions<Data>) => useQuery<Data>(query, options)
export default useEventsPendingRevisionQuery
