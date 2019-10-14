import styled from "qpa-emotion"
import {Spinner} from "qpa-components"
import * as React from "react"
import {RouteComponentProps, withRouter} from "react-router"
import {Link} from "react-router-dom"
import {AppContext} from "../Context/AppContext"
import OccurrenceDetailsQuery from "./OccurrenceDetailsQuery"

interface RouteParams {
    occurrenceId: string
    sanitizedEventName: string
}

interface Props extends RouteComponentProps<RouteParams> {
}

const OccurrenceDetails = (props: Props) => {
    return (
        <AppContext>
            {
                ({me}) => {
                    return (
                        <OccurrenceDetailsQuery variables={{occurrenceId: props.match.params.occurrenceId}}>
                            {
                                ({data, loading, error}) => {
                                    if (loading) {
                                        return <Spinner/>
                                    }
                                    if (error) {
                                        return <p>{error.message}</p>
                                    }
                                    const event = data.occurrence.event
                                    const meIsOwner = me && me.id === event.owner.id

                                    const info = data.occurrence.event.infos[0]
                                    return (
                                        <Root>
                                            <Title>
                                                {info.title}
                                            </Title>
                                            <Info>
                                                {info.description}
                                            </Info>
                                            {
                                                meIsOwner ?
                                                    <EditButton to={`/event/${event.id}/edit`}>Edit</EditButton> : null
                                            }
                                        </Root>
                                    )

                                }}
                        </OccurrenceDetailsQuery>
                    )

                }}
        </AppContext>
    )
}

const Title = styled.div`
  grid-row: title;
`

const Info = styled.div`
  grid-row: info
`

const Root = styled.div`
  display: grid;
  grid-template-rows: 48px [title] 1fr [info];
`

const EditButton = styled(Link)``
export default withRouter(OccurrenceDetails)
