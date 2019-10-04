import styled from "@emotion/styled"
import {Field, Form, Formik} from "formik"
import {Button, Label, Spinner, TextField} from "qpa-components"
import {useMessageCenter} from "qpa-message-center"
import * as React from "react"
import {Link} from "react-router-dom"

interface SignupFormData {
  email: string
  name: string
}
class SignupFormik extends Formik<SignupFormData> {}

const Signup = () => {
  const { addMessage } = useMessageCenter()
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [emailTaken, setEmailTaken] = React.useState(false)

  if (success) {
    return <Label>Sign up was successful. Please check your email or <Link to="/">go to calendar</Link></Label>
  }
  return (
    <SignupFormik
      initialValues={{name: "", email: ""}}
      onSubmit={(values, {setFieldError}) => {
        fetch("/api/signup", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
          }),
        }).then((res) => {
          if (res.status === 200) {
            setSuccess(true)
            addMessage({
              type: "success",
              text: "Sign up succeeded. Please check your email",
            })
            return
          } else {
            addMessage({
              type: "error",
              text: "Error signin up. Please try later",
            })
          }

          if (res.status === 409) {
            setFieldError("email", "Email is taken. Maybe try to log in?")
          }
        }).catch((e) => {
          addMessage({
            type: "error",
            text: `Error signin up. Please try later. ${e.message}`,
          })
        })

      }}
    >
      {
        ({values, isValid}) => (
          <SForm>
            <p css={{gridArea: "1/1/1/4"}}>
              In order to insert your own event, please sign up.
              You only have to give us a name, and and email where we can reach you.
              Once these are set, we will send an invitation to your email.
            </p>
            <Field name="name">
              {
                ({field}) => <STextField placeholder="Your name" {...field} css={{gridArea: "2/2/2/3"}}/>
              }
            </Field>
            <Field name="email" css={{gridRow: 2}}>
              {
                ({field}) => <STextField placeholder="Your email" {...field} css={{gridArea: "3/2/3/4"}}/>
              }
            </Field>

            <Button type="submit" disabled={!isValid || loading} css={{gridArea: "4/2/5/3", marginTop: 12}}>{
              loading ? <Spinner /> : "Sign up"
            }</Button>

          </SForm>
        )
      }
    </SignupFormik>
  )
}

const SForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr 240px 1fr;
  max-width: 640px;
`

const STextField = styled(TextField)`
  width: 240px;
`

export default Signup
