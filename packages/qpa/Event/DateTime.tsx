import styled from "qpa-emotion"
import * as React from "react"

interface Props {
  value: string
  onChange: (value: string) => void
  className?: string
}

const DateTime = ({ value, onChange, className }: Props) => {
  const dateTimeSplit = value.split("T")
  return (
    <Root className={className}>
      <input type="date" value={dateTimeSplit[0]} onChange={(e) => {
        const newDateValue = e.target.value
        onChange([newDateValue, dateTimeSplit[1]].join("T"))
      }}/>
      <input type="time" value={dateTimeSplit[1]} onChange={(e) => {
        const newTimeValue = e.target.value
        onChange([dateTimeSplit[0], newTimeValue].join("T"))
      }}/>
    </Root>
  )
}

const Root = styled.div`

`
export default DateTime
