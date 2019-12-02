import {QueryHookOptions, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {EventData, EventFragment} from "../../Event/useGetEventQuery"

const query = gql`
    ${EventFragment}
    query EventsPendingRevision {
        events(filter: {
            pendingRevision: true
        }) {
            ...EventData
        }
    }
`

interface Data {
    events: EventData[]
}

const useEventsPendingRevisionQuery = (options?: QueryHookOptions<Data>) => useQuery<Data>(query, options)
export default useEventsPendingRevisionQuery
