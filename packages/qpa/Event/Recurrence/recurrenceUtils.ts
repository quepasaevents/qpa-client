import RRule, { rrulestr } from "rrule"
import { EventTimeFormData } from "../EventForm"
import { Interval } from "date-fns"

export const computeOccurrences = (time: EventTimeFormData, maxCount: number = 10): Interval[] => {
  const rrule = rrulestr(time.recurrence)
  const eventLengthMs = new Date(time.end).getTime() - new Date(time.start).getTime()
  if (eventLengthMs < 0) {
    throw new Error("End time must be after start time")
  }

  return rrule
    .all((date, i) => {
      return i < maxCount
    })
    .map(date => {
        return {
            start: date,
            end: new Date(new Date(date).getTime() + eventLengthMs),
        }
    })
}
