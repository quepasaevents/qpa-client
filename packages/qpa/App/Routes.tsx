import * as React from "react"
import { RouteComponentProps } from "react-router"
import { Redirect, Route, Switch } from "react-router-dom"
import Calendar from "../Calendar/Calendar"
import CreateEvent from "../Event/CreateEvent"
import EditEvent from "../Event/EditEvent"
import Admin from "./Admin/Admin"
import InitializeSession from "./Auth/InitializeSession"

import Login from "./Auth/Login"
import Signout from "./Auth/Signout"
import Signup from "./Auth/Signup"
import { useAppContext } from "./Context/AppContext"
import EventDetails from "./Event/EventDetails"
import EventDetailsRoute from "./Event/EventDetailsRoute"
import OccurrenceDetails from "./Event/OccurrenceDetails"

const Routes = () => {
  const { me } = useAppContext()
  const roles = me?.roles?.map(role => role.type)
  return (
    <Switch>
      <Route path="/create" component={roles ? CreateEvent : Signup} />
      <Route
        path="/event/:eventId/edit"
        render={(routeProps: RouteComponentProps<{ eventId: string }>) => (
          <EditEvent eventId={routeProps.match.params.eventId} />
        )}
      />
      <Route
        path="/o/:sanitizedEventName/:occurrenceId"
        component={OccurrenceDetails}
      />
      <Route
        path="/e/:sanitizedEventName/:eventId"
        component={EventDetailsRoute}
      />
      <Route path="/init-session/:hash" component={InitializeSession} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/logout" component={Signout} />
      <Route path="/admin" component={Admin} />
      <Route path="/" component={Calendar} />
      <Redirect to="/" />
    </Switch>
  )
}
export default Routes
