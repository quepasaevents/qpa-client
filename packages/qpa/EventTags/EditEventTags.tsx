import { Fab, Spinner} from "qpa-components"
import * as React from 'react'
import {RouteComponentProps, withRouter} from "react-router"
import EditEventTag from "./EditEventTag"
import useGetAllTagsWithTranslationsQuery from "./useGetAllTagsWithTranslationsQuery"
import styled from "@emotion/styled"

interface Props extends RouteComponentProps {}
const EditEventTags = (props: Props) => {
    const {data, loading, error} = useGetAllTagsWithTranslationsQuery()
    const [isAddMode, setAddMode] = React.useState(false)
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
        <Fab onClick={() => setAddMode(true)}/>
    </Root>
}

const Root = styled.div``
export default withRouter(EditEventTags)
