import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {RevisionPendingEventData, RevisionPendingEventFragment} from "./useEventsPendingRevisionQuery"

const mutation = gql`
  ${RevisionPendingEventFragment}
  mutation StartRevisionMutation($eventId: ID!) {
    startEventRevision(input: { eventId: $eventId }){
      ...PendingEvent
    }
  }
`

interface Variables {
  eventId: string
}

const useStartRevisionMutation = (
  options?: MutationHookOptions<RevisionPendingEventData, Variables>
) => useMutation<RevisionPendingEventData, Variables>(mutation, options)

export default useStartRevisionMutation
