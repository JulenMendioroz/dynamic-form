import type { Field, FieldValue } from "../../../models/Field"
import { isChoiceValue, isNumberValue, isTextValue } from "../../../utils/validation"
import { ChoiceSelect } from "../ChoiceSelect"
import { NumberInput } from "../NumberInput"
import { TextInput } from "../TextInput"

type InputProps = Field & {
  value: FieldValue
  error?: string
  onChange: (newValue: FieldValue) => void
  onBlur: () => void
}

export default function Input(props: InputProps) {
  const {
    internalName,
    displayName,
    defaultValue,
    type,
    value,
    required,
    error,
    onChange,
    onBlur,
  } = props

  switch (type) {
    case "Text":
      return (
        <TextInput
          label={displayName}
          name={internalName}
          required={required}
          error={error}
          value={isTextValue(value) ? value : defaultValue}
          onChange={onChange}
          onBlur={onBlur}
        />
      )
    case "Number":
      return (
        <NumberInput
          label={displayName}
          name={internalName}
          required={required}
          error={error}
          value={isNumberValue(value) ? value : defaultValue}
          onChange={onChange}
          onBlur={onBlur}
        />
      )
    case "Choice":
      return (
        <ChoiceSelect
          label={displayName}
          name={internalName}
          required={required}
          error={error}
          options={props.choices.map((choice) => ({
            key: choice,
            text: choice,
          }))}
          value={isChoiceValue(value) ? value : defaultValue}
          onChange={onChange}
          onBlur={onBlur}
        />
      )
    default:
      return null
  }
}
