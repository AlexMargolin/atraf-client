import api from "@/api";
import { Icon, Modal } from "@/base";
import { makeClasses } from "@/hooks";
import modules from "./reset.module.scss";
import { ModalHandle } from "@/base/modal";
import { ALERTS_TIMEOUT } from "@/defines";
import React, { FC, useRef, useState } from "react";
import { Alert, Button, Card, Input } from "@/components";

const classes = makeClasses(modules);

export const fields = {
  email: "email",
};

export const classNames = {
  root: "reset",
};

const Reset: FC = () => {
  const modalController = useRef<ModalHandle>();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const disabled = complete || loading;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData(event.target as HTMLFormElement);
    const email = data.get(fields.email) as string;

    setLoading(true);
    const [, response] = await api.account.forgot({
      email: email,
    });
    setLoading(false);

    if (!response.ok) {
      setError(response.status);
      return;
    }

    setError(null);
    setComplete(true);
    setTimeout(() => modalController.current.close(), ALERTS_TIMEOUT);
  };

  return (
    <Modal
      persistent
      defaultVisible={false}
      ref={modalController}
      __activator={
        <Button
          size='small'
          type='button'
          color='primary'
          variant='outlined'
        >
          Password Reset
        </Button>
      }
    >
      <Card
        flat
        loading={loading}
        className={classes(classNames.root)}
      >
        <Card.Title>Password Reset</Card.Title>

        <form onSubmit={handleSubmit}>
          {true === complete && (
            <Alert type='success' flat>
              Check your mailbox for the password reset link ;)
            </Alert>
          )}

          {null === error && false === complete && (
            <Alert type='info' flat>
              <span>
                A password reset link will be sent to the mailbox you
                have registered with.
                <br />
                The link will be valid for <strong>5 minutes</strong>.
              </span>
            </Alert>
          )}

          {null !== error && (
            <Alert type='error' flat>
              Umm... Something went wrong <code>(code: {error})</code>
            </Alert>
          )}

          <Input
            required
            disabled={disabled}
            name={fields.email}
            label='Account Email'
            __start={<Icon iconId='icon-at' />}
          />

          <Card.Actions>
            <Button
              type='submit'
              color='secondary'
              disabled={disabled}
            >
              Reset
            </Button>

            <Button
              type='button'
              color='secondary'
              variant='outlined'
              disabled={loading}
              onClick={() => modalController.current.close()}
            >
              close
            </Button>
          </Card.Actions>
        </form>
      </Card>
    </Modal>
  );
};

export default Reset;
