import {Checkbox, ListItem, ListItemSecondaryAction, ListItemText, Spinner} from "qpa-components"
import {List} from "qpa-components/List"
import * as React from 'react'
import {RouteComponentProps, withRouter} from "react-router"
import {useAppContext} from "../Context/AppContext"
import ReviseListItem from "./ReviseListItem"
import useEventsPendingRevisionQuery from "./useEventsPendingRevisionQuery"

interface Props extends RouteComponentProps {

}

const ReviseEvents = (props: Props) => {
    const {data,loading,error} = useEventsPendingRevisionQuery()
    const { language } = useAppContext()
    const [selectedIds, setSelectedIds] = React.useState(new Set<string>())
    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <p>{error.message}</p>
    }
    return <List>
        {
            data.events.map(event => {
                const isChecked = selectedIds.has(event.id)
                return (
                    <ReviseListItem key={event.id} isChecked={isChecked} event={event} language={language} onCheckedChange={() => {
                        const newSelectedIds = new Set(selectedIds)
                        if (isChecked) {
                            newSelectedIds.delete(event.id)
                        } else {
                            newSelectedIds.add(event.id)
                        }
                        setSelectedIds(newSelectedIds)
                    }}/>
                )
            })
        }
    </List>

}

export default withRouter(ReviseEvents)
