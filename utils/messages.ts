export const getI18nMessage = (sign: string): string => {
  return useNuxtApp().$i18n.t(sign)
}
