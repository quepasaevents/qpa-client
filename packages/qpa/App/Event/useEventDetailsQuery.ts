import { QueryHookOptions, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {EventTagData, TranslationDataFragment} from "../../EventTags/useGetAvaiableTagsQuery"

const query = gql`
  ${TranslationDataFragment}
  query GetOccurrenceDetails($eventId: ID!, $language: String!) {
    event(id: $eventId) {
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
        translation(language: $language) {
          ...TranslationData
        }
      }
      occurrences {
        id
        start
        end
      }
    }
  }
`

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

const useEventDetailsQuery = (
  options: QueryHookOptions<Data, Variables>
) => useQuery<Data, Variables>(query, options)

export default useEventDetailsQuery
