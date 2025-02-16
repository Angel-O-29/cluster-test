import { useAuthStore } from '~/stores/useAuth'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const userStore = useAuthStore(<any>nuxtApp.$pinia)

    // Carga los datos del usuario en el store de Pinia
    await userStore.refreshSession()
  }
})
