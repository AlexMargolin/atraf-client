import api from "@/api";
import { Icon } from "@/base";
import { makeClasses } from "@/hooks";
import React, { FC, useState } from "react";
import modules from "./activate.module.scss";
import { useAccount } from "@/providers/account";
import { dispatchSnackbar } from "@/features/snackbar";
import { Alert, Button, Card, Input, Link } from "@/components";

const classes = makeClasses(modules);

export const classNames = {
  root: "activate",
  options: "activate__options",
  recaptcha: "activate__recaptcha",
};

export const fields = {
  code: "code",
};

export const messages = {
  success: "account activated successfully",
};

const Activate: FC = () => {
  const [, setAccount] = useAccount();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const code = data.get(fields.code) as string;

    setLoading(true);
    const [account, response] = await api.account.activate({
      code: code,
    });
    setLoading(false);

    if (!response.ok) {
      setError(response.status);
      return;
    }

    setAccount(account);
    dispatchSnackbar({ message: messages.success });
  };

  return (
    <div className={classes(classNames.root)}>
      <Card loading={loading}>
        <Card.Title>Account activation</Card.Title>

        <form onSubmit={handleSubmit}>
          {null === error ? (
            <Alert flat>
              An email with a 6 digit verification code was sent to
              your mailbox.
            </Alert>
          ) : (
            <Alert type='error'>
              Umm... Something went wrong <code>(code: {error})</code>
            </Alert>
          )}

          <Input
            required
            autoFocus
            type='text'
            name={fields.code}
            label='Verification Code'
            disabled={loading}
            __start={<Icon iconId='icon-shield' />}
            __end={
              <Button
                size='small'
                color='secondary'
                variant='outlined'
                disabled={loading}
              >
                Resend
              </Button>
            }
          />

          <Card.Actions>
            <Button type='submit' color='primary' disabled={loading}>
              Verify Account
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

export default Activate;
