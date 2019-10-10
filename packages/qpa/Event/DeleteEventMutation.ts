import { Mutation } from 'react-apollo'
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

export default class DeleteEventMutation extends Mutation<Data, Variables> {
    static defaultProps = {
        mutation
    }
}
