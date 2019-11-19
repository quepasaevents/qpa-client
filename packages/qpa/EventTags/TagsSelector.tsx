import { Spinner } from "qpa-components"
import Chip from "qpa-components/Chip"
import * as React from "react"
import {useAppContext} from "../App/Context/AppContext"
import { useGetAvailableTagsQuery } from "./useGetAvaiableTagsQuery"
import styled from "@emotion/styled"

interface Props {
  value: string[]
  onChange: (selectedNames: string[]) => void
  className?: string
}

const TagSelector = (props: Props) => {
  const { language } = useAppContext()
  const [selectedNames, setSelectedNames] = React.useState(props.value || [])
  const { loading, error, data } = useGetAvailableTagsQuery({
    variables: {
      language,
    },
  })

  return (
    <Root>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>Error: {error.message} </p>
      ) : (
        data.tags.map(tag => {
          const isSelected = props.value.includes(tag.name)
          const chipColor = isSelected ? "primary" : undefined

          return (
            <Chip
              color={chipColor}
              clickable={true}
              key={tag.id}
              label={tag.translation.text || tag.name || 'what'}
              onClick={() => {
                const newValue = [...props.value]
                if (isSelected) {
                  const index = props.value.indexOf(tag.name)
                  newValue.splice(index, 1)
                  props.onChange(newValue)
                } else {
                  props.onChange([...newValue, tag.name])
                }
              }}
            />
          )
        })
      )}
    </Root>
  )
}

const Root = styled.div``

export default TagSelector
