import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

const mutation = gql`
  mutation StartRevisionMutation($eventId: ID!) {
    startEventRevision(input: { eventId: $eventId }) {
      id
      revisions {
        id
        author {
          id
          name
        }
      }
    }
  }
`

interface RevisionData {
  id: string
  author: {
    id: string
    name: string
  }
}

interface Data {
  id: string
  revisions: RevisionData[]
}

interface Variables {
  eventId: string
}

const useStartRevisionMutation = (
  options?: MutationHookOptions<Data, Variables>
) => useMutation(mutation, options)

export default useStartRevisionMutation
