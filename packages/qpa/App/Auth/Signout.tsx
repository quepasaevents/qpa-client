import {useContext} from "react"
import * as React from "react"
import {RouteComponentProps, withRouter} from "react-router"
import {useAppContext} from "../Context/AppContext"

interface Props extends RouteComponentProps {

}

const Signout = (props: Props) => {
  const { refetch } = useAppContext()
  React.useEffect(() => {
    fetch("/api/signout")
      .then(() => {
        props.history.push("/")
      }).finally(() => {
      props.history.push("/")
      refetch()
    })
  })
  return <p>You will be logged out now</p>
}

export default withRouter(Signout)
