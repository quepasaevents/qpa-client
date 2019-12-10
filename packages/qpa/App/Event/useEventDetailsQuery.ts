import { QueryHookOptions, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {EventPublishedState} from "../../../../@types"
import {
  EventTagTranslatedData,
  TranslationDataFragment,
} from "../../EventTags/useGetAvaiableTagsQuery"

export const EventImageDataFragment = gql`
  fragment EventImageData on EventImage {
    url,
  }
`
export enum EventRevisionState {
  PENDING_SUGGESTED_REVISION = "pending_suggested_revision",
  PENDING_MANDATORY_REVISION = "pending_mandatory_revision",
  CHANGES_REQUIRED = "changes_required",
  ACCEPTED = "accepted",
  DENIED = "denied",
  SPAM = "spam",
}

export interface EventImageData {
  url: string
}
export const EventDetailsDataFragment = gql`
  ${EventImageDataFragment}
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
    location {
      address
      name
    }
    publishedState
    revisionState
    images {
      cover {
        ...EventImageData
      }
      thumb {
        ...EventImageData
      }
      poster {
        ...EventImageData
      }
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
export interface EventImagesData {
  cover?: EventImageData
  thumb?: EventImageData
  poster?: EventImageData
  gallery?: EventImageData[]
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
  revisionState: EventRevisionState
  publishedState: EventPublishedState
  images: EventImagesData
  location: {
    name: string
    address: string
  }
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
