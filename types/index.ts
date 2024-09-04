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
