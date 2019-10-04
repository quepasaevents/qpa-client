import * as React from "react"
import {RouteComponentProps} from "react-router"
import {Redirect, Route, Switch} from "react-router-dom"
import Calendar from "../Calendar/Calendar"
import CreateEvent from "../Event/CreateEvent"
import EditEvent from "../Event/EditEvent"
import InitializeSession from "./Auth/InitializeSession"

import Login from "./Auth/Login"
import Signout from "./Auth/Signout"
import Signup from "./Auth/Signup"
import OccurrenceDetails from "./Occurrence/OccurrenceDetails"

const Routes = () => (
    <Switch>
        <Route path="/create" component={CreateEvent}/>
        <Route
            path="/event/:eventId/edit"
            render={(routeProps: RouteComponentProps<{ eventId: string }>) => (
                <EditEvent eventId={routeProps.match.params.eventId}/>
            )}
        />
        <Route
            path="/o/:sanitizedEventName/:occurrenceId"
            component={OccurrenceDetails}
        />
        <Route path="/init-session/:hash" component={InitializeSession}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/logout" component={Signout}/>
        <Route path="/:month" component={Calendar}/>
        <Route path="/" component={Calendar}/>
        <Redirect to="/"/>
    </Switch>
)

export default Routes
