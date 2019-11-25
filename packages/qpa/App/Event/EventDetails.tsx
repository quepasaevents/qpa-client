import styled, { css } from "qpa-emotion"
import { Button, Spinner } from "qpa-components"
import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import { hot } from "react-hot-loader"
import { RouteComponentProps, withRouter } from "react-router"
import EventTags from "../../EventTags/EventTags"
import { useGetAvailableTagsQuery } from "../../EventTags/useGetAvaiableTagsQuery"
import { useAppContext } from "../Context/AppContext"
import useEventDetailsQuery from "./useEventDetailsQuery"
import EventImageUpload from "./EventImageUpload"
import intl from "react-intl-universal"
import messages from "./EventDetails.msg.json"

interface RouteParams {
  eventId: string
  sanitizedEventName: string
}

interface Props extends RouteComponentProps<RouteParams> {}

const EventDetails = (props: Props) => {
  intl.load(messages)

  const { me, language } = useAppContext()
  const { addMessage } = useMessageCenter()

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

  if (!event) {
    addMessage({
      type: "warning",
      text: intl.get("event-not-found"),
    })
    props.history.push("/")
    return <br />
  }
  const meIsOwner = me && me.id === event.owner.id
  const canEdit =
    meIsOwner ||
    !!me?.roles.find(role => ["admin", "embassador"].includes(role.type))

  const info =
    event.infos.find(info => info.language === language) || event.infos[0]
  return (
    <Root>
      <Title>{info.title}</Title>
      <StyledEventTags tags={event.tags} language={language} />
      <PosterImage
        css={css`
          background-image: url(${event.images.poster?.url});
          grid-column: content;
          height: 400px;
        `}
      >
        {canEdit ? (
          <EventImageUpload
            event={event}
            canEdit={canEdit}
            imageType="poster"
            title={intl.get("upload-poster-image")}
          />
        ) : null}
      </PosterImage>
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
  grid-column: right-margin;
  width: 80px;
`
const Title = styled.div`
  grid-column: content;
  font-size: 32px;
`

const Info = styled.div`
  grid-column: content;
`

const Root = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns:
    [page-start back-button-start left-margin-start] 24px
    [content-start back-button-end left-margin-end] 841px
    [content-end right-margin-start] 24px
    [right-margin-end];
  grid-gap: 4px;
  padding: 8px;
`

const PosterImage = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  max-width: 100%;
  ${EventImageUpload} {
    opacity: 0;
    transition: opacity ease-out 0.1s;
  }
  &:hover {
    ${EventImageUpload} {
      opacity: 1;
    }
  }
`
const StyledEventTags = styled(EventTags)`
  grid-column: content;
`
export default hot(module)(withRouter(EventDetails))
