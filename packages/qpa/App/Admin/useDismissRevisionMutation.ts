import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
    RevisionPendingEventFragment,
    RevisionPendingEventData,
} from "./useEventsPendingRevisionQuery"

const mutation = gql`
    ${RevisionPendingEventFragment}
    mutation DismisRevision($revisionId: ID!) {
        dismissOpenEventRevision(input: { revisionId: $revisionId }) {
            ...PendingEvent
        }
    }
`

interface Data {
    dismissOpenEventRevision: RevisionPendingEventData
}

interface Variables {
    revisionId: string
}

const useDismissRevisionMutation = (
    options?: MutationHookOptions<Data, Variables>
) => useMutation<Data, Variables>(mutation, options)

export default useDismissRevisionMutation
