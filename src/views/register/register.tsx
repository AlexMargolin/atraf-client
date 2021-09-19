import api from "@/api";
import { Icon } from "@/base";
import { Transition } from "@/core";
import { NavigateTo } from "@/router";
import { makeClasses } from "@/hooks";
import React, { FC, useState } from "react";
import modules from "./register.module.scss";
import { dispatchSnackbar } from "@/features/snackbar";
import { Alert, Button, Card, Input, Link } from "@/components";

const classes = makeClasses(modules);

export const classNames = {
  root: "register",
  account: "register__account",
  disclaimer: "register__disclaimer",
  card1: "register__card1",
  card2: "register__card2",
};

export const fields = {
  email: "email",
  password: "password",
  confirm: "password_confirm",
  code: "code",
};

export const messages = {
  register: {
    success: "account created successfully",
  },

  activate: {
    success: "account activated successfully",
  },
};

const Register: FC = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const [isSignup, setIsSignup] = useState(true);
  const [isVerify, setIsVerify] = useState(false);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const email = data.get(fields.email) as string;
    const password = data.get(fields.password) as string;
    const confirm_password = data.get(fields.confirm) as string;

    setLoading(true);
    const [, response] = await api.account.register({
      email: email,
      password: password,
    });
    setLoading(false);

    if (!response.ok) {
      setError(response.status);
      return;
    }

    setError(null);
    setIsSignup(false);
    dispatchSnackbar({ message: messages.register.success });
  };

  const handleActivate = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const code = data.get(fields.code) as string;

    setLoading(true);
    const [, response] = await api.account.activate({
      code: code,
    });
    setLoading(false);

    if (!response.ok) {
      setError(response.status);
      return;
    }

    setError(null);
    setComplete(true);
    dispatchSnackbar({ message: messages.activate.success });
    NavigateTo("home");
  };

  return (
    <div className={classes(classNames.root)}>
      <Transition
        in={isSignup}
        onComplete={() => setIsVerify(!isSignup)}
      >
        <Card loading={loading} className={classes(classNames.card1)}>
          <Card.Title>New Account</Card.Title>

          <form onSubmit={handleRegister}>
            {null == error && (
              <Alert flat type='info'>
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
              name={fields.email}
              disabled={loading || complete}
              __start={<Icon iconId='icon-at' />}
            />

            <Input
              required
              type='password'
              label='Password'
              name={fields.password}
              disabled={loading || complete}
              __start={<Icon iconId='icon-lock-regular' />}
              __helper='Should be at least 12 characters long'
            />

            <Input
              required
              type='password'
              name={fields.confirm}
              label='Confirm Password'
              disabled={loading || complete}
              __start={<Icon iconId='icon-lock-bold' />}
            />

            <Card.Actions>
              <Button
                grow
                type='submit'
                color='primary'
                disabled={loading || complete}
              >
                Create Account
              </Button>
            </Card.Actions>
          </form>
        </Card>
      </Transition>

      <Transition in={isVerify}>
        <Card loading={loading} className={classes(classNames.card2)}>
          <Card.Title>Verify</Card.Title>

          <form onSubmit={handleActivate}>
            {complete && (
              <Alert type='success'>
                Account activated successfully!... Taking you home
              </Alert>
            )}

            {null == error && false == complete && (
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
                name={fields.code}
                label='Verification Code'
                disabled={loading || complete}
                __start={<Icon iconId='icon-shield' />}
                __end={
                  <Button
                    size='small'
                    color='secondary'
                    variant='outlined'
                    disabled={loading || complete}
                  >
                    Resend
                  </Button>
                }
              />
            </div>

            <Card.Actions>
              <Button
                grow
                type='submit'
                color='primary'
                disabled={loading || complete}
              >
                Verify Account
              </Button>
            </Card.Actions>
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
  );
};

export default Register;
