import { useId } from "react"

export type TextInputProps = {
  label: string
  name?: string
  required?: boolean
  value?: string
  error?: string
  onChange?: (newValue?: string) => void
  onBlur?: () => void
}

export default function TextInput(props: TextInputProps) {
  const { value, name, label, required, error, onChange, onBlur } = props
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        name={name}
        id={id}
        value={value}
        required={required}
        onBlur={onBlur}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error ? <p>{error}</p> : null}
    </div>
  )
}
