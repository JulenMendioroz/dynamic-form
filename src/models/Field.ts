type BaseField = {
  displayName: string
  internalName: string
  required?: boolean
}

export type TextField = BaseField & {
  type: "Text"
  defaultValue: string | undefined
  maxCharacters?: number
}

export type NoteField = BaseField & {
  type: "Note"
  defaultValue: string | undefined
  richText?: boolean
}

export type NumberField = BaseField & {
  type: "Number"
  defaultValue: number | null
  minimum?: number
  maximum?: number
}

export type ChoiceField = BaseField & {
  type: "Choice"
  choices: string[]
  defaultValue: string[]
}

export type MultiChoiceField = BaseField & {
  type: "MultiChoice"
  choices: string[]
  defaultValue: string[]
}

export type Lookup = BaseField & {
  type: "Lookup"
  options: { id: number; name: string }[]
  defaultValue: number[]
  lookupList: string
  lookupField: string
}

export type LookupMulti = BaseField & {
  type: "LookupMulti"
  options: { id: number; name: string }[]
  defaultValue: number[]
  lookupList: string
  lookupField: string
}

export type DateTimeField = BaseField & {
  type: "DateTime"
  defaultValue: Date | null
}

export type BooleanField = BaseField & {
  type: "Boolean"
  defaultValue: boolean
}

export type Field =
  | TextField
  | NoteField
  | NumberField
  | ChoiceField
  | MultiChoiceField
  | DateTimeField
  | Lookup
  | LookupMulti

export type FieldValue = Field["defaultValue"]
