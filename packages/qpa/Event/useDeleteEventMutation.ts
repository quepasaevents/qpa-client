import {MutationHookOptions, useMutation} from '@apollo/react-hooks'
import gql from "graphql-tag"

const mutation = gql`
    mutation DeleteEvent($id: ID!) {
        deleteEvent(id: $id) {
            events {
                id
            }
        }   
    }
`

interface Variables {
    id: string
}

interface Data {
    deleteEvent: {
        id: string
        events: Array<{
            id: string
        }>
    }
}

const useDeleteEventMutation = (options?: MutationHookOptions<Data, Variables>) => useMutation<Data, Variables>(mutation, options)
export default useDeleteEventMutation
