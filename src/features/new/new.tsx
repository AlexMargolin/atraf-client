import api from "@/api";
import { Icon, Modal } from "@/base";
import { makeClasses } from "@/hooks";
import modules from "./new.module.scss";
import { ModalHandle } from "@/base/modal";
import React, { FC, useRef, useState } from "react";
import { dispatchSnackbar } from "@/features/snackbar";
import { Alert, Button, Card, Input } from "@/components";

const classes = makeClasses(modules);

export const classNames = {
  root: "new",
};

export const fields = {
  title: "title",
  body: "body",
  attachment: "attachment",
};

const New: FC = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const modalController = useRef<ModalHandle>();
  const attachmentRef = useRef<HTMLInputElement>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const title = data.get(fields.title) as string;
    const body = data.get(fields.body) as string;
    const attachment = data.get(fields.attachment) as File;

    setLoading(true);
    const [, response] = await api.posts.create({
      title: title,
      body: body,
      attachment: attachment,
    });
    setLoading(false);

    if (!response.ok) {
      setError(response.status);
      return;
    }

    modalController.current.close();
    dispatchSnackbar({ message: "Post created Successfully" });
  };

  return (
    <Modal
      persistent
      ref={modalController}
      __activator={
        <Button variant='outlined' color='primary'>
          new post
        </Button>
      }
    >
      <Card
        flat
        loading={loading}
        className={classes(classNames.root)}
      >
        <Card.Title>Create New Post</Card.Title>

        <form onSubmit={handleSubmit} autoComplete='off'>
          {null === error && (
            <Alert type='info' flat>
              Since you haven&apos;t updated your personal details,
              post author will be <q>anonymous</q>
            </Alert>
          )}

          {null !== error && (
            <Alert type='error'>
              <span>Umm... Something went wrong</span>{" "}
              <code>(code: {error})</code>
            </Alert>
          )}

          <Input
            required
            type='text'
            disabled={loading}
            label='Post Title'
            name={fields.title}
            __start={<Icon iconId='icon-heading' />}
          />

          <Input
            required
            type='text'
            disabled={loading}
            name={fields.body}
            label='Post Content'
            __start={<Icon iconId='icon-edit' />}
          />

          <Input
            required
            type='file'
            disabled={loading}
            label='Attachment'
            ref={attachmentRef}
            name={fields.attachment}
            __start={<Icon iconId='icon-attachment' />}
            __end={
              <Button
                size='small'
                color='primary'
                variant='outlined'
                onClick={() => attachmentRef.current.click()}
              >
                Select file
              </Button>
            }
          />

          <Card.Actions>
            <Button type='submit' color='primary' disabled={loading}>
              Add new post
            </Button>

            <Button
              type='button'
              color='primary'
              variant='outlined'
              disabled={loading}
              onClick={() => modalController.current.close()}
            >
              Close
            </Button>
          </Card.Actions>
        </form>
      </Card>
    </Modal>
  );
};

export default New;