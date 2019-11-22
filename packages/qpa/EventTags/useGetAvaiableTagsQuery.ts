import {QueryHookOptions, useQuery} from "@apollo/react-hooks"
import gql from "graphql-tag"

export const TranslationDataFragment = gql`
    fragment TranslationData on EventTagTranslation {
      id
      language
      text
    }
`

const query = gql`
  ${TranslationDataFragment}
  query GetTagsForLanguage($language: String!) {
    tags {
      id
      name
      translation(language: $language) {
        ...TranslationData
      }
    }
  }
`
export interface EventTagTranslationData {
  id: string
  language: string
  text: string
}
export interface EventTagTranslatedData {
  id: string
  name: string
  translation: EventTagTranslationData
}

export interface Data {
  tags: EventTagTranslatedData[]
}

interface Variables {
    language: string
}

export const useGetAvailableTagsQuery = (options?: QueryHookOptions<Data, Variables>) => useQuery<Data, Variables>(query, options)
