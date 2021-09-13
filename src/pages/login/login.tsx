import api from "@/api"
import { makeClasses } from "@/hooks"
import modules from "./login.module.scss"
import React, { FC, useState } from "react"
import { Button, Card, Input, Icon, Link, Alert } from "@/components"
import { NavigateTo } from "@/router"

const classes = makeClasses(modules)

export const classNames = {
  root: "login",
  title: "login__title",
  account: "login__account",
  buttons: "login__buttons",
  disclaimer: "login__disclaimer",
}

export const fields = {
  email: "email",
  password: "password",
}

const Login: FC = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)

    const email = data.get(fields.email) as string
    const password = data.get(fields.password) as string

    setLoading(true)
    const [, response] = await api.account.login({
      email: email,
      password: password,
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
      <Card loading={loading}>
        <h1 className={classes(classNames.title)}>Login</h1>
        <form onSubmit={handleSubmit}>
          {null !== error && (
            <Alert type='error'>
              <span>Umm... Something went wrong</span>{" "}
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
