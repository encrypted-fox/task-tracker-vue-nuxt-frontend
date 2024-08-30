import { defineStore } from '#imports'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = useState(() => 'light')

    const changeTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return { theme, changeTheme }
  },
  { persist: true }
)
