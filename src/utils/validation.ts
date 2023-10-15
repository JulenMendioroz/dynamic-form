import type { ChoiceField, FieldValue, TextField } from "../models/Field"

export type FieldSchema = (value: FieldValue) => string | undefined

export const isTextValue = (value: FieldValue): value is string | undefined =>
  value === undefined || typeof value === "string"

export const isNumberValue = (value: FieldValue): value is number | null =>
  typeof value === "number" || value === null

export const isChoiceValue = (value: FieldValue): value is string[] =>
  Array.isArray(value) &&
  (value.length === 0 || value.every((option) => typeof option === "string"))

export const createTextFieldSchema = (
  field: Pick<TextField, "displayName" | "maxCharacters" | "required">
): FieldSchema => {
  const { displayName, maxCharacters = Infinity, required } = field

  return (value) => {
    if (!isTextValue(value)) return `${displayName} debe ser de tipo texto`
    const isUndefined = value === undefined
    const isEmpty = isUndefined || value.trim() === ""
    if (required && isEmpty) {
      return `${displayName} es requerido`
    }
    if (isUndefined) return
    if (value.length > maxCharacters)
      return `${displayName} no debe superar los ${maxCharacters} caracteres`
  }
}

export const createChoiceFieldSchema = (
  field: Pick<ChoiceField, "choices" | "displayName" | "required">
): FieldSchema => {
  const { displayName, required, choices } = field
  const choicesSet = new Set(choices)
  return (value) => {
    if (!isChoiceValue(value)) throw new Error("Invalid Choice Value")
    if (required && value.length === 0) return `${displayName} es requerido`
    const [option] = value
    if (!choicesSet.has(option))
      return `La opción seleccionada para ${displayName} no es válida`
  }
}
