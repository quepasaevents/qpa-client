import { addHours, format, isBefore } from "date-fns"
import { Field, Form, Formik } from "formik"
import {
  Button,
  DatePicker,
  TimePicker,
  PickersProvider,
  TextField,
} from "qpa-components"
import * as React from "react"
import styled from "@emotion/styled"
import { hot } from "react-hot-loader"
import { EventStatus } from "../../../@types"
import * as intl from "react-intl-universal"
import messages from "./EventForm.msg.json"

interface Props {
  values?: EventFormData
  onSubmit: (values: EventFormData) => void
  loading: boolean
  deleteEventLoading?: boolean
  locales: string[]
  onDeleteEvent?: () => void
}

export interface EventFormData {
  time: {
    timeZone: string
    start: string
    end: string
    recurrence?: string
    exceptions?: string
  }
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
  meta: {
    tags: string[]
  }
}

class EventFormik extends Formik<EventFormData> {}

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

  return (
    <EventFormik
      onSubmit={props.onSubmit}
      initialValues={
        props.values
          ? props.values
          : ({
              time: {
                timeZone: "Europe/Madrid",
                start: todayMidday.toISOString(),
                end: todayOnePM.toISOString(),
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
              meta: {
                tags: [],
              },
              status: "confirmed",
            } as EventFormData)
      }
      validate={values => {
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
      {({ isValid, setFieldValue, values }) => {
        return (
          <StyledForm>
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
            <Section>
              <PickersProvider>
                <SectionTitle>{intl.get("TITLE_TIME")}</SectionTitle>
                <FormTitle>{intl.get("TIME_EXPLANATION")}</FormTitle>
                <p>{intl.get("START_TIME")}</p>

                <TimeSection>
                  <DatePicker
                    value={values.time.start}
                    onChange={newStartDate => {
                      setFieldValue("time.start", format(newStartDate, "yyyy-MM-dd'T'HH:mm"))
                    }}
                  />
                  <TimePicker
                    value={values.time.start}
                    onChange={newStartDate => {
                        format(newStartDate, "yyyy-MM-dd'T'HH:mm")

                        setFieldValue("time.start", format(newStartDate, "yyyy-MM-dd'T'HH:mm"))
                    }}
                  />
                </TimeSection>
                <p>{intl.get("END_TIME")} </p>

                <TimeSection>
                  <DatePicker
                    value={values.time.end}
                    onChange={newEndDate => {
                      setFieldValue(
                        "time.end",
                        format(newEndDate, "yyyy-MM-dd'T'HH:mm")
                      )
                    }}
                  />
                  <TimePicker
                    value={values.time.end}
                    onChange={newEndDate => {
                      setFieldValue(
                        "time.end",
                        format(newEndDate, "yyyy-MM-dd'T'HH:mm")
                      )
                    }}
                  />
                </TimeSection>
              </PickersProvider>
            </Section>

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
              <Button type="submit" loading={props.loading} disabled={!isValid}>
                {isEdit ? intl.get("EDIT") : intl.get("CREATE")}
              </Button>
              {props.onDeleteEvent ? (
                <DeleteButton
                  type="button"
                  onClick={props.onDeleteEvent}
                  loading={props.deleteEventLoading}
                >
                  {intl.get("DELETE")}
                </DeleteButton>
              ) : null}
            </Footer>
          </StyledForm>
        )
      }}
    </EventFormik>
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

const TimeSection = styled.div`
  display: flex;
  flex-direction: row;
  > *:not(:last-of-type) {
    margin-right: 8px;
  }
`
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 14px;
  justify-content: center;
`
export default hot(module)(EventForm)
