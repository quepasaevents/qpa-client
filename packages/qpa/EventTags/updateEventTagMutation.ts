import { useMutation, MutationHookOptions } from "react-apollo"
import gql from "graphql-tag"
import {
  EventTagFullData,
  EventTagFullDataFragment,
} from "./useGetAllTagsWithTranslationsQuery"
import { EventTagTranslationData } from "./useGetAvaiableTagsQuery"

const mutation = gql`
  ${EventTagFullDataFragment}
  mutation UpdateEventTag($input: UpdateEventTagInput!) {
    updateEventTag(input: $input) {
      ...EventTagFullData
    }
  }
`

interface Data {
  updateEventTag: EventTagFullData
}
interface Variables {
  input: GQL.IUpdateEventTagInput
}

const updateEventTagMutation = (
  options: MutationHookOptions<Data, Variables>
) => useMutation<Data, Variables>(mutation, options)

export default updateEventTagMutation
