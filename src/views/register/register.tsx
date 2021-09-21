import api from "@/api";
import { Icon } from "@/base";
import { makeClasses } from "@/hooks";
import React, { FC, useState } from "react";
import modules from "./register.module.scss";
import { useAccount } from "@/providers/account";
import { dispatchSnackbar } from "@/features/snackbar";
import { Alert, Button, Card, Input, Link } from "@/components";

const classes = makeClasses(modules);

export const classNames = {
  root: "register",
  options: "register__options",
  recaptcha: "register__recaptcha",
};

export const fields = {
  email: "email",
  password: "password",
  nickname: "nickname",
  confirm: "password_confirm",
};

export const messages = {
  success: "account created successfully",
};

const Register: FC = () => {
  const [, setAccount] = useAccount();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const email = data.get(fields.email) as string;
    const password = data.get(fields.password) as string;
    const nickname = data.get(fields.nickname) as string;
    const confirm_password = data.get(fields.confirm) as string;

    setLoading(true);
    const [result, response] = await api.account.register({
      email: email,
      password: password,
      nickname: nickname,
    });
    setLoading(false);

    if (!response.ok) {
      setError(response.status);
      return;
    }

    setAccount(result.account);
    dispatchSnackbar({ message: messages.success });
  };

  return (
    <div className={classes(classNames.root)}>
      <Card loading={loading}>
        <Card.Title>New Account</Card.Title>

        <form onSubmit={handleSubmit}>
          {null === error ? (
            <Alert flat type='info'>
              An email will be sent to the provided mailbox with the
              account verification code.
            </Alert>
          ) : (
            <Alert type='error'>
              Umm... Something went wrong <code>(code: {error})</code>
            </Alert>
          )}

          <Input
            required
            autoFocus
            type='email'
            label='Email'
            name={fields.email}
            disabled={loading}
            __start={<Icon iconId='icon-at' />}
            __helper='Kept private. Only used as the account identifier'
          />

          <Input
            required
            type='text'
            label='Nickname'
            disabled={loading}
            name={fields.nickname}
            __helper='Your publicly visible name'
            __start={<Icon iconId='icon-user' />}
          />

          <Input
            required
            type='password'
            label='Password'
            disabled={loading}
            name={fields.password}
            __start={<Icon iconId='icon-lock-regular' />}
          />

          <Input
            required
            type='password'
            disabled={loading}
            name={fields.confirm}
            label='Confirm Password'
            __start={<Icon iconId='icon-lock-bold' />}
          />

          <Card.Actions>
            <Button type='submit' color='primary' disabled={loading}>
              Create Account
            </Button>
          </Card.Actions>
        </form>
      </Card>

      <div className={classes(classNames.options)}>
        <Link route='login'>I already have an account</Link>
      </div>

      <div className={classes(classNames.recaptcha)}>
        This site is protected by reCAPTCHA and the Google Privacy
        Policy and Terms of Service apply.
      </div>
    </div>
  );
};

export default Register;
