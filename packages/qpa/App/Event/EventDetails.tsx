import { format } from "date-fns"
import { Button } from "qpa-components"
import styled, { css, useTheme } from "qpa-emotion"
import * as React from "react"
import { hot } from "react-hot-loader"
import intl from "react-intl-universal"
import { RouteComponentProps, withRouter } from "react-router"
import { OccurrenceData } from "../../Event/useOccurrencesQuery"
import EventTags from "../../EventTags/EventTags"
import { useAppContext } from "../Context/AppContext"
import messages from "./EventDetails.msg.json"
import EventImageUpload from "./EventImageUpload"
import { EventDetailsData, EventRevisionState } from "./useEventDetailsQuery"

interface Params {
  eventId: string
}

interface Props extends RouteComponentProps<Params> {
  event: EventDetailsData
  occurrence?: OccurrenceData
}

const EventDetails = (props: Props) => {
  intl.load(messages)

  const { me, language } = useAppContext()
  const event = props.event
  const theme = useTheme()

  const meIsOwner = me && me.id === event.owner.id
  const canEdit =
    meIsOwner ||
    !!me?.roles.find(role => ["admin", "embassador"].includes(role.type))

  const info =
    event.infos.find(info => info.language === language) || event.infos[0]
  return (
    <Root>
      {event.revisionState ===
        EventRevisionState.PENDING_MANDATORY_REVISION && (
        <CommentToPublishedState
          css={css`
            color: ${theme.colors.lead};
          `}
        >
          {intl.get("event-awaiting-mandatory-revision")}
        </CommentToPublishedState>
      )}
      {canEdit ? (
        <EditButton
          onClick={() => props.history.push(`/event/${event.id}/edit`)}
          css={{}}
        >
          Edit
        </EditButton>
      ) : null}

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
            css={css`
              opacity: ${event.images.poster?.url ? 0 : 1};
            `}
          />
        ) : null}
      </PosterImage>
      {props.occurrence ? (
        <OccurrenceTime>
          {format(new Date(props.occurrence.start), "yyyy-MM-dd HH:mm")}
        </OccurrenceTime>
      ) : null}
      <Info>
        {info.description.split("\n").map((descLine, i) => (
          <p key={i}>{descLine}</p>
        ))}
      </Info>
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
    [page-start left-margin-start] 24px
    [content-start left-margin-end] 841px
    [content-end right-margin-start] 24px
    [right-margin-end page-end];
  @media (max-width: 900px) {
    grid-template-columns:
      [content-start left-margin-end] auto
      [content-end page-end];
  }
  grid-gap: 4px;
  padding: 8px;
`

const PosterImage = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    ${EventImageUpload} {
      opacity: 1;
    }
  }
`
const StyledEventTags = styled(EventTags)`
  grid-column: content;
`

const OccurrenceTime = styled.div`
  grid-column: content;
`

const CommentToPublishedState = styled.div`
  grid-column: content;
  background: rgba(0, 0, 0, 0.2);
  border: dashed yellow 2px;
  border-radius: 3px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
`
export default hot(module)(withRouter(EventDetails))
