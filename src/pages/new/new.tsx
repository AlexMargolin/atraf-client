import api from "@/api";
import { FC, useRef } from "react";
import { makeClasses } from "@/hooks";
import modules from "./new.module.scss";
import { useHistory } from "react-router-dom";
import { Button, Container, Input } from "@/components";
import { dispatchSnackbar } from "@/features/snackbar";

const classes = makeClasses(modules);

export const classNames = {
  root: "new",
  title: "new__title",
  author: "new__author",
  form: {
    root: "new__form",
    row: "new__form-row",
    buttons: "new__form-buttons",
  },

  tag: {
    root: "tag",
  },

  drop: {
    root: "drop",
    inner: "drop__inner",
  },
};

const New: FC = () => {
  const history = useHistory();
  const fileRef = useRef<HTMLInputElement>();

  const handleBrowse = () => {
    fileRef.current.click();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const title = data.get("title") as string;
    const body = data.get("body") as string;
    const file = data.get("file") as File;

    const [result, response] = await api.posts.create({
      title: title,
      body: body,
      file: file,
    });

    if (!response.ok) {
      dispatchSnackbar({ message: "post creation failed" });
      return;
    }

    history.push(`/post/${result.post_id}`);
  };

  return (
    <Container className={classes(classNames.root)}>
      <h1 className={classes(classNames.title)}>Create a new Post</h1>
      <div className={classes(classNames.author)}>
        Posting as{" "}
        <span className={classes(classNames.tag.root)}>Alex</span>
      </div>

      <form
        autoComplete='off'
        onSubmit={handleSubmit}
        className={classes(classNames.form.root)}
      >
        <div className={classes(classNames.form.row)}>
          <Input name='title' required label='Post Title' />
        </div>

        <div className={classes(classNames.form.row)}>
          <Input name='body' required label='Post Description' />
        </div>

        <input
          name='file'
          type='file'
          ref={fileRef}
          style={{ display: "none" }}
        />

        <div className={classes(classNames.drop.root)}>
          <div>Drag and drop files, or select from your device</div>

          <Button
            type='button'
            color='secondary'
            variant='outlined'
            onClick={handleBrowse}
          >
            Browse
          </Button>
        </div>

        <div className={classes(classNames.form.buttons)}>
          <Button color='primary'>Publish</Button>
        </div>
      </form>
    </Container>
  );
};

export default New;
