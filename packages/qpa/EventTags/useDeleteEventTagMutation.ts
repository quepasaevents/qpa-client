import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
  EventTagFullData,
  EventTagFullDataFragment,
} from "./useGetAllTagsWithTranslationsQuery"

const mutation = gql`
  ${EventTagFullDataFragment}
  mutation DeleteEventTag($id: ID!) {
    deleteEventTag(input: { id: $id }) {
      ...EventTagFullData
    }
  }
`
interface Data {
  deleteEventTag: EventTagFullData[]
}
interface Variables {
  id: string
}

const useDeleteEventTagMutation = (
  options: MutationHookOptions<Data, Variables>
) => useMutation<Data, Variables>(mutation, options)

export default useDeleteEventTagMutation
