import { Fab, Spinner, TagIcon } from "qpa-components"
import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router"
import CreateEventTag from "./CreateEventTag"
import EditEventTag from "./EditEventTag"
import useGetAllTagsWithTranslationsQuery from "./useGetAllTagsWithTranslationsQuery"
import styled from "@emotion/styled"

interface Props extends RouteComponentProps {}
const EditEventTags = (props: Props) => {
  const {
    data: allTagsData,
    loading,
    error,
  } = useGetAllTagsWithTranslationsQuery()
  const [isAddMode, setAddMode] = React.useState(false)
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <Root>
      <h1>Management of Tags</h1>
      {allTagsData.tags.map(tag => (
        <EditEventTag
          key={tag.id}
          eventTag={tag}
          existingTags={allTagsData.tags}
        />
      ))}
      {isAddMode ? (
        <CreateEventTag
          existingTags={allTagsData.tags}
          onDone={() => setAddMode(false)}
        />
      ) : null}
      {!isAddMode ? (
        <Fab onClick={() => setAddMode(true)}>
          <TagIcon />
        </Fab>
      ) : null}
    </Root>
  )
}

const Root = styled.div``
export default withRouter(EditEventTags)
