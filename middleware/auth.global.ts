export default defineNuxtRouteMiddleware((to, from) => {
  const localePath = useLocalePath()
  const userStore = useUserStore()
  
  if (userStore.user.token) {
    if (to.path.includes('auth')) return navigateTo({path: localePath('tasks')})
  } else if (!userStore.user.token && !to.path.includes('auth')) {
    return navigateTo({path: localePath('auth'), query: {type: 'login'}})
  }
})
