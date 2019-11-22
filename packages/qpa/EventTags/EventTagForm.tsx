import { Button, TextField } from "qpa-components"
import * as React from "react"
import { Formik, Field, FieldArray, Form, FormikBag, FormikProps } from "formik"
import { EventTagFullData } from "./useGetAllTagsWithTranslationsQuery"
import {
  EventTagTranslatedData,
  EventTagTranslationData,
} from "./useGetAvaiableTagsQuery"
import messages from "./EventTagForm.msg.json"
import styled from "@emotion/styled"
import intl from "react-intl-universal"

export interface EventTagFormData extends EventTagTranslatedData {
  name: string
  translations: EventTagTranslationData[]
}

interface Props {
  onSubmit: (values: EventTagFormData) => void
  values?: EventTagFullData
  loading?: boolean
  existingTags: EventTagFullData[]
}

const initialValue = {
  name: "",
  translations: [{ language: "", text: "" }],
}
const EventTagForm = (props: Props) => {
  intl.load({
    "es-ES": messages.es,
    "en-GB": messages.en,
  })
  return (
    <Formik initialValues={props.values || initialValue} onSubmit={props.onSubmit}>
      {({ values, setFieldValue }: FormikProps<EventTagFormData>) => (
        <RootForm>
          <Field name="name">{({ field }) => <TextField label="Name of Tag" {...field} />}</Field>
          <Translations>
            <FieldArray name="translations">
              {() =>
                values.translations.map((translation, i) => (
                  <Translation key={translation.id || `new${i}`}>
                    <Field name={`translations.${i}.language`}>
                      {({ field }) => (
                        <TextField
                          label="Language Code"
                          placeholder="Language code (en, es...)"
                          {...field}
                        />
                      )}
                    </Field>
                    <Field name={`translations.${i}.text`}>
                      {
                        ({field}) => (
                            <TextField
                                label="Translation"
                                placeholder="Translation of the tag"
                                {...field}
                            />
                        )
                      }
                    </Field>
                  </Translation>
                ))
              }
            </FieldArray>
            <Button
              loading={props.loading}
              onClick={() => {
                setFieldValue("translations", [
                  ...values.translations,
                  { language: "", text: "" },
                ])
              }}
            >
              Add language
            </Button>
          </Translations>
          <Button type="submit">
            {props.values
              ? intl.get("edit-tag-button")
              : intl.get("create-tag-button")}
          </Button>
        </RootForm>
      )}
    </Formik>
  )
}

const RootForm = styled(Form)``
const Translation = styled.div``
const Translations = styled.div``

export default EventTagForm
