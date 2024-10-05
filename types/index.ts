export interface AuthErrorMessages {
  [index: string]: boolean | undefined
  no2UpperCase: boolean
  no3LowerCase: boolean
  no2Digits: boolean
  noSpecialSign: boolean
  no8Characters: boolean
  noMatch?: boolean
}

export interface AuthUser {
  username?: string
  email?: string

  phone?: string

  firstName?: string
  middleName?: string
  lastName?: string

  avatar?: string
  description?: string

  token?: string | null
}

export interface Notification {
  id?: string
  timeout?: ReturnType<typeof setTimeout>
  message: string
  actions?: []
  type: 'text' | 'success' | 'warn' | 'danger'
}

export interface ListDataHeaderItem {
  label: string
  class: string
}

export type ListDataHeader = Array<ListDataHeaderItem>

export interface ListDataItemsRowPart {
  label?: string
  outerClass: string
  innerClass: string
  iconPrepend?: string
  iconAppend?: string
  url?: string
  img?: string
  action?: string
}

export interface ListDataItemsRow {
  id: string | number
  parts: Array<ListDataItemsRowPart>
}

export type ListDataItems = Array<ListDataItemsRow>

export interface ListDataSort {
  name?: string
  direction?: string
}

export interface ListData {
  header: ListDataHeader
  items: ListDataItems
  count: number
  sort: ListDataSort
}
