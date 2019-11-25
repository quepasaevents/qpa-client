import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {EventImageType} from "../../../../@types"
import {
  EventDetailsData,
  EventDetailsDataFragment,
} from "./useEventDetailsQuery"

const mutation = gql`
  ${EventDetailsDataFragment}
  mutation SetEventImage(
    $eventId: ID!
    $file: Upload!
    $imageType: EventImageType!
  ) {
    setEventImage(
      input: { eventId: $eventId, file: $file, imageType: $imageType }
    ) {
      id
      ...EventDetailsData
    }
  }
`
interface Variables {
  eventId: string
  file: any // todo what's the right type here?
  imageType: EventImageType
}

interface Data {
  setEventImage: EventDetailsData
}

export default (options?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(mutation, options)
