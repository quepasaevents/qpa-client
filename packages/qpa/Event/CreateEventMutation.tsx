import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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
interface Data {
    id: string
    infos: InfoData[]
    location: {
        address: string
        name: string

    }
    occurrences: OccurrenceData[]
}

export default class CreateEventMutation extends Mutation<Data, Variables> {
    static defaultProps = {
        mutation
    }
}
