import { useId } from "react"

type ChoiceSelectProps = {
  label: string
  name?: string
  required?: boolean
  value?: string[]
  error?: string
  options: { key: string; text: string }[]
  onChange?: (newValue?: string[]) => void
  onBlur?: () => void
}

export default function ChoiceSelect(props: ChoiceSelectProps) {
  const { value, name, label, required, error, options, onChange, onBlur } =
    props

  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        name={name}
        id={id}
        value={value?.[0]}
        required={required}
        onBlur={onBlur}
        onChange={(event) => {
          const { value } = event.target
          const nextValue = value === "" ? [] : [value]
          onChange?.(nextValue)
        }}
      >
        <option value="">Select an option</option>
        {options.map(({ key, text }) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
      {error ? <p>{error}</p> : null}
    </div>
  )
}
