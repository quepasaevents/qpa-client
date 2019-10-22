import styled from "@emotion/styled"
import { Button, Label, TextField } from "qpa-components"
import { css } from "qpa-emotion"
import * as React from "react"
import { hot } from "react-hot-loader"
import { RouteComponentProps, withRouter } from "react-router"
import Logo from "../LOGO.png"
import {get as intlGet, load as intlLoad} from "react-intl-universal"
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
  intlLoad(messages)
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
      <Title>{intlGet("login-title")}</Title>
      {error ? (
        <Error>
          <Label>{intlGet("email-not-found")}</Label>
          <StyledButton
            onClick={() => props.history.push("/signup")}
            css={{ gridColumn: 2 }}
          >
            Sign Up
          </StyledButton>
          <StyledButton onClick={() => setError(false)} css={{ gridColumn: 3 }}>
            Try Again
          </StyledButton>
        </Error>
      ) : success ? (
        <Success>
          <Label>{intlGet("invitation-sent")}</Label>
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
            label="Please enter your email to log in"
            onChange={(e, newValue) => {
              setEmail(newValue)
            }}
            disabled={loading || success}
          />
          <Button disabled={!isValid || success} type="submit">
            Login
          </Button>
        </>
      )}
    </Root>
  )
}

const Root = styled.form`
  display: grid;
  color: rgba(0, 0, 0, 0.6);
  grid-gap: 8px;
  grid-template-rows:
    [full-start logo-start] 200px
    [title-start logo-end] auto
    [input-start title-end] auto
    [button-start input-end] 24px
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
`

const Error = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(2, auto) 1fr;
  grid-gap: 24px 4px;
}

  label {
    grid-column: 1/5;
  }
  ${StyledButton} {
    grid-row: 2;
  }
`

const Success = styled.div`
  display: grid;
  grid-row-gap: 16px;
`
export default withRouter(Login)
