import { FC } from "react"
import { NavigateTo } from "@/router"
import { makeClasses } from "@/hooks"
import modules from "./login.module.scss"
import { Button, Card, Input, Icon, Link } from "@/components"

const classes = makeClasses(modules)

const classNames = {
  root: "login",
  title: "login__title",
  account: "login__account",
  buttons: "login__buttons",
  disclaimer: "login__disclaimer",
}

const Login: FC = () => {
  return (
    <div className={classes(classNames.root)}>
      <h1 className={classes(classNames.title)}>Login</h1>
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
            __start={<Icon iconId='icon-lock' />}
            __helper={<Link route='login'>Forgot Password?</Link>}
          />

          <div className={classes(classNames.buttons)}>
            <Button grow type='submit' color='primary'>
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
