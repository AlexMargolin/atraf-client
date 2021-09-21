import api from "@/api";
import { history } from "@/router";
import { Icon, Modal } from "@/base";
import { makeClasses } from "@/hooks";
import modules from "./new.module.scss";
import { ModalHandle } from "@/base/modal";
import { dispatchSnackbar } from "@/features/snackbar";
import { Alert, Button, Card, Input } from "@/components";
import React, { FC, useEffect, useRef, useState } from "react";

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
  const [files, setFiles] = useState<FileList>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const modalHandler = useRef<ModalHandle>();
  const inputRef = useRef<HTMLInputElement>();
  const attachmentRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (inputRef.current) {
      let val = "";

      if (files && 0 !== files.length) {
        val = files.item(0).name;
      }
      inputRef.current.value = val;
    }
  }, [files]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const title = data.get(fields.title) as string;
    const body = data.get(fields.body) as string;
    const attachment = data.get(fields.attachment) as File;

    setLoading(true);
    const [result, response] = await api.posts.create({
      title: title,
      body: body,
      attachment: attachment,
    });
    setLoading(false);

    if (!response.ok) {
      setError(response.status);
      return;
    }

    modalHandler.current.close();
    history.push(`/post/${result.post_id}`);
    dispatchSnackbar({ message: "Post created Successfully" });
  };

  return (
    <Modal
      persistent
      ref={modalHandler}
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
            <Alert flat type='info'>
              <div>
                Max attachment size: <strong>10mb</strong>. Supported
                content types: <strong>[ jpg, png ]</strong>
              </div>
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

          <input
            required
            type='file'
            ref={attachmentRef}
            name={fields.attachment}
            style={{ display: "none" }}
            onChange={e => setFiles(e.target.files)}
          />

          <Input
            required
            ref={inputRef}
            disabled={loading}
            label='Attachment'
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
              color='primary'
              variant='outlined'
              disabled={loading}
              onClick={() => modalHandler.current.close()}
            >
              Cancel
            </Button>
          </Card.Actions>
        </form>
      </Card>
    </Modal>
  );
};

export default New;
