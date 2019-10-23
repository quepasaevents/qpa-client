import styled from "qpa-emotion"
import { Button, Spinner } from "qpa-components"
import * as React from "react"
import { hot } from "react-hot-loader"
import { RouteComponentProps, withRouter } from "react-router"
import { Link } from "react-router-dom"
import { useAppContext } from "../Context/AppContext"
import useEventDetailsQuery from "./useEventDetailsQuery"

interface RouteParams {
  eventId: string
  sanitizedEventName: string
}

interface Props extends RouteComponentProps<RouteParams> {}

const EventDetails = (props: Props) => {
  const { me } = useAppContext()
  const { data, loading, error } = useEventDetailsQuery({
    variables: { eventId: props.match.params.eventId },
  })
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  const event = data.event
  const meIsOwner = me && me.id === event.owner.id

  const info = event.infos[0]
  return (
    <Root>
      <Title>{info.title}</Title>
      <Info>{info.description}</Info>
      {meIsOwner ? (
        <EditButton
          onClick={() => props.history.push(`/event/${event.id}/edit`)}
          css={{}}
        >
          Edit
        </EditButton>
      ) : null}
    </Root>
  )
}

const EditButton = styled(Button)`
  grid-row: small-button;
  width: 80px;
`
const Title = styled.div`
  grid-row: title;
  font-size: 32px;
`

const Info = styled.div`
  grid-row: info;
`

const Root = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-rows:
    [title-start small-button-start] 24px
    [small-button-end] 24px
    [title-end info-start] 1fr
    [info-end];
  grid-gap: 12px;
`

export default hot(module)(withRouter(EventDetails))