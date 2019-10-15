import gql from "graphql-tag"
import {MutationHookOptions, useMutation} from "@apollo/react-hooks"
import { EventData, EventFragment } from "./useGetEventQuery"

const mutation = gql`
  ${EventFragment}
  mutation EditEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
      ...EventData
    }
  }
`

interface Data {
  updateEvent: EventData
}

interface Variables {
  input: GQL.IUpdateEventInput
}

const useEditEventMutation = (options: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(mutation, options)

export default useEditEventMutation
