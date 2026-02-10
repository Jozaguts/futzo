import {beforeEach, describe, expect, it, vi} from 'vitest'
import {createPinia, setActivePinia} from 'pinia'
import {defineComponent, h} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import {useLeaguesStore} from '~/stores/useLeaguesStore'

const fetchLeaguesMock = vi.hoisted(() => vi.fn().mockResolvedValue([]))
const getFootballTypesMock = vi.hoisted(() => vi.fn().mockResolvedValue([]))
const getLeagueLocationsMock = vi.hoisted(() => vi.fn().mockResolvedValue([]))
const getLeagueTournamentsMock = vi.hoisted(() => vi.fn().mockResolvedValue({ data: [] }))
const sanctumUser = vi.hoisted(() => ({ value: null as any }))

vi.mock('~/http/api/league', () => ({
  default: {
    fetchLeagues: fetchLeaguesMock,
    getFootballTypes: getFootballTypesMock,
    getLeagueLocations: getLeagueLocationsMock,
    getLeagueTournaments: getLeagueTournamentsMock,
  },
}))

mockNuxtImport('useSanctumUser', () => () => sanctumUser)

const MountStore = defineComponent({
  name: 'MountStore',
  setup() {
    useLeaguesStore()
    return () => h('div')
  },
})

describe('useLeaguesStore auto fetch', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    fetchLeaguesMock.mockClear()
    getFootballTypesMock.mockClear()
    sanctumUser.value = null
  })

  it('skips admin fetches for guests', async () => {
    sanctumUser.value = null

    await mountSuspended(MountStore)

    expect(fetchLeaguesMock).not.toHaveBeenCalled()
    expect(getFootballTypesMock).not.toHaveBeenCalled()
  })

  it('fetches leagues for authenticated users', async () => {
    sanctumUser.value = { email: 'admin@futzo.test' }

    await mountSuspended(MountStore)

    expect(fetchLeaguesMock).toHaveBeenCalled()
    expect(getFootballTypesMock).toHaveBeenCalled()
  })
})
