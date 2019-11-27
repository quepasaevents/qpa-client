import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import * as React from "react"

const mutation = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
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
      occurrences {
        id
        start
        end
      }
    }
  }
`

interface Variables {
  input: GQL.ICreateEventInput
}

interface InfoData {
  desciption: string
  language: string
  title: string
}

interface OccurrenceData {
  id: string
  start: string
  end: string
}
export interface Data {
  createEvent: {
    id: string
    infos: InfoData[]
    location: {
      address: string
      name: string
    }
    occurrences: OccurrenceData[]
  }
}

const useCreateEventMutation = (
  options: MutationHookOptions<Data, Variables>
) => useMutation<Data, Variables>(mutation, options)
export default useCreateEventMutation
