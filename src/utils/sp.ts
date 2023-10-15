type Term = { key: string; name: string }

export const spFormatters = {
  Lookup: (internalName: string, value: number[]) =>
    [`${internalName}Id`, value[0]] as const,

  LookupMulti: (internalName: string, value: number[]) =>
    [`${internalName}Id`, value] as const,

  TaxonomyFieldType: (internalName: string, value: Term[]) =>
    [
      internalName,
      {
        __metadata: { type: "SP.Taxonomy.TaxonomyFieldValue" },
        Label: value[0].name,
        TermGuid: value[0].key,
        WssId: "-1",
      },
    ] as const,

  TaxonomyFieldTypeMulti: (internalName: string, value: Term[]) =>
    [
      internalName,
      value.map((term) => `-1#;${term.name}|${term.key};`).join("#"),
    ] as const,

  User: (internalName: string, value: number) =>
    [`${internalName}Id`, value] as const,

  UserMulti: (internalName: string, value: number[]) =>
    [`${internalName}Id`, value] as const,

  Choice: (internalName: string, value: string) =>
    [internalName, value] as const,

  MultiChoice: (internalName: string, value: string[]) =>
    [internalName, value] as const,

  Location: (internalName: string, value: unknown) =>
    [internalName, JSON.stringify(value)] as const,

  Default: (internalName: string, value: unknown) =>
    [internalName, value] as const,
}
