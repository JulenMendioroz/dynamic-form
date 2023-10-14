import { useId } from "react"

export type NumberInputProps = {
  label: string
  name?: string
  required?: boolean
  value: number | null
  error?: string
  onChange?: (newValue: number | null) => void
  onBlur?: () => void
}

export default function NumberInput(props: NumberInputProps) {
  const { value, name, label, required, error, onChange, onBlur } = props
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        name={name}
        id={id}
        value={value ?? ""}
        required={required}
        onBlur={onBlur}
        onChange={(event) => {
          const { valueAsNumber } = event.target
          const nextValue = Number.isInteger(valueAsNumber)
            ? valueAsNumber
            : null
          onChange?.(nextValue)
        }}
      />
      {error ? <p>{error}</p> : null}
    </div>
  )
}
