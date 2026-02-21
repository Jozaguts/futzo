import { useIntervalFn } from '@vueuse/core'
import { getCredentialsBatch, toBatchProgress } from '~/http/api/credentials'
import type { CredentialsBatch } from '~/types/credentials'

const FINAL_BATCH_STATUSES = new Set(['completed', 'failed', 'partial'])

export const useCredentialsBatchProgress = () => {
  const batch = ref<CredentialsBatch | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isRealtimeConnected = ref(false)
  const batchId = ref<number | string | null>(null)

  let realtimeCleanup: (() => void) | null = null

  const { pause, resume, isActive } = useIntervalFn(async () => {
    if (!batchId.value) return
    await refreshBatch()
  }, 2500, { immediate: false })

  const setBatch = (payload: CredentialsBatch) => {
    batch.value = toBatchProgress(payload)

    if (FINAL_BATCH_STATUSES.has(batch.value.status)) {
      pause()
      stopRealtime()
    }
  }

  const refreshBatch = async () => {
    if (!batchId.value) return
    loading.value = true
    error.value = null
    try {
      const data = await getCredentialsBatch(batchId.value)
      setBatch(data)
    } catch (err: any) {
      error.value = String(err?.response?._data?.message || err?.message || 'No se pudo consultar el progreso del lote.')
    } finally {
      loading.value = false
    }
  }

  const stopRealtime = () => {
    if (realtimeCleanup) {
      realtimeCleanup()
      realtimeCleanup = null
    }
    isRealtimeConnected.value = false
  }

  const startRealtime = () => {
    if (!import.meta.client || !batchId.value) return

    const echo = (globalThis as any)?.Echo
    const leagueId = useCookie('league_id').value

    if (!echo || !leagueId) return

    const channelName = `private-league.${leagueId}.credentials.batches.${batchId.value}`
    const channel = echo.private(channelName)

    channel.listen('.credentials.batch.progress', (eventPayload: CredentialsBatch) => {
      setBatch(eventPayload)
    })

    realtimeCleanup = () => {
      channel.stopListening('.credentials.batch.progress')
      echo.leave(channelName)
    }

    isRealtimeConnected.value = true
  }

  const start = async (id: number | string, initialBatch?: CredentialsBatch | null) => {
    batchId.value = id
    error.value = null

    if (initialBatch) {
      setBatch(initialBatch)
    }

    await refreshBatch()
    startRealtime()

    if (!FINAL_BATCH_STATUSES.has(batch.value?.status || 'queued')) {
      resume()
    }
  }

  const stop = () => {
    pause()
    stopRealtime()
  }

  onBeforeUnmount(() => {
    stop()
  })

  return {
    batch,
    loading,
    error,
    isActive,
    isRealtimeConnected,
    start,
    stop,
    refreshBatch,
  }
}
