import { FC, useRef } from "react"
import { Button, Icon, Input } from "@/components"

export type EditorProps = {
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
}

const Editor: FC<EditorProps> = props => {
  const { onChange, onSubmit } = props

  const inputRef = useRef<HTMLInputElement>()

  const handleChange = (event: React.FormEvent) => {
    event.preventDefault()

    if (onChange instanceof Function) {
      onChange(inputRef.current.value)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (onSubmit instanceof Function) {
      onSubmit(inputRef.current.value)
    }
  }

  return (
    <Input
      ref={inputRef}
      label='Add a comment'
      onChange={handleChange}
      placeholder='Write something nice...'
      __start={<Icon iconId='icon-chat' />}
      __end={
        <Button onClick={handleSubmit} color='primary' size='small'>
          Reply
        </Button>
      }
    />
  )
}

export default Editor
