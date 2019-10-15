import styled from "qpa-emotion"
import * as React from "react"
import {
  useAppContext} from "../../App/Context/AppContext"
import {OccurrenceData} from "../../Event/OccurrencesQuery"
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
  sorted.forEach((occ) => {
    const day = occ.start.substring(0, 10)
    if (!days[day]) {
      days[day] = []
    }
    days[day].push(occ)
  })
  const dayNames = Object.keys(days)
  const {me} = useAppContext()

  return (
    <Root className={props.className}>
      {
        dayNames.map((dayName) => {
          const [year, month, day] = dayName.split("-")
          const dayDate = new Date(dayName)
          const dayNumber = dayDate.getDay()
          return (
            <UL key={dayName}>
              <DayName>
                <div css={{gridArea: "1/1/3/2", fontSize: 32}}>{DAY_NAMES[dayNumber]}</div>
                <div css={{gridArea: "1/2/2/3"}}>{day}-{month}</div>
                <div css={{gridArea: "2/2/3/3", letterSpacing: 2}}>{year}</div>
              </DayName>
              <Items>
                {days[dayName].map((occ) => (
                  <ListItem canEdit={me && !!me.events.find((myEvent) => myEvent.id === occ.event.id)} key={occ.id}
                            occurrence={occ}/>
                ))}
              </Items>
            </UL>
          )
        })
      }
    </Root>
  )
}

const Root = styled.div`
`

const Items = styled.div`
`

const DayName = styled.div`
  font-weight: 600;
  color: rgba(0,0,0,.6);
  font-size: 14px;
  width: auto;

  display: grid;
  grid-template: 18px / 55px 42px;
  margin-right: 18px;
`

const UL = styled.div`
  display: grid;
  grid-template: 48px auto / 120px auto;
  ${DayName} {
    grid-area: 1/1/2/2;
  }
  ${Items} {
    grid-area: 1/2/2/2;
  }
`

export default List
