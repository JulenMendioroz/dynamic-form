import React, { useState } from "react"
import type { Field, FieldValue } from "../../../models/Field"
import {
  type FormSchema,
  createFormSchema,
  createNewFormState,
  formHasErrors,
  validateForm,
} from "./utils"
import { Input } from "../Input"

const defaultFields: Field[] = [
  {
    type: "Text",
    internalName: "name",
    displayName: "Name",
    defaultValue: "Jane",
    required: true,
  },
  {
    type: "Text",
    internalName: "last",
    displayName: "Last name",
    defaultValue: "Doe",
    required: true,
  },
  {
    type: "Number",
    internalName: "age",
    displayName: "Age",
    defaultValue: 32,
    minimum: 18,
  },
  {
    type: "Choice",
    internalName: "gender",
    displayName: "Gender",
    choices: ["M", "F", "Other"],
    defaultValue: [],
    required: true,
  },
]
const defaultFormState = createNewFormState(defaultFields)
const defaultFormSchema = createFormSchema(defaultFields)
const defaultFormErrors = validateForm(defaultFormSchema, defaultFormState)

export type FormState = Record<string, FieldValue>
export type FormErrors = Record<string, string | undefined>

type FormProps = {
  initialState?: FormState
  initialErrors?: FormErrors
  fields?: Field[]
  schema?: FormSchema
  onSubmit: (form: FormState) => void
  onCancel?: () => void
}

function Form({
  initialState = defaultFormState,
  initialErrors = defaultFormErrors,
  fields = defaultFields,
  schema = defaultFormSchema,
  onSubmit,
  onCancel,
}: FormProps) {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>(initialErrors)

  const handleChange = (key: string) => (value: FieldValue) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleBlur = (name: string) => () => {
    const fieldSchema = schema[name]
    const error = fieldSchema(form[name])
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm(schema, form)
    setErrors(nextErrors)
    if (formHasErrors(nextErrors)) return
    console.clear()
    onSubmit?.(form)
  }

  const handleReset = () => {
    setForm(initialState)
    setErrors(initialErrors)
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      style={{ margin: "auto" }}
      noValidate
    >
      <div>
        {fields.map((field) => {
          const { internalName } = field
          const value = form[internalName]
          const error = errors[internalName]
          return (
            <Input
              key={internalName}
              {...field}
              value={value}
              error={error}
              onChange={handleChange(internalName)}
              onBlur={handleBlur(internalName)}
            />
          )
        })}
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "flex-end",
          marginBlockStart: "1rem",
        }}
      >
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="reset">Reset</button>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}

export default Form
