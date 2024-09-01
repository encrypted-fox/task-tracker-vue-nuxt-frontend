export const passwordErrors = [
  { name: 'no2UpperCase', label: 'Нужно 2 или больше заглавные буквы' },
  { name: 'no3LowerCase', label: 'Нужно 3 или больше строчные буквы' },
  { name: 'no2Digits', label: 'Нужно 2 или больше цифры' },
  { name: 'noSpecialSign', label: 'Нужен специальный символ' },
  { name: 'no8Characters', label: 'Нужно 8 или больше символов' },
  { name: 'noMatch', label: 'Пароли не совпадают' },
]

export const loginError = 'Логин должен содержать минимум 3 символа'
export const emailError = 'Неправильный формат электронной почты'

export const loginSuccessMessage = 'Вход выполнен успешно!'
export const loginErrorMessage = 'Во время входа произошла ошибка!'

export const registerSuccessMessage = 'Регистрация выполнена успешно!'
export const registerErrorMessage = 'Во время регистрации произошла ошибка!'

export const recoverySuccessMessage =
  'Восстановление выполнено успешно! Проверьте почту'
export const recoveryErrorMessage = 'Во время восстановления произошла ошибка!'
export const ordinaryErrorMessage = 'Произошла ошибка!'

export default {
  passwordErrors,
  loginError,
  emailError,
  loginSuccessMessage,
  loginErrorMessage,
  registerSuccessMessage,
  registerErrorMessage,
  recoverySuccessMessage,
  recoveryErrorMessage,
  ordinaryErrorMessage,
}
