import {Spinner} from "qpa-components"
import Chip from "qpa-components/Chip"
import * as React from "react"
import { useGetAvailableTagsQuery } from "./useGetAvaiableTagsQuery"
import styled from "@emotion/styled"

interface Props {
  language: string
  selectedNames?: string[]
  onChange: (selectedNames: string[]) => void
  className?: string
}

const TagSelector = (props: Props) => {
  const [selectedNames, setSelectedNames] = React.useState(
    props.selectedNames || []
  )
  const { loading, error, data } = useGetAvailableTagsQuery({
    variables: {
      language: props.language,
    },
  })

  return <Root>
      {
          loading ? <Spinner /> : error ? <p>Error: {error.message} </p> : data.tags.map(
              tag => <Chip key={tag.id} label={tag.translation.text || tag.name} />
          )
      }
  </Root>
}

const Root = styled.div``

export default TagSelector
