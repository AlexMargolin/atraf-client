import api from "@/api"
import React, { FC } from "react"
import { makeClasses } from "@/hooks"
import modules from "./register.module.scss"
import { Card, Icon, Link, Input, Button } from "@/components"

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
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const data = new FormData(form)

    const email = data.get(EMAIL_FIELD) as string
    const password = data.get(PASSWORD_FIELD) as string
    const confirm_password = data.get(PASSWORD_CONFIRM_FIELD)

    // Create Account
    await api.account.register(email, password)
  }

  return (
    <div className={classes(classNames.root)}>
      <h1 className={classes(classNames.title)}>New Account</h1>
      <Card>
        <form onSubmit={handleSubmit} noValidate>
          <Input
            required
            autoFocus
            type='email'
            label='Email'
            name={EMAIL_FIELD}
            __start={<Icon iconId='icon-at' />}
          />

          <Input
            required
            type='password'
            label='Password'
            name={PASSWORD_FIELD}
            __helper='Should be at least 12 characters long'
            __start={<Icon iconId='icon-lock-regular' />}
          />

          <Input
            required
            type='password'
            label='Confirm Password'
            name={PASSWORD_CONFIRM_FIELD}
            __start={<Icon iconId='icon-lock-bold' />}
          />

          <div className={classes(classNames.buttons)}>
            <Button grow type='submit' color='primary'>
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
