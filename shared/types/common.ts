export type TextTag = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4'

export type TextType = 'default' | 'primary' | 'muted' | 'danger'

export type ButtonType = 'button' | 'submit' | 'reset'

export type ButtonStyle = 'danger' | 'default' | 'primary' | 'success' | 'disabled'

export type InputModel = string | number | null | undefined

export type InputFileModel = (File | string)[] | null

export type PreviewItem = {
  id: string
  name: string
  url: string
  size?: number
  kind: 'file' | 'saved'
  file?: File
}

export type SelectType = {
  label: string
  value: string | number
}

export type UploadedImage = {
  key: string
  size: number
  contentType: string
}
