import * as React from "react"
import styled from "@emotion/styled"

interface Props {
  label?: string
  children: React.ReactChild
  className?: string
}
const Icon = (props: Props) => (
  <IconRoot className={props.className}>
    <GraphicalIcon>{props.children}</GraphicalIcon>
    {props.label ? <Label>{props.label}</Label> : null}
  </IconRoot>
)
const Label = styled.div`
  font-size: 8px;
`

const GraphicalIcon = styled.div`
  border-radius: 100%;
  width: 20px;
  height: 20px;
`

const IconRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Icon
