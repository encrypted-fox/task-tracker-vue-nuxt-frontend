export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = useState<string>(() => 'light')

    const changeTheme = (): void => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return { theme, changeTheme }
  },
  { persist: true }
)
