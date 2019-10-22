import { addHours, format } from "date-fns"
import { Field, Form, Formik } from "formik"
import { Button, TextField } from "qpa-components"
import * as React from "react"
import styled from "@emotion/styled"
import { EventStatus } from "../../../@types"
import DateTime from "./DateTime"
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

const nextWeekTenAM = new Date()
nextWeekTenAM.setUTCDate(nextWeekTenAM.getDate() + 7)
nextWeekTenAM.setUTCHours(10, 0)

const nextWeekMidday = new Date(nextWeekTenAM)
nextWeekMidday.setUTCHours(12)

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
                start: nextWeekTenAM.toISOString().substring(0, 16),
                end: nextWeekMidday.toISOString().substring(0, 16),
              },
              infos: props.locales.map(lang => ({
                language: lang,
                title: "",
                description: "",
              })),
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
              const i = values.infos.findIndex(info => info.language === language)
              return (
                <Section key={locale}>
                  <SectionTitle>
                    {intl.get("EVENT_FORM_INFO")} {intl.get(locale)}
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
              <SectionTitle>{intl.get("TITLE_TIME")}</SectionTitle>
              <FormTitle>{intl.get("TIME_EXPLANATION")}</FormTitle>
              <p>{intl.get("START_TIME")}</p>
              <Field name="time.start">
                {({ field }) => (
                  <DateTime
                    {...field}
                    onChange={newStartValue => {
                      setFieldValue("time.start", newStartValue)
                      setFieldValue(
                        "time.end",
                        format(addHours(newStartValue, 2), "YYYY-MM-DDTHH:MM")
                      )
                    }}
                  />
                )}
              </Field>
              <p>{intl.get("END_TIME")} </p>
              <Field name="time.end">
                {({ field }) => (
                  <DateTime
                    {...field}
                    onChange={newEndValue =>
                      setFieldValue("time.end", newEndValue)
                    }
                  />
                )}
              </Field>
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
              <Button type="submit" loading={props.loading}>
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
`

const DeleteButton = styled(Button)`
  background: red;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 800px;
  @media (max-width: 800px) {
    width: 600px;
  }
  @media (max-width: 600px) {
    width: 450px;
  }
  ${Button}, ${DeleteButton} {
    width: 200px;
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
`
export default EventForm
