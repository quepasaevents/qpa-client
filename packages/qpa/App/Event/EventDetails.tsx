import Chip from "qpa-components/Chip"
import styled from "qpa-emotion"
import { Button, Spinner } from "qpa-components"
import * as React from "react"
import { hot } from "react-hot-loader"
import { RouteComponentProps, withRouter } from "react-router"
import { useGetAvailableTagsQuery } from "../../EventTags/useGetAvaiableTagsQuery"
import { useAppContext } from "../Context/AppContext"
import useEventDetailsQuery from "./useEventDetailsQuery"
import EventCoverImage from "./EventCoverImage"

interface RouteParams {
  eventId: string
  sanitizedEventName: string
}

interface Props extends RouteComponentProps<RouteParams> {}

const EventDetails = (props: Props) => {
  const { me, language } = useAppContext()
  const {
    data: availableTagsData,
    loading: availableTagsLoading,
  } = useGetAvailableTagsQuery({
    variables: {
      language,
    },
  })
  const { data, loading, error } = useEventDetailsQuery({
    variables: { eventId: props.match.params.eventId, language },
  })
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  const event = data.event
  const meIsOwner = me && me.id === event.owner.id
  const canEdit =
    meIsOwner ||
    !!me?.roles.find(role => ["admin", "embassador"].includes(role.type))

  const info = event.infos[0]
  return (
    <Root>
      <EventCoverImage event={event} canEdit={canEdit} />
      <Title>{info.title}</Title>
      {availableTagsLoading ? (
        <Spinner />
      ) : (
        <Tags>
          {event.tags.map(tag => {
            const matchingAvailableTag = availableTagsData.tags.find(
              availableTag => availableTag.name === tag.name
            )
            const tagLabel = matchingAvailableTag ? matchingAvailableTag.translation.text : tag.name
            return <Chip color="primary" label={tagLabel} key={tag.id} />
          })}
        </Tags>
      )}

      <Info>
        {info.description.split("\n").map((descLine, i) => (
          <p key={i}>{descLine}</p>
        ))}
      </Info>
      {canEdit ? (
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
    [title-end tags-start] 48px
    [tags-end info-start] 1fr
    [info-end];
  grid-gap: 12px;
  padding: 8px;
`

const Tags = styled.div`
  grid-row: tags;
`
export default hot(module)(withRouter(EventDetails))
