export default defineNuxtRouteMiddleware((to, from) => {

  const userStore = useUserStore()

  if (!userStore.user.accessToken) {
    
    return navigateTo('/auth?type="login"')
  }
})