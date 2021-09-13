import api from "@/api"
import { Transition } from "@/core"
import { makeClasses } from "@/hooks"
import React, { FC, useState } from "react"
import modules from "./register.module.scss"
import { Alert, Button, Card, Icon, Input, Link } from "@/components"
import { NavigateTo } from "@/router"

const classes = makeClasses(modules)

export const fields = {
  email: "email",
  password: "password",
  confirm: "password_confirm",
  code: "code",
}

export const classNames = {
  root: "register",
  title: "register__title",
  account: "register__account",
  buttons: "register__buttons",
  shortcuts: "register__shortcuts",
  disclaimer: "register__disclaimer",

  card1: "register__card1",
  card2: "register__card2",
}

const Register: FC = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [isSignup, setIsSignup] = useState(true)
  const [isVerify, setIsVerify] = useState(false)

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)

    const email = data.get(fields.email) as string
    const password = data.get(fields.password) as string
    const confirm_password = data.get(fields.confirm) as string

    setLoading(true)
    const [, response] = await api.account.register({
      email: email,
      password: password,
    })
    setLoading(false)

    if (!response.ok) {
      setError(response.status)
      return
    }

    setError(null)
    setIsSignup(false)
  }

  const handleActivate = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)

    const code = data.get(fields.code) as string

    setLoading(true)
    const [, response] = await api.account.activate({
      code: code,
    })

    if (!response.ok) {
      setLoading(false)
      setError(response.status)
      return
    }

    setError(null)
    NavigateTo("home")
  }

  return (
    <div className={classes(classNames.root)}>
      <Transition
        in={isSignup}
        className={classes(classNames.card1)}
        onComplete={() => setIsVerify(!isSignup)}
      >
        <Card loading={loading} className={classes(classNames.card1)}>
          <h1 className={classes(classNames.title)}>New Account</h1>

          <form onSubmit={handleRegister}>
            {null == error && (
              <Alert flat hideIcon type='info'>
                An email will be sent to the provided mailbox with the
                account verification code.
              </Alert>
            )}

            {null !== error && (
              <Alert type='error'>
                Umm... Something went wrong{" "}
                <code>(code: {error})</code>
              </Alert>
            )}

            <Input
              required
              autoFocus
              type='email'
              label='Email'
              disabled={loading}
              name={fields.email}
              __start={<Icon iconId='icon-at' />}
            />

            <Input
              required
              type='password'
              label='Password'
              disabled={loading}
              name={fields.password}
              __start={<Icon iconId='icon-lock-regular' />}
              __helper='Should be at least 12 characters long'
            />

            <Input
              required
              type='password'
              disabled={loading}
              name={fields.confirm}
              label='Confirm Password'
              __start={<Icon iconId='icon-lock-bold' />}
            />

            <div className={classes(classNames.buttons)}>
              <Button
                grow
                type='submit'
                color='primary'
                disabled={loading}
              >
                Create Account
              </Button>
            </div>
          </form>
        </Card>
      </Transition>

      <Transition in={isVerify} className={classes(classNames.card2)}>
        <Card loading={loading} className={classes(classNames.card2)}>
          <h1 className={classes(classNames.title)}>Verify</h1>

          <form onSubmit={handleActivate}>
            {null == error && (
              <Alert flat>
                An email with a 6 digit verification code was sent to
                your mailbox.
              </Alert>
            )}

            {null !== error && (
              <Alert type='error'>
                Umm... Something went wrong{" "}
                <code>(code: {error})</code>
              </Alert>
            )}

            <div>
              <Input
                required
                autoFocus
                type='text'
                disabled={loading}
                name={fields.code}
                label='Verification Code'
                __start={<Icon iconId='icon-shield' />}
                __end={
                  <Button
                    size='small'
                    color='primary'
                    variant='filled'
                  >
                    Resend
                  </Button>
                }
              />
            </div>

            <div className={classes(classNames.buttons)}>
              <Button
                grow
                type='submit'
                color='secondary'
                disabled={loading}
              >
                Verify Account
              </Button>
            </div>
          </form>
        </Card>
      </Transition>

      <div className={classes(classNames.account)}>
        <Link route='login'>I already have an account</Link>
      </div>

      <div className={classes(classNames.disclaimer)}>
        This site is protected by reCAPTCHA and the Google Privacy
        Policy and Terms of Service apply.
      </div>
    </div>
  )
}

export default Register
