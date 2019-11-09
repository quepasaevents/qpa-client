import gql from "graphql-tag"
import { QueryHookOptions, useQuery } from "react-apollo"
import {
  EventTagTranslationData,
  TranslationDataFragment,
} from "./useGetAvaiableTagsQuery"

export const EventTagFullDataFragment = gql`
  ${TranslationDataFragment}
  fragment EventTagFullData on EventTag {
    id
    name
    translations {
      ...TranslationData
    }
  }
`
const query = gql`
  ${EventTagFullDataFragment}
  query GetAllTagsWithTranslations {
    tags {
      ...EventTagFullData
    }
  }
`
export interface EventTagFullData {
  id: string
  name: string
  translations: EventTagTranslationData[]
}
interface Data {
  tags: EventTagFullData[]
}

const useGetAllTagsWithTranslationsQuery = (options?: QueryHookOptions<Data>) =>
  useQuery<Data>(query, options)
export default useGetAllTagsWithTranslationsQuery
