import {Spinner} from "qpa-components"
import * as React from 'react'
import {RouteComponentProps, withRouter} from "react-router"
import EditEventTag from "./EditEventTag"
import {useGetAvailableTagsQuery} from "./useGetAvaiableTagsQuery"
import styled from "@emotion/styled"

interface Props extends RouteComponentProps {}
const EditEventTags = (props: Props) => {
    const {data, loading, error} = useGetAvailableTagsQuery()
    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <p>{error.message}</p>
    }
    return <Root>
        {
            data.tags.map(tag => (
                <EditEventTag eventTag={tag}/>
            ))
        }
    </Root>
}

const Root = styled.div``
export default withRouter(EditEventTags)
