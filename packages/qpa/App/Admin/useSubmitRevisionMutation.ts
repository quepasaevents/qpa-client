import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
  RevisionPendingEventData,
  RevisionPendingEventFragment,
} from "./useEventsPendingRevisionQuery"

const mutation = gql`
  ${RevisionPendingEventFragment}
  mutation SubmitRevision($input: ReviseEventInput!) {
    submitEventRevision(input: $input) {
      ...PendingEvent
    }
  }
`

interface Data extends RevisionPendingEventData {}
interface Variables {
  input: GQL.IReviseEventInput
}

const useSubmitRevisionMutation = (
  options?: MutationHookOptions<Data, Variables>
) => useMutation<Data, Variables>(mutation, options)
export default useSubmitRevisionMutation
