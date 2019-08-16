import styled from "@emotion/styled"
import {Button, Label, TextField} from "qpa-components"
import * as React from "react"
import {RouteComponentProps, withRouter} from "react-router"

const sendLogin = (email: string) => {
  return fetch("/api/login", {
    method: "post",
    body: JSON.stringify({email}),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

interface Props extends RouteComponentProps {}

const Login = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [success, setSuccess] = React.useState(true)
  const isValid = /\w@\w.\w/.test(email)
  const [error, setError] = React.useState(false)

  return (
    <Root onSubmit={(e) => {
      e.preventDefault()
      setError(false)
      setLoading(true)
      sendLogin(email)
        .then((res) => {
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
    }}>
      {
        error ? (
          <Error>
            <Label>Could not find a user with the mentioned email. Please sign up first.</Label>
            <StyledButton onClick={() => props.history.push("/signup")} css={{gridColumn: 2}}>Sign Up</StyledButton>
            <StyledButton onClick={() => setError(false)} css={{gridColumn: 3}}>Try Again</StyledButton>
          </Error>
        ) : (
          success ? (
            <Success>
              <Label>Invitation was sent to your email: {email}.
                Please check your email and click on the link provided in the invitation.
                In the meantime you can browse other events in the calendar</Label>
              <StyledButton onClick={() => props.history.push("/")}>To Calendar</StyledButton>
            </Success>
          ) : (
            <>
              <label htmlFor="email">Please enter your email to log in</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e, newValue) => {
                  setEmail(newValue)
                }}
                disabled={loading || success}
              />
              <Button
                disabled={!isValid || success}
                type="submit"
              >
                Login
              </Button>
            </>
          )

        )
      }
    </Root>
  )
}

const Root = styled.form`
  display: flex;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.6);
  flex-direction: column;
  width: 320px;
`

const Input = styled(TextField)`
  height: 38px;
  font-size: 24px;
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 18px;
`

const StyledButton = styled(Button)``

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
