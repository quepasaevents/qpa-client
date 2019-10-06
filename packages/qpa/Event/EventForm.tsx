import {addHours, format} from "date-fns"
import {Field, Form, Formik} from "formik"
import {Button} from "qpa-components"
import * as React from "react"
import styled from "styled-components"
import {EventStatus} from "../../../@types"
import DateTime from "./DateTime"

interface Props {
    values?: EventFormData
    onSubmit: (values: EventFormData) => void
    loading: boolean
    languages: string[]
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
                        infos: props.languages.map(lang => (
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
                    {
                        props.languages.map(lang => {
                            const i = values.infos.findIndex(info => info.language === lang)
                            return (
                                <section key={lang}>
                                    <h1>{lang}</h1>
                                    <p>Title</p>
                                    <Field name={`info[${i}].title`}>
                                        {({field}) => <input {...field} placeholder="Name your event"/>}
                                    </Field>
                                    <p>Description</p>
                                    <Field name={`info[${i}].description`}>
                                        {({field}) => (
                                            <textarea
                                                {...field}
                                                placeholder="Write a few words about your event"
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
                    <p>Location</p>
                    <Field name="location.name">
                        {({field}) => <input {...field} placeholder="Location's name"/>}
                    </Field>
                    <p>Address</p>
                    <Field name="location.address">
                        {({field}) => <input {...field} placeholder="Address"/>}
                    </Field>

                    <Button type="submit" loading={props.loading}>{isEdit ? "Edit" : "Create"}</Button>
                </StyledForm>
            )}
        </EventFormik>
    )
}
const StyledForm = styled(Form)``
export default EventForm
