export type TextTag = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4'

export type TextType = 'default' | 'primary' | 'muted' | 'danger'

export type ButtonType = 'button' | 'submit' | 'reset'

export type ButtonStyle = 'danger' | 'default' | 'primary' | 'success' | 'disabled'

export type InputModel = string | number | null

export type InputFileModel = File | File[] | null

export type PreviewItem = {
  id: string
  file: File
  url: string
}

export type SelectType = {
  label: string
  value: string | number
}
