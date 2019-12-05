import { QueryHookOptions, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
  RevisionPendingEventFragment,
  RevisionPendingEventData,
} from "./useEventsPendingRevisionQuery"

const mutation = gql`
  ${RevisionPendingEventFragment}
  mutation RequestNewRevision($input: RequestRevisionInput!) {
    requestEventRevision(input: $input) {
      ...PendingEvent
    }
  }
`

interface Data extends RevisionPendingEventData {}
interface Variables {
  input: GQL.IRequestRevisionInput
}
const useRequestNewRevisionMutation = (
  options?: QueryHookOptions<Data, Variables>
) => useMutation<Data, Variables>(mutation, options)

export default useRequestNewRevisionMutation
