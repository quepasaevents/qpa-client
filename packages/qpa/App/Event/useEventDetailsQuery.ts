import { QueryHookOptions, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
  EventTagTranslatedData,
  TranslationDataFragment,
} from "../../EventTags/useGetAvaiableTagsQuery"

const EventDetailsDataFragment = gql`
  fragment EventDetailsData on CalendarEvent {
    id
    owner {
      id
      name
    }
    infos {
      description
      language
      title
    }
    tags {
      id
      name
    }
    occurrences {
      id
      start
      end
    }
  }
`
const query = gql`
  ${EventDetailsDataFragment}
  query GetOccurrenceDetails($eventId: ID!) {
    event(id: $eventId) {
      ...EventDetailsData
    }
  }
`
export interface EventImageData {
  url: string
}
export interface EventImagesData {
  cover?: EventImageData
}
export interface EventTagData {
  id: string
  name: string
}

export interface EventDetailsData {
  id: string
  owner: {
    id: string
    name: string
  }
  infos: Array<{
    description
    language
    title
  }>
  images: EventImagesData
  occurrences: {
    id: string
    start: string
    end: string
  }
  tags: EventTagData[]
}

interface Data {
  event: EventDetailsData
}
interface Variables {
  eventId: string
  language: string
}

const useEventDetailsQuery = (options: QueryHookOptions<Data, Variables>) =>
  useQuery<Data, Variables>(query, options)

export default useEventDetailsQuery
