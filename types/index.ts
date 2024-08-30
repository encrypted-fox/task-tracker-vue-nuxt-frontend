export interface AuthErrorMessages {
  [index: string]: boolean | undefined
  no2UpperCase: boolean
  no3LowerCase: boolean
  no2Digits: boolean
  noSpecialSign: boolean
  no8Characters: boolean
  noMatch?: boolean
}
