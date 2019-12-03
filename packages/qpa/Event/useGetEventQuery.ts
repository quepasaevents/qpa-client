import gql from "graphql-tag"
import {QueryHookOptions, useQuery} from "@apollo/react-hooks"
import {EventPublishedState, EventStatus} from "../../../@types"

export const EventFragment = gql`
  fragment EventData on CalendarEvent {
    id
    infos {
      description
      language
      title
    }
    location {
      address
      name
    }
    time {
      start
      end
      timeZone
      recurrence
      exceptions
    }
    status
    tags {
      id
      name
    }
    publishedState
  }
`

export interface EventTimeData {
  start: string
  end: string
  timeZone: string
  recurrence: string
  exceptions: string
}

export interface EventInfoData {
  description: string
  language: string
  title: string
}

export interface ContactData {
  contact: {
    email: string
    phone: string,
  }
  languages: string[]
  name: string
}

export interface EventTag {
  id: string
  name: string
}
export interface EventData {
  id: string
  infos: EventInfoData[]
  contact: ContactData[]
  location: {
    address: string
    name: string,
  }
  time: EventTimeData
  status: EventStatus
  tags: EventTag[]
  publishedState: EventPublishedState
}

interface Data {
  event: EventData
}

const query = gql`
  ${EventFragment}
  query GetEvent($id: ID!) {
    event(id: $id) {
      ...EventData
    }
  }
`

interface Variables {
  id: string
}

const useGetEventsQuery = (options: QueryHookOptions<Data, Variables>) => useQuery<Data, Variables>(query, options)
export default useGetEventsQuery
