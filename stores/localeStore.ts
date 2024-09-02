export const useLocaleStore = defineStore(
  'locale',
  () => {
    const i18n = useI18n()

    const locale = useState(() => i18n.locale)

    const changeLocale = () => {
      if (locale.value === 'en') {
        locale.value = 'ru'
      } else {
        locale.value = 'en'
      }
      i18n.setLocale(locale.value)
    }

    watch(() => i18n.getLocaleCookie(), (newVal, oldVal) => {
      if (import.meta.client) {
        if (newVal && newVal !== oldVal) {
          locale.value = newVal
        }
      }
    })

    return { locale, changeLocale }
  },
  { persist: true }
)