import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
  EventTagFullDataFragment,
  EventTagFullData,
} from "./useGetAllTagsWithTranslationsQuery"

const mutation = gql`
  ${EventTagFullDataFragment}
  mutation CreateEventTag($input: CreateEventTagInput!) {
    createEventTag(input: $input) {
      ...EventTagFullData
    }
  }
`

interface Data {
  createEventTag: EventTagFullData
}

interface Variables {
  input: GQL.ICreateEventTagInput
}

const useCreateEventTagMutation = (
  options?: MutationHookOptions<Data, Variables>
) => useMutation<Data, Variables>(mutation, options)

export default useCreateEventTagMutation
