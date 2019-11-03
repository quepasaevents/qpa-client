import styled from "@emotion/styled"
import { Button, TextField } from "qpa-components"
import { css } from "qpa-emotion"
import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router"
import Logo from "../LOGO.png"
import * as intl from "react-intl-universal"
import { emailRegex } from "./auth-commons"
import messages from "./login.msg.json"

const sendLogin = (email: string) => {
  return fetch("/api/login", {
    method: "post",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

interface Props extends RouteComponentProps {}

const Login = (props: Props) => {
  intl.load(messages)
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [success, setSuccess] = React.useState(false)
  const isValid = emailRegex.test(email)
  const [error, setError] = React.useState(false)

  return (
    <Root
      onSubmit={e => {
        e.preventDefault()
        setError(false)
        setLoading(true)
        sendLogin(email)
          .then(res => {
            if (res.status === 200) {
              setSuccess(true)
            } else {
              setLoading(false)
              setError(true)
            }
          })
          .catch(() => {
            setError(true)
          })
      }}
    >
      <LogoHolder
        css={css`
          background-image: url("${Logo}");
          background-position: center;
          background-repeat: no-repeat;
`}
      />
      <Title>{intl.get("login-title")}</Title>
      {error ? (
        <Error>
          <Label>{intl.get("email-not-found")}</Label>
          <StyledButton
            color="primary"
            onClick={() => props.history.push("/signup")}
          >
            Sign Up
          </StyledButton>
          <StyledButton
            color="secondary"
            onClick={() => setError(false)}
          >
            Try Again
          </StyledButton>
        </Error>
      ) : success ? (
        <Success>
          <Label>{intl.get("invitation-sent")}</Label>
          <StyledButton onClick={() => props.history.push("/")}>
            To Calendar
          </StyledButton>
        </Success>
      ) : (
        <>
          <EmailTextField
            id="email"
            type="email"
            value={email}
            label={intl.get("please-email")}
            autoFocus
            onChange={e => {
              setEmail(e.target.value)
            }}
            disabled={loading || success}
          />
          <StyledButton
            variant="contained"
            disabled={!isValid || success}
            type="submit"
          >
            Login
          </StyledButton>
        </>
      )}
    </Root>
  )
}

const Root = styled.form`
  display: grid;
  color: rgba(0, 0, 0, 0.6);
  grid-gap: 20px;
  grid-template-rows:
    [full-start logo-start] 200px
    [title-start logo-end] auto
    [input-start title-end] auto
    [button-start input-end] 40px
    [full-end button-end];
`

const EmailTextField = styled(TextField)`
  grid-row: input;
`

const LogoHolder = styled.div`
  grid-row: logo;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Title = styled.div`
  grid-row: title;
`

const StyledButton = styled(Button)`
  grid-row: button;
  width: 230px;
  && {
    margin: 0 auto;
  }
`

const Error = styled.div`
  margin-top: 8px;
`

const Label = styled.div`
  font-size: 16px;
`

const Success = styled.div`
  display: grid;
  grid-row-gap: 16px;
`
export default withRouter(Login)
