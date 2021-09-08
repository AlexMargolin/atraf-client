import api from "@/api"
import { makeClasses } from "@/hooks"
import React, { FC, useState } from "react"
import modules from "./register.module.scss"
import { Card, Icon, Link, Input, Button, Alert } from "@/components"

const classes = makeClasses(modules)

const classNames = {
  root: "register",
  title: "register__title",
  account: "register__account",
  buttons: "register__buttons",
  shortcuts: "register__shortcuts",
  disclaimer: "register__disclaimer",
}

const EMAIL_FIELD = "email"
const PASSWORD_FIELD = "password"
const PASSWORD_CONFIRM_FIELD = "confirm_password"

const Register: FC = () => {
  const [error, setError] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const data = new FormData(form)

    const email = data.get(EMAIL_FIELD) as string
    const password = data.get(PASSWORD_FIELD) as string
    const confirm_password = data.get(PASSWORD_CONFIRM_FIELD)

    // Set Loader
    setLoading(true)

    const [, response] = await api.account.register({
      email: email,
      password: password,
    })

    // Error state
    if (!response.ok) {
      setLoading(false)
      setError(response.status)
      return
    }

    // Success state
    setError(-1)
  }

  return (
    <div className={classes(classNames.root)}>
      <h1 className={classes(classNames.title)}>New Account</h1>
      <Card>
        <form onSubmit={handleSubmit}>
          {0 < error && (
            <Alert type='error'>
              Umm... Something went wrong <code>(code: {error})</code>
            </Alert>
          )}

          {0 > error && (
            <Alert type='success'>
              Account created successfully!...
            </Alert>
          )}

          <Input
            required
            autoFocus
            type='email'
            label='Email'
            name={EMAIL_FIELD}
            disabled={loading}
            __start={<Icon iconId='icon-at' />}
          />

          <Input
            required
            type='password'
            disabled={loading}
            label='Password'
            name={PASSWORD_FIELD}
            __helper='Should be at least 12 characters long'
            __start={<Icon iconId='icon-lock-regular' />}
          />

          <Input
            required
            type='password'
            disabled={loading}
            label='Confirm Password'
            name={PASSWORD_CONFIRM_FIELD}
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
