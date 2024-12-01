

export const getAuthHeaders = () => {
  const userStore = useUserStore()
  const headers = {Authorization: `Bearer ${userStore.user.token}`}
  
  return headers
}