import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
  EventDetailsData,
  EventDetailsDataFragment,
} from "./useEventDetailsQuery"

const mutation = gql`
  ${EventDetailsDataFragment}
  mutation SetCoverImage($eventId: ID!, $file: Upload!) {
    setEventCoverImage(input: { id: $eventId, file: $file }) {
      id
      ...EventDetailsData
    }
  }
`
interface Variables {
  eventId: string
  file: any // todo what's the right type here?
}

interface Data {
  setEventCoverImage: EventDetailsData
}

export default (options?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(mutation, options)
