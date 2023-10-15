import type { Field } from "../../../models/Field"
import {
  type FieldSchema,
  createChoiceFieldSchema,
  createTextFieldSchema,
} from "../../../utils/validation"
import type { FormErrors, FormState } from "./Form"
export type FormSchema = Record<string, FieldSchema>

export const createNewFormState = (fields: Field[]) => {
  return fields.reduce<FormState>((acc, { internalName, defaultValue }) => {
    acc[internalName] = defaultValue
    return acc
  }, {})
}

export const createFormSchema = (fields: Field[]) => {
  const formSchema = fields.reduce<FormSchema>((acc, field) => {
    if (field.type === "Text") {
      acc[field.internalName] = createTextFieldSchema(field)
    } else if (field.type === "Choice") {
      acc[field.internalName] = createChoiceFieldSchema(field)
    } else {
      acc[field.internalName] = () => undefined
    }
    return acc
  }, {})

  return formSchema
}

export const validateForm = (formSchema: FormSchema, formState: FormState) => {
  const formErrors: FormErrors = {}
  Object.keys(formState).forEach((key) => {
    const fieldSchema = formSchema[key]
    formErrors[key] = fieldSchema(formState[key])
  })
  return formErrors
}

export const formHasErrors = (formErrors: FormErrors) => {
  return Object.values(formErrors).some(
    (value) => value === undefined || value === ""
  )
}
