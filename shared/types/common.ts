export type TextTag = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4'

export type TextType = 'default' | 'primary' | 'muted' | 'danger'

export type ButtonType = 'button' | 'submit' | 'reset'

export type ButtonStyle = 'danger' | 'default' | 'primary' | 'success' | 'disabled'

export type InputModel = string | number | null | undefined

export type InputFileModel = (File | string)[] | null

export type SortingStatus = 'all' | 'draft' | 'listed' | 'sold'

export type SortingType = 'all' | 'expensive' | 'cheap' | 'new' | 'old' | 'az' | 'za'

export type SortingDeliveryType =
  | 'all'
  | 'expensive'
  | 'cheap'
  | 'heavy'
  | 'light'
  | 'new'
  | 'old'
  | 'az'
  | 'za'

export type PreviewItem = {
  id: string
  name: string
  url: string
  size?: number
  kind: 'file' | 'saved'
  file?: File
}

export type DefaultOptionType = {
  label: string
  value: string | number
}

export type UploadedImage = {
  key: string
  size: number
  contentType: string
}

export type Sorting = {
  status: SortingStatus
  type: SortingType
}

export type CurrencyCode = 'UAH' | 'EUR'
