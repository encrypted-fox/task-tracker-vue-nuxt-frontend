export const getI18nMessage = (sign: string) => {
  return useNuxtApp().$i18n.t(sign)
}
