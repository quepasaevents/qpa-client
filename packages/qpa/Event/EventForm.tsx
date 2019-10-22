import { addHours, format } from "date-fns"
import { Field, Form, Formik } from "formik"
import { Button, TextField } from "qpa-components"
import * as React from "react"
import styled from "qpa-emotion"
import { EventStatus } from "../../../@types"
import DateTime from "./DateTime"
import {get as intlGet, load as intlLoad} from "react-intl-universal"
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
  intlLoad({
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
                ? intlGet("EVENT_FORM_DETAILS_FOREWORD_MULTILINGUAL")
                : intlGet("EVENT_FORM_DETAILS_FOREWORD")}
            </FormTitle>
            {props.locales.map(lang => {
              const msg = messages[lang.split("-")[0]]
              const i = values.infos.findIndex(info => info.language === lang)
              return (
                <Section key={lang}>
                  <SectionTitle>
                    {intlGet("EVENT_FORM_INFO")} {intlGet(lang)}
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
                  <p>{intlGet("DESCRIPTION")}</p>
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
                <SectionTitle>{intlGet("TITLE_TIME")}</SectionTitle>
              <FormTitle>{intlGet("TIME_EXPLANATION")}</FormTitle>
              <p>{intlGet("START_TIME")}</p>
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
              <p>{intlGet("END_TIME")} </p>
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

            <p>{intlGet("LOCATION")}</p>
            <Field name="location.name">
              {({ field }) => (
                <TextField
                  {...field}
                  placeholder={intlGet("LOCATION_PLACEHOLDER")}
                />
              )}
            </Field>
            <p>{intlGet("ADDRESS")}</p>
            <Field name="location.address">
              {({ field }) => (
                <TextField
                  {...field}
                  placeholder={intlGet("ADDRESS_PLACEHOLDER")}
                />
              )}
            </Field>
            <Footer>
              <Button type="submit" loading={props.loading}>
                {isEdit ? intlGet("EDIT") : intlGet("CREATE")}
              </Button>
              {props.onDeleteEvent ? (
                <DeleteButton
                  type="button"
                  onClick={props.onDeleteEvent}
                  loading={props.deleteEventLoading}
                >
                  {intlGet("DELETE")}
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
