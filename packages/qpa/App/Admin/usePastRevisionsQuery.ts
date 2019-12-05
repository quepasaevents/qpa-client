import {QueryHookOptions, useQuery} from "@apollo/react-hooks"
import gql from "graphql-tag"
import {EventRevisionState} from "../Event/useEventDetailsQuery"
import {RevisionData, RevisionFragment} from "./useEventsPendingRevisionQuery"

const query = gql`
    ${RevisionFragment}
    query PastRevisions($limit: Int) {
        revisions(filter: {limit: $limit}) {
            ...RevisionData
            dismissedBy {
                id
                name
            }
            event {
                id
                revisionState
                infos {
                    title
                    language
                }
            }
        }
    }
`
export interface PastRevisionData extends RevisionData{
    dismissedBy?: {
        id: string
        name: string
    }
    event: {
        revisionState: EventRevisionState
        id: string
        infos: Array<{
            language: string
            title: string
        }>
    }
}
interface Data {
    revisions: PastRevisionData[]
}
interface Variables {
    limit?: number
}
const usePastRevisionsQuery = (options?: QueryHookOptions<Data, Variables>) => useQuery<Data,Variables>(query, options)

export default usePastRevisionsQuery
