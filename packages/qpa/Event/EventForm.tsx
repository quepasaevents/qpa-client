import {css} from "@emotion/core"
import {addHours, format} from "date-fns"
import {Field, Form, Formik} from "formik"
import {Button} from "qpa-components"
import * as React from "react"
import styled from "styled-components"
import {EventStatus} from "../../../@types"
import DateTime from "./DateTime"
import * as intl from 'react-intl-universal'
import messages from "./EventForm.msg.json"

interface Props {
    values?: EventFormData
    onSubmit: (values: EventFormData) => void
    loading: boolean
    locales: string[]
}

export interface EventFormData {
    time: {
        timeZone: string;
        start: string;
        end: string;
        recurrence?: string;
        exceptions?: string;
    }
    infos: Array<{
        language: string;
        title: string;
        description: string;
    }>
    location: {
        address?: string;
        name: string;
    }
    status: EventStatus
    meta: {
        tags: string[];
    }
}

class EventFormik extends Formik<EventFormData> {
}

const nextWeekTenAM = new Date()
nextWeekTenAM.setUTCDate(nextWeekTenAM.getDate() + 7)
nextWeekTenAM.setUTCHours(10, 0)

const nextWeekMidday = new Date(nextWeekTenAM)
nextWeekMidday.setUTCHours(12)

const EventForm = (props: Props) => {
    intl.load({
        'es-ES': messages.es,
        'en-GB': messages.en
    })
    const isEdit = !!props.values
    return (
        <EventFormik
            onSubmit={props.onSubmit}
            initialValues={
                props.values
                    ? props.values
                    : {
                        time: {
                            timeZone: "Europe/Madrid",
                            start: nextWeekTenAM.toISOString().substring(0, 16),
                            end: nextWeekMidday.toISOString().substring(0, 16),
                        },
                        infos: props.locales.map(lang => (
                            {
                                language: lang,
                                title: "",
                                description: "",
                            }
                        )),
                        location: {
                            name: "",
                        },
                        meta: {
                            tags: [],
                        },
                        status: "confirmed",
                    }
            }
            validate={(values) => {
                const errors: any = {}
            }}
        >
            {({isValid, setFieldValue, values}) => (
                <StyledForm>
                    <FormTitle>
                        {
                            props.locales.length > 1 ? intl.get('EVENT_FORM_DETAILS_FOREWORD_MULTILINGUAL') : intl.get('EVENT_FORM_DETAILS_FOREWORD')
                        }
                    </FormTitle>
                    {
                        props.locales.map(lang => {
                            const i = values.infos.findIndex(info => info.language === lang)
                            return (
                                <section key={lang}>
                                    <h1>{intl.get('EVENT_FORM_INFO')} {intl.get(lang)}</h1>
                                    <p>{intl.get('EVENT_TITLE')}</p>
                                    <Field name={`info[${i}].title`}>
                                        {({field}) => <input {...field} placeholder="Name your event"/>}
                                    </Field>
                                    <p>{intl.get('DESCRIPTION')}</p>
                                    <Field name={`info[${i}].description`}>
                                        {({field}) => (
                                            <textarea
                                                {...field}
                                                placeholder={intl.get('DESCRIPTION_PLACEHOLDER')}
                                            />
                                        )}
                                    </Field>
                                </section>
                            )
                        })
                    }

                    <p>Start</p>
                    <Field name="time.start">
                        {
                            ({field}) => (
                                <DateTime {...field} onChange={(newStartValue) => {
                                    setFieldValue("time.start", newStartValue)
                                    setFieldValue("time.end", format(addHours(newStartValue, 2), "YYYY-MM-DDTHH:MM"))
                                }}/>
                            )
                        }
                    </Field>
                    <p>End</p>
                    <Field name="time.end">
                        {
                            ({field}) => (
                                <DateTime {...field}
                                          onChange={(newEndValue) => setFieldValue("time.end", newEndValue)}/>
                            )
                        }
                    </Field>
                    <p>{intl.get('LOCATION')}</p>
                    <Field name="location.name">
                        {({field}) => <input {...field} placeholder={intl.get('LOCATION_PLACEHOLDER')}/>}
                    </Field>
                    <p>{intl.get('ADDRESS')}</p>
                    <Field name="location.address">
                        {({field}) => <input {...field} placeholder={intl.get('ADDRESS_PLACEHOLDER')}/>}
                    </Field>

                    <Button type="submit"
                            loading={props.loading}>{isEdit ? intl.get('EDIT') : intl.get('CREATE')}</Button>
                </StyledForm>
            )}
        </EventFormik>
    )
}

const FormTitle = styled.div`
font-size: 24px;
`
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 800px;
  @media(max-width: 800px) {
    width: 600px;
  }
  @media(max-width: 600px) {
    width: 450px;
  }
`
export default EventForm
