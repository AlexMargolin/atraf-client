import api from "@/api";
import { Icon } from "@/base";
import { FC, useState } from "react";
import { Reset } from "@/views/login";
import { makeClasses } from "@/hooks";
import modules from "./login.module.scss";
import { useAccount } from "@/providers/account";
import { dispatchSnackbar } from "@/features/snackbar";
import { Button, Card, Input, Link, Alert } from "@/components";

const classes = makeClasses(modules);

export const classNames = {
  root: "login",
  account: "login__account",
  disclaimer: "login__disclaimer",
};

export const fields = {
  email: "email",
  password: "password",
};

export const messages = {
  login: {
    success: "logged in successfully",
  },
};

const Login: FC = () => {
  const [, setAccount] = useAccount();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const email = data.get(fields.email) as string;
    const password = data.get(fields.password) as string;

    setLoading(true);
    const [account, response] = await api.account.login({
      email: email,
      password: password,
    });
    setLoading(false);

    if (!response.ok) {
      setError(response.status);
      return;
    }

    setAccount(account);
    dispatchSnackbar({ message: messages.login.success });
  };

  return (
    <div className={classes(classNames.root)}>
      <Card loading={loading}>
        <Card.Title>Login</Card.Title>

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
            __end={<Reset />}
          />

          <Card.Actions>
            <Button type='submit' color='primary' disabled={loading}>
              login
            </Button>
          </Card.Actions>
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
  );
};

export default Login;
