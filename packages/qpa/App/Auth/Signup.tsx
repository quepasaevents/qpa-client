import styled from "@emotion/styled"
import { Field, Form, Formik } from "formik"
import { Button, Label, Spinner, TextField } from "qpa-components"
import { useMessageCenter } from "qpa-message-center"
import * as React from "react"
import { hot } from "react-hot-loader"
import { Link } from "react-router-dom"
import Logo from "../LOGO.png"
import intl from "react-intl-universal"
import {emailRegex} from "./auth-commons"
import messages from "./Signup.msg.json"

interface SignupFormData {
  email: string
  name: string
}
class SignupFormik extends Formik<SignupFormData> {}

const Signup = () => {
  intl.load(messages)
  const { addMessage } = useMessageCenter()
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [emailTaken, setEmailTaken] = React.useState(false)

  return (
    <Root>
      <LogoHolder>
        <img src={Logo} />
      </LogoHolder>
      {success ? (
        <Label>
          {intl.get("signup-success")}{" "}
          <Link to="/">{intl.get("go-to-calendar")}</Link>
        </Label>
      ) : (
        <SignupFormik
          initialValues={{ name: "", email: "" }}
          validate={(values: SignupFormData) => {
            const errors: any = {}
            if (!values.name) {
              errors.name = intl.get("form-error-no-name")
            }
            if (values.name.length < 4) {
              errors.name = intl.get("form-error-name-too-short")
            }
            if (!values.email) {
              errors.email = intl.get("form-error-no-email")
            }
            if (!emailRegex.test(values.email)) {
              errors.email = intl.get("form-error-legal-email")
            }
            return errors
          }}
          onSubmit={(values, { setFieldError }) => {
            fetch("/api/signup", {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                name: values.name,
                email: values.email,
              }),
            })
              .then(res => {
                if (res.status === 200) {
                  setSuccess(true)
                  addMessage({
                    type: "success",
                    text: intl.get("signup-success"),
                  })
                  return
                } else {
                  addMessage({
                    type: "error",
                    text: intl.get("signup-error"),
                  })
                }

                if (res.status === 409) {
                  setFieldError("email", intl.get("email-taken"))
                }
              })
              .catch(e => {
                addMessage({
                  type: "error",
                  text: `${intl.get('signup-error')} ${e.message}`,
                })
              })
          }}
        >
          {({ values, isValid, errors, touched }) => (
            <SForm>
              <Title>
                {
                  intl.get('signup-form-title')
                }
              </Title>
              <Fields>
                <Field name="name">
                  {({ field }) => (
                    <TextField errorMessage={touched.name && errors.name} placeholder={intl.get('your-name')} {...field} />
                  )}
                </Field>
                <Field name="email" css={{ gridRow: 2 }}>
                  {({ field }) => (
                    <TextField errorMessage={touched.email && errors.email} placeholder={intl.get("your-email")} {...field} />
                  )}
                </Field>
              </Fields>
              <SButton type="submit" disabled={!isValid || loading}>
                {loading ? <Spinner /> : intl.get("sign-up")}
              </SButton>
              <GoToLogin to="/login">
                {
                  intl.get('already-have-account-login')
                }
              </GoToLogin>
            </SForm>
          )}
        </SignupFormik>
      )}
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`

const LogoHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
`

const SForm = styled(Form)`
  height: 100%;
  display: grid;
  grid-template-columns:
    [full-start] auto
    [center-start] 200px
    [center-end] auto
    [full-end];
  grid-template-rows:
    [title-start] 120px
    [title-end fields-start] 120px
    [fields-end button-start] 32px
    [button-end bottom-start] 48px
    [bottom-end]
    ;
`
const Title = styled.div`
  grid-column: full;
  grid-row: title;
`
const Fields = styled.div`
  grid-column: full;
  grid-row: fields;
  > *:not(:first-child) {
    margin-top: 24px;
  }
`
const SButton = styled(Button)`
  grid-row: button;
  grid-column: center;
`

const GoToLogin = styled(Link)`
  grid-row: bottom;
  grid-column: center;
  font-size: 12px;
  margin-top: 4px;
`
export default hot(module)(Signup)
