import type { AuthUser } from '~/types'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = useState<AuthUser>(() => ({
      accessToken: '1',
    }))

    const changeUser = (newUser: AuthUser) => {
      user.value = newUser
    }

    return { user, changeUser }
  },
  { persist: true }
)
