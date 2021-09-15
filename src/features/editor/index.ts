export type EditorProps = {
  loading?: boolean
  disabled?: boolean
  submitLabel: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
}
