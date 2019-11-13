import styled from "qpa-emotion"
import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router"
import {useAppContext} from "../Context/AppContext"

interface RouteParams {
  hash: string
}
interface Props extends RouteComponentProps<{ hash: string }> {}

const InitializeSession = (props: Props) => {
  const [responseCode, setResponseCode] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const { isSSR, refetch } = useAppContext()

  if (!isSSR) {
    React.useEffect(() => {
      fetch(`/api/init-session`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ hash: props.match.params.hash }),
      }).then(async (res) => {
        setResponseCode(res.status)
        setLoading(false)
        if (res.status === 200) {
          refetch()
          props.history.push("/")
        }
      })
    }, [1])
  }

  return (
    <Root>
      <p>Welcome back. Validating you link should take just a moment</p>
      {loading
        ? "Loading..."
        : responseCode === 200
        ? "You will be redirected now"
        : "Validation failed. Please try to log in again."}
    </Root>
  )
}

const Root = styled.div``

export default withRouter<Props>(InitializeSession)
