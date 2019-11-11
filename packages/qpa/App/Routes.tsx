import * as React from "react"
import {RouteComponentProps} from "react-router"
import {Redirect, Route, Switch} from "react-router-dom"
import Calendar from "../Calendar/Calendar"
import CreateEvent from "../Event/CreateEvent"
import EditEvent from "../Event/EditEvent"
import Admin from "./Admin/Admin"
import InitializeSession from "./Auth/InitializeSession"

import Login from "./Auth/Login"
import Signout from "./Auth/Signout"
import Signup from "./Auth/Signup"
import EventDetails from "./Event/EventDetails"

const Routes = () => {
        return (
            <Switch>
                    <Route path="/create" component={CreateEvent}/>
                    <Route
                        path="/event/:eventId/edit"
                        render={(routeProps: RouteComponentProps<{ eventId: string }>) => (
                            <EditEvent eventId={routeProps.match.params.eventId} />
                        )}
                    />
                    <Route
                        path="/o/:sanitizedEventName/:eventId"
                        component={EventDetails}
                    />
                    <Route path="/init-session/:hash" component={InitializeSession}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/logout" component={Signout}/>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/:dateFrom/:dateTo" component={Calendar}/>
                    <Route path="/:dateFrom" component={Calendar}/>
                    <Route path="/" component={Calendar}/>
                    <Redirect to="/"/>
            </Switch>
        )

}
export default Routes
