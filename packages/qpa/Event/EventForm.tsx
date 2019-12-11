import { format, isBefore, addHours } from "date-fns"
import { Field, Form, Formik } from "formik"
import {
  Button,
  DatePicker,
  TimePicker,
  PickersProvider,
  TextField,
  Checkbox,
} from "qpa-components"
import css from "@emotion/css"
import { useTheme } from "qpa-emotion"
import * as React from "react"
import styled from "@emotion/styled"
import { hot } from "react-hot-loader"
import { EventPublishedState, EventStatus } from "../../../@types"
import * as intl from "react-intl-universal"
import TagSelector from "../EventTags/TagsSelector"
import messages from "./EventForm.msg.json"
import NextOccurrencesPreview from "./NextOccurrencesPreview"
import RecurrencePicker from "./Recurrence/RecurrencePicker"

interface Props {
  values?: EventFormData
  onSubmit: (values: EventFormData) => void
  loading: boolean
  deleteEventLoading?: boolean
  locales: string[]
  onDeleteEvent?: () => void
}

export interface EventTimeFormData {
  timeZone: string
  start: string
  end: string
  recurrence?: string
  exceptions?: string
}
export interface EventFormData {
  time: EventTimeFormData
  infos: Array<{
    language: string
    title: string
    description: string
  }>
  location: {
    address: string
    name: string
  }
  status: EventStatus
  tagNames: string[]
  publishedState: EventPublishedState
}

const todayMidday = new Date()
todayMidday.setUTCHours(12, 0)

const todayOnePM = new Date()
todayOnePM.setUTCHours(13, 0)

