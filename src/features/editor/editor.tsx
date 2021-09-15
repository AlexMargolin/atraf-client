import { EditorProps } from "./";
import { FC, useRef } from "react";
import { makeClasses } from "@/hooks";
import modules from "./editor.module.scss";
import { Button, Icon, Input, Kbd } from "@/components";

const classes = makeClasses(modules);

export const classNames = {
  root: "editor",
  shortcuts: "editor__shortcuts",
};

const Editor: FC<EditorProps> = props => {
  const { loading, disabled, onChange, onSubmit, submitLabel } =
    props;

  const formRef = useRef<HTMLFormElement>();
  const inputRef = useRef<HTMLInputElement>();

  // Replace the default "enter" to submit behaviour with
  // "shift" + "enter"
  const handleKeydown = (event: React.KeyboardEvent) => {
    if ("Enter" === event.key && !event.shiftKey) {
      event.preventDefault();
    }
  };

  const handleChange = () => {
    if (onChange instanceof Function) {
      onChange(inputRef.current.value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (onSubmit instanceof Function) {
      onSubmit(inputRef.current.value);
    }

    formRef.current.reset();
  };

  return (
    <form
      ref={formRef}
      autoComplete='off'
      onChange={handleChange}
      onSubmit={handleSubmit}
      onKeyDown={handleKeydown}
      className={classes(classNames.root)}
    >
      <Input
        required={true}
        ref={inputRef}
        disabled={disabled}
        label='Add a comment'
        placeholder='Write something nice...'
        __start={<Icon iconId='icon-chat' />}
        __end={
          <Button
            size='small'
            type='submit'
            color='primary'
            loading={loading}
          >
            {submitLabel}
          </Button>
        }
        __helper={
          <span className={classes(classNames.shortcuts)}>
            or
            <Kbd keyName='Shift' iconId='icon-kbd-shift' />+
            <Kbd keyName='Return' iconId='icon-kbd-return' />
          </span>
        }
      />
    </form>
  );
};

export default Editor;
