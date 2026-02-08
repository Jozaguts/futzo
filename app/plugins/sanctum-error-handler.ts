import { notifyApiError } from '~/utils/apiToast'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('sanctum:response', (_app, ctx, logger) => {
    if (!process.client) return
    if (!(nuxtApp as any).$toast?.custom) return

    const status = ctx.response?.status
    if (!status || status < 400) return

    const meta = (ctx.options as any)?.meta ?? {}
    if (meta.toast === false) return

    const data = (ctx.response as any)?._data ?? (ctx.response as any)?.data

    try {
      notifyApiError(status, data)
    } catch (error) {
      logger.warn('Failed to render toast for API error', error)
    }
  })
})
