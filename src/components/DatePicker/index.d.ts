export type DatePickerProps = {
  value?: string
  locale?: Intl.LocalesArgument
}

export type DatePickerEmits = {
  (e: 'update:value', value: string): void
}
