import type { AuthUser } from '~/types'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = useState<AuthUser>(() => ({ token: null }))

    const changeUser = (newUser: AuthUser): void => {
      user.value = newUser
    }

    const exit = (): void => {
      user.value = { token: null }
    }

    return { user, changeUser, exit }
  },
  { persist: true }
)
