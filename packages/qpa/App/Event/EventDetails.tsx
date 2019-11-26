import { format } from "date-fns"
import styled, { css } from "qpa-emotion"
import { Button, Spinner } from "qpa-components"
import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import { hot } from "react-hot-loader"
import { RouteComponentProps, withRouter } from "react-router"
import { OccurrenceData } from "../../Event/useOccurrencesQuery"
import EventTags from "../../EventTags/EventTags"
import { useAppContext } from "../Context/AppContext"
import useEventDetailsQuery, { EventDetailsData } from "./useEventDetailsQuery"
import EventImageUpload from "./EventImageUpload"
import intl from "react-intl-universal"
import messages from "./EventDetails.msg.json"

interface Props extends RouteComponentProps {
  event: EventDetailsData
  occurrence?: OccurrenceData
}

const EventDetails = (props: Props) => {
  intl.load(messages)

  const { me, language } = useAppContext()
  const event = props.event

  const meIsOwner = me && me.id === event.owner.id
  const canEdit =
    meIsOwner ||
    !!me?.roles.find(role => ["admin", "embassador"].includes(role.type))

  const info =
    event.infos.find(info => info.language === language) || event.infos[0]
  return (
    <Root>
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
  grid-row: 1/1;
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
  position: relative;
  ${EventImageUpload} {
    position: absolute;
    right: 0;
    top: 0;
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

const OccurrenceTime = styled.div`
  grid-column: content;
`
export default hot(module)(withRouter(EventDetails))
