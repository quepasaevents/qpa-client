import * as React from "react"
import styled from "@emotion/styled"
import intl from "react-intl-universal"
import messages from "./introduction.msg.json"

interface Props {
    className?: string
}

const Introduction = (props: Props) => {
  intl.load(messages)
  return (
    <Root className={props.className}>
      <Title>{intl.get("title")}</Title>
      <SubTitle>{intl.get("subtitle")}</SubTitle>
    </Root>
  )
}
const Root = styled.div`
`
const Title = styled.div`
  font-size: 24px;
  color: rgba(0,0,0,.7);
  margin-bottom: 8px;
  font-weight: 800;
`
const SubTitle = styled.div`
  font-size: 18px;
  color: rgba(0,0,0,.6);
`

export default Introduction
