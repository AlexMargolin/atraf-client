import { FC } from "react"
import { makeClasses } from "@/hooks"
import modules from "./register.module.scss"
import { Button, Card, Input, Icon, Link } from "@/components"

const classes = makeClasses(modules)

const classNames = {
  root: "register",
  title: "register__title",
  account: "register__account",
  buttons: "register__buttons",
  disclaimer: "register__disclaimer",
}

const Register: FC = () => {
  return (
    <div className={classes(classNames.root)}>
      <h1 className={classes(classNames.title)}>Register</h1>
      <Card>
        <form>
          <Input
            required
            autoFocus
            type='email'
            label='Email'
            __start={<Icon iconId='icon-at' />}
          />

          <Input
            required
            type='password'
            label='Password'
            __start={<Icon iconId='icon-lock-regular' />}
          />

          <Input
            required
            type='password'
            label='Confirm Password'
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
        <Link route='login'>I Already have an account</Link>
      </div>

      <div className={classes(classNames.disclaimer)}>
        This site is protected by reCAPTCHA and the Google Privacy
        Policy and Terms of Service apply.
      </div>
    </div>
  )
}

export default Register