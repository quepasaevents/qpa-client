import { TextField } from "qpa-components"
import * as React from "react"
import { Formik, Field, FieldArray, Form } from "formik"
import {
  EventTagData,
  EventTagTranslationData,
} from "./useGetAvaiableTagsQuery"
import messages from "./EventTagForm.msg.json"
import styled from "@emotion/styled"
import intl from "react-intl-universal"

interface EventTagFormData extends EventTagData {
  name: string
  translations: EventTagTranslationData[]
}

interface Props {
  onSubmit: (values: EventTagFormData) => void
  tag: EventTagData
}

const initialValue = {
    name: '',
    translations: [{language:"", text: ""}],
}
const EventTagForm = (props: Props) => {
  intl.load({
    "es-ES": messages.es,
    "en-GB": messages.en,
  })
  return (
    <Formik initialValues={initialValue} onSubmit={props.onSubmit}>
      {({values: EventTagFormData}) => (
        <Root>
          <Field name="name">{field => <TextField {...field} />}</Field>
          {
          }
        </Root>
      )}
    </Formik>
  )
}

const Root = styled(Form)``

export default EventTagForm
