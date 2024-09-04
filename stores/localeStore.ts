export const useLocaleStore = defineStore(
  'locale',
  () => {
    const i18n = useI18n()
    const route = useRoute()
    const router = useRouter()

    const locale = useState(() => i18n.locale.value)

    const changeLocale = () => {
      if (locale.value === 'en') {
        locale.value = 'ru'
      } else {
        locale.value = 'en'
      }
      router.push({query: route.query, path: `/${locale.value}${route.path.slice(3)}`})
    }



    return { locale, changeLocale }
  },
  { persist: true }
)
