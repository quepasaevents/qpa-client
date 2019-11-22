import { useMutation} from "@apollo/react-hooks"
import gql from 'graphql-tag'

const mutation = gql`
    mutation SetCoverImage($eventId: ID!, $file: Upload!) {
        setEventCoverImage(input: {
            id: $eventId,
            file: $file
        }) {
            id
            
        }
    }
`