const EventForm = (props: Props) => {
  intl.load({
    "es-ES": messages.es,
    "en-GB": messages.en,
  })
  const isEdit = !!props.values
  const theme = useTheme()
  const isEventOverMultipleDays =
    props.values &&
    props.values.time &&
    new Date(props.values.time.start).getDay() !==
      new Date(props.values.time.end).getDay()
  const [showEndDate, setShowEndDate] = React.useState<boolean>(
    !!isEventOverMultipleDays
  )

  const [isRecurrentEvent, setIsRecurrentEvent] = React.useState<boolean>(
    !!(
      props.values &&
      props.values &&
      props.values.time &&
      props.values.time.recurrence
    )
  )

  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={
        props.values
          ? props.values
          : ({
              time: {
                timeZone: "Europe/Madrid",
                start: format(todayMidday, "yyyy-MM-dd'T'HH:mm"),
                end: format(todayOnePM, "yyyy-MM-dd'T'HH:mm"),
              },
              infos: props.locales.map(locale => {
                const lang = locale.substring(0, 2)
                return {
                  language: lang,
                  title: "",
                  description: "",
                }
              }),
              location: {
                name: "",
                address: "",
              },
              tagNames: [],
              status: "confirmed",
              publishedState: "published",
            } as EventFormData)
      }
      validate={(values: EventFormData) => {
        const errors: any = {}
        if (!values.location.address) {
          errors.location = errors.location || {}
          errors.location.address = intl.get("must-provide-location-address")
        }
        if (!values.location.name) {
          errors.location = errors.location || {}
          errors.location.name = intl.get("must-provide-location-name")
        }
        if (isBefore(new Date(values.time.end), new Date(values.time.start))) {
          errors.time = errors.time || {}
          errors.time.start = intl.get("validate-end-after-start")
          errors.time.end = intl.get("validate-end-after-start")
        }
        return errors
      }}
    >
      {({ isValid, setFieldValue, values, errors }) => {
        return (
          <StyledForm>
            <TagSelector
              onChange={tagNames => setFieldValue("tagNames", tagNames)}
              value={values.tagNames}
            />
            <FormTitle>
              {props.locales.length > 1
                ? intl.get("EVENT_FORM_DETAILS_FOREWORD_MULTILINGUAL")
                : intl.get("EVENT_FORM_DETAILS_FOREWORD")}
            </FormTitle>
            {props.locales.map(locale => {
              const language = locale.split("-")[0]
              const msg = messages[language]
              const i = values.infos.findIndex(
                info => info.language === language
              )
              return (
                <Section key={locale}>
                  <SectionTitle>
                    {messages[language]["EVENT_FORM_INFO_IN_LANGUAGE"]}
                  </SectionTitle>
                  <p>{msg.EVENT_TITLE}</p>
                  <Field name={`infos[${i}].title`}>
                    {({ field }) => (
                      <TextField
                        {...field}
                        placeholder={msg.EVENT_TITLE_PLACEHOLDER}
                      />
                    )}
                  </Field>
                  <p>{msg.DESCRIPTION}</p>
                  <Field name={`infos[${i}].description`}>
                    {({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        multiline
                        rows={8}
                        placeholder={msg.DESCRIPTION_PLACEHOLDER}
                      />
                    )}
                  </Field>
                </Section>
              )
            })}
            <div id="timesection">
              <PickersProvider>
                <SectionTitle>{intl.get("TITLE_TIME")}</SectionTitle>
                <FormTitle>{intl.get("TIME_EXPLANATION")}</FormTitle>
                <EventTimeSection>
                  <TimeSegment>
                    <Field name="time.start">
                      {({ field }) => {
                        const timeStartOnChange = newStartDate => {
                          const oneHourLater = addHours(newStartDate, 1)
                          const newTime = {
                            ...values.time,
                            start: format(newStartDate, "yyyy-MM-dd'T'HH:mm"),
                            end: format(oneHourLater, "yyyy-MM-dd'T'HH:mm"),
                          }
                          setFieldValue("time", newTime)
                        }
                        return (
                          <>
                            <DatePicker
                              label="Start date"
                              {...field}
                              onChange={timeStartOnChange}
                            />
                            <TimePicker
                              label="Start time"
                              {...field}
                              onChange={timeStartOnChange}
                            />
                          </>
                        )
                      }}
                    </Field>
                  </TimeSegment>
                  <TimeSegment>
                    <Field name="time.end">
                      {({ field }) => {
                        const timeEndOnChange = newStartDate => {
                          setFieldValue(
                            "time.end" as any,
                            format(newStartDate, "yyyy-MM-dd'T'HH:mm")
                          )
                        }
                        return (
                          <>
                            {showEndDate ? (
                              <DatePicker
                                label="End date"
                                {...field}
                                onChange={timeEndOnChange}
                              />
                            ) : null}
                            <TimePicker
                              label="End time"
                              {...field}
                              onChange={timeEndOnChange}
                            />
                          </>
                        )
                      }}
                    </Field>
                  </TimeSegment>
                </EventTimeSection>
              </PickersProvider>
              <Checkbox
                label={intl.get("event-is-multidate")}
                checked={showEndDate}
                onChange={() => setShowEndDate(!showEndDate)}
                disabled={
                  new Date(values.time.start).getDay() !==
                  new Date(values.time.end).getDay()
                }
              />
              <Checkbox
                label={intl.get("event-is-recurrent")}
                checked={isRecurrentEvent}
                onChange={() => {
                  const newIsRecurrentEvent = !isRecurrentEvent
                  if (!newIsRecurrentEvent) {
                    setFieldValue("time.recurrence" as any, null)
                  }
                  setIsRecurrentEvent(newIsRecurrentEvent)
                }}
                disabled={
                  new Date(values.time.start).getDay() !==
                  new Date(values.time.end).getDay()
                }
              />

              <RecurrencePicker
                firstOccurrence={values.time}
                disabled={!isRecurrentEvent}
                onChange={rrule => {
                  setFieldValue("time.recurrence" as any, rrule)
                }}
              />
              {values.time.recurrence ? (
                <>
                  <SectionTitle>
                    {intl.get("occurrences-preview-title")}
                  </SectionTitle>
                  <StyledNextOccurrencesPreview eventTime={values.time} />
                </>
              ) : null}
            </div>

            <p>{intl.get("LOCATION")}</p>
            <Field name="location.name">
              {({ field }) => (
                <TextField
                  {...field}
                  placeholder={intl.get("LOCATION_PLACEHOLDER")}
                />
              )}
            </Field>
            <p>{intl.get("ADDRESS")}</p>
            <Field name="location.address">
              {({ field }) => (
                <TextField
                  {...field}
                  placeholder={intl.get("ADDRESS_PLACEHOLDER")}
                />
              )}
            </Field>
            <Footer>
              <Button
                type="submit"
                loading={props.loading}
                disabled={!isValid}
                color="primary"
              >
                {isEdit ? intl.get("save-changes") : intl.get("CREATE")}
              </Button>
              {props.onDeleteEvent ? (
                <DeleteButton
                  type="button"
                  color="inherit"
                  onClick={props.onDeleteEvent}
                  loading={props.deleteEventLoading}
                  css={css`
                    && {
                      background-color: ${theme.colors.red};
                    }
                  `}
                >
                  {intl.get("DELETE")}
                </DeleteButton>
              ) : null}
            </Footer>
          </StyledForm>
        )
      }}
    </Formik>
  )
}

const FormTitle = styled.div`
  font-size: 18px;
`
const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`
const Section = styled.section`
  padding-top: 18px;
  display: flex;
  flex-direction: column;
`

const DeleteButton = styled(Button)`
  background: red;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`

const TimeSegment = styled.div`
  display: flex;
  flex-direction: row;
  > *:not(:last-of-type),
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`
const EventTimeSection = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 14px;
  justify-content: center;
  > *:not(:last-of-type) {
    margin-right: 24px;
  }
`

const StyledNextOccurrencesPreview = styled(NextOccurrencesPreview)`
  height: 6em;
`

export default hot(module)(EventForm)
