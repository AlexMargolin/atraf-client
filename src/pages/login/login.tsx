import api from "@/api"
import { makeClasses } from "@/hooks"
import modules from "./login.module.scss"
import React, { FC, useState } from "react"
import { Button, Card, Input, Icon, Link, Alert } from "@/components"

const classes = makeClasses(modules)

const classNames = {
  root: "login",
  title: "login__title",
  account: "login__account",
  buttons: "login__buttons",
  disclaimer: "login__disclaimer",
}

const EMAIL_FIELD = "email"
const PASSWORD_FIELD = "password"

const Login: FC = () => {
  const [error, setError] = useState(null)
  const [logged, setLogged] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const data = new FormData(form)

    const email = data.get(EMAIL_FIELD) as string
    const password = data.get(PASSWORD_FIELD) as string

    setError(null)
    setLoading(true)

    const [result, response] = await api.account.login({
      email: email,
      password: password,
    })

    if (!response.ok) {
      setLoading(false)
      setError(response.status)
      return
    }

    setLogged(true)
    sessionStorage.setItem("token", result.access_token)
  }

  return (
    <div className={classes(classNames.root)}>
      <Card loading={loading}>
        <h1 className={classes(classNames.title)}>Login</h1>
        <form onSubmit={handleSubmit}>
          {null !== error && !logged && (
            <Alert type='error'>
              <span>Umm... Something went wrong</span>{" "}
              <code>(code: {error})</code>
            </Alert>
          )}

          {logged && (
            <Alert type='success'>Logged in successfully!...</Alert>
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
            label='Password'
            disabled={loading}
            name={PASSWORD_FIELD}
            __start={<Icon iconId='icon-lock-bold' />}
            __helper={<Link route='login'>Forgot Password?</Link>}
          />

          <div className={classes(classNames.buttons)}>
            <Button
              grow
              type='submit'
              color='primary'
              disabled={loading}
            >
              login
            </Button>
          </div>
        </form>
      </Card>

      <div className={classes(classNames.account)}>
        <Link route='register'>I don&apos;t have an account</Link>
      </div>

      <div className={classes(classNames.disclaimer)}>
        This site is protected by reCAPTCHA and the Google Privacy
        Policy and Terms of Service apply.
      </div>
    </div>
  )
}

export default Login
