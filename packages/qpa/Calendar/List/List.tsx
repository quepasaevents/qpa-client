import styled from "@emotion/styled"
import * as React from "react"
import { hot } from "react-hot-loader"
import { useAppContext } from "../../App/Context/AppContext"
import { OccurrenceData } from "../../Event/useOccurrencesQuery"
import ListItem from "./ListItem"

interface Props {
  occurrences: OccurrenceData[]
  className?: string
}

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const List = (props: Props) => {
  const sorted = [...props.occurrences]
  sorted.sort((occA, occB) => {
    if (occA.start > occB.start) {
      return 1
    }
    if (occA.start < occB.start) {
      return -1
    }
    return 0
  })
  const days: { [day: string]: OccurrenceData[] } = {}
  sorted.forEach(occ => {
    const day = occ.start.substring(0, 10)
    if (!days[day]) {
      days[day] = []
    }
    days[day].push(occ)
  })
  const dayNames = Object.keys(days)
  const { me } = useAppContext()
  const isSuperUser = me && !!me.roles.find(role =>
    ["admin", "embassador"].includes(role.type)
  )
  return (
    <ListRoot className={props.className}>
      {dayNames.map(dayName => {
        const [year, month, day] = dayName.split("-")
        const dayDate = new Date(dayName)
        const dayNumber = dayDate.getDay()
        return (
          <DayItems key={dayName}>
            <DayName>
              <div css={{ gridArea: "1/1/3/2", fontSize: 32 }}>
                {DAY_NAMES[dayNumber]}
              </div>
              <div css={{ gridArea: "1/2/2/3" }}>
                {day}-{month}
              </div>
              <div css={{ gridArea: "2/2/3/3", letterSpacing: 2 }}>{year}</div>
            </DayName>
            <Items>
              {days[dayName].map(occ => {
                const isOwner =
                  me && !!me.events.find(myEvent => myEvent.id === occ.event.id)
                return (
                  <ListItem canEdit={isOwner || isSuperUser} key={occ.id} occurrence={occ} />
                )
              })}
            </Items>
          </DayItems>
        )
      })}
    </ListRoot>
  )
}

const ListRoot = styled.div``

const Items = styled.div``

const DayName = styled.div`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  width: auto;

  display: grid;
  grid-template: 18px / 55px 42px;
  margin-right: 18px;
`

const DayItems = styled.div`
  display: grid;
  grid-template: auto auto / 120px auto;
  ${DayName} {
    grid-area: 1/1/2/2;
  }
  ${Items} {
    grid-area: 1/2/2/2;
  }
`

export default hot(module)(List)
