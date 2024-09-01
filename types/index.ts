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
  accessToken: string | null
  profilePicture?: string
}

export interface Notification {
  id?: string
  timeout?: ReturnType<typeof setTimeout>
  message: string
  actions?: []
  type: 'text' | 'success' | 'warn' | 'danger'
}
