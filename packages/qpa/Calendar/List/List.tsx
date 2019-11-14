import styled from "@emotion/styled"
import { css, Theme } from "qpa-emotion"
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
  const isSuperUser =
    me && !!me.roles.find(role => ["admin", "embassador"].includes(role.type))
  return (
    <ListRoot className={props.className}>
      {dayNames.map(dayName => {
        const [year, month, day] = dayName.split("-")
        const dayDate = new Date(dayName)
        const dayNumber = dayDate.getDay()
        return (
          <DayItems key={dayName}>
            <DayPresentationContainer>
              <DayPresentation>
                {DAY_NAMES[dayNumber]} {day}.{month}.
              </DayPresentation>
            </DayPresentationContainer>
            <Items>
              {days[dayName].map(occ => {
                const isOwner =
                  me && !!me.events.find(myEvent => myEvent.id === occ.event.id)
                return (
                  <StyledListItem
                    canEdit={isOwner || isSuperUser}
                    key={occ.id}
                    occurrence={occ}
                  />
                )
              })}
            </Items>
          </DayItems>
        )
      })}
    </ListRoot>
  )
}

const BreakPoint = "640px"

const ListRoot = styled.div``

const Items = styled.div``

const StyledListItem = styled(ListItem)`
  width: 100%;
  &:hover {
    background-color: rgba(4,59,20,.05);
    transition: background-color 0.5s ease-out;
  }
`
const DayPresentation = styled.div`
  text-align: center;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.colors.secondary};
  padding: 2px 8px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 18px;
  width: 74px;

  @media (max-width: ${BreakPoint}) {
    margin-right: 0;
    max-width: initial;
    width: initial;
    text-align: initial;
  }
`

const DayName = styled.div`
  grid-area: dayname;
`
const DayDate = styled.div`
  grid-area: daydate;
`

const DayPresentationContainer = styled.div`
  @media (max-width: ${BreakPoint}) {
    margin-bottom: 4px;
  }
`
const DayItems = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  grid-gap: 8px;
  grid-template-rows: auto auto;
  grid-template-areas:
    "dayname items"
    ".   items";

  @media (max-width: ${BreakPoint}) {
    grid-template-areas:
      "dayname dayname"
      "items items";
  }
  ${DayPresentationContainer} {
    grid-area: dayname;
  }
  ${Items} {
    grid-area: items;
  }
`

export default hot(module)(List)
