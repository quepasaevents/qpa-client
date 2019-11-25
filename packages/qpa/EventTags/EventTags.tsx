import { Spinner } from "qpa-components"
import Chip from "qpa-components/Chip"
import styled from "qpa-emotion"
import * as React from "react"
import { EventTagData } from "../App/Event/useEventDetailsQuery"
import { useGetAvailableTagsQuery } from "./useGetAvaiableTagsQuery"

interface Props {
  tags?: EventTagData[]
  className?: string
  language: string
}
const EventTags = (props: Props) => {
  const { data, loading, error } = useGetAvailableTagsQuery({
    variables: {
      language: props.language,
    },
  })
  if (loading) {
    return <Spinner className={props.className} />
  }
  if (error) {
    return <p className={props.className}>{error.message}</p>
  }
  console.log('tags', props.tags)
  const tagNames = props.tags.map(tag => tag.name)
  const matchingTags = data.tags.filter(tag => tagNames.includes(tag.name))
    console.log('matchingTags', matchingTags)
  return (
    <Root className={props.className}>
      {matchingTags.map(tag => {
        return (
          <Chip
            key={tag.id}
            label={tag.translation.text}
            size="small"
          />
        )
      })}
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  > *:not(:last-of-type) {
    margin-right: 4px;
  }
`

export default styled(EventTags)``
