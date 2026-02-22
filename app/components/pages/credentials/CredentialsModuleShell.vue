<script setup lang="ts">
import {useMediaQuery} from '@vueuse/core'
import type {CredentialPermission} from '~/types/credentials'
import {useCredentialsAccess} from '~/composables/credentials/useCredentialsAccess'

type ModuleTab = {
  key: string
  label: string
  path: string
  permission: CredentialPermission
}

const props = defineProps<{
  current: 'resumen' | 'generar' | 'disenos' | 'validacion' | 'historial'
}>()

const route = useRoute()
const router = useRouter()
const { visibleTabs } = useCredentialsAccess()
const isMobileCompact = useMediaQuery('(max-width: 599px)')

const tabs = computed<ModuleTab[]>(() => {
  const normalized = visibleTabs.value.map((item) => ({
    ...item,
    permission: item.key === 'validacion' ? 'canValidateCredentials' : 'canManageCredentials',
  }))
  return normalized as ModuleTab[]
})

const currentTabPath = computed(() => {
  const currentTab = tabs.value.find((tab) => tab.key === props.current)
  return currentTab?.path ?? tabs.value[0]?.path ?? '/credenciales'
})

const selectedTabPath = computed({
  get: () => currentTabPath.value,
  set: (path: string) => {
    if (!path || path === route.path) return
    router.push(path)
  },
})

const openTab = (path: string) => {
  if (path === route.path) return
  router.push(path)
}
</script>

<template>
  <div class="credentials-shell" data-testid="credentials-shell">
    <section class="credentials-shell__top futzo-rounded">
      <header class="credentials-shell__header">
        <div>
          <p class="credentials-shell__eyebrow">Módulo</p>
          <h1 class="credentials-shell__title">Credenciales</h1>
          <p class="credentials-shell__subtitle">Genera, administra y valida credenciales de jugadores.</p>
        </div>
      </header>
      <div class="credentials-shell__divider" aria-hidden="true" />

      <div v-if="tabs.length" class="credentials-tabs-shell" data-testid="credentials-subnav">
        <v-select
          v-if="isMobileCompact"
          v-model="selectedTabPath"
          :items="tabs"
          item-title="label"
          item-value="path"
          variant="outlined"
          density="comfortable"
          hide-details
          data-testid="credentials-subnav-dropdown"
        />
        <div v-else class="credentials-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="credentials-tabs__item"
            :class="{ 'credentials-tabs__item--active': tab.key === current }"
            :aria-pressed="tab.key === current"
            @click="openTab(tab.path)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </section>

    <section class="credentials-shell__content">
      <slot />
    </section>
  </div>
</template>

<style lang="sass" scoped>
  .credentials-shell
    display: flex
    flex-direction: column
    gap: 16px

  .credentials-shell__top
    border: 1px solid var(--futzo-border)
    background: var(--futzo-surface)
    display: flex
    flex-direction: column

  .credentials-shell__header
    padding: 16px

  .credentials-shell__eyebrow
    margin: 0
    text-transform: uppercase
    letter-spacing: .06em
    color: var(--futzo-on-surface-muted)
    font-size: 11px
    font-weight: 600

  .credentials-shell__title
    margin: 4px 0 0
    font-size: 26px
    color: var(--futzo-on-surface)

  .credentials-shell__subtitle
    margin: 6px 0 0
    color: var(--futzo-on-surface-muted)
    font-size: 14px

  .credentials-shell__divider
    width: 100%
    height: 1px
    background: #f2f4f7

  .credentials-tabs-shell
    padding: 10px

  .credentials-tabs
    display: grid
    grid-template-columns: repeat(5, minmax(0, 1fr))
    gap: 8px
    padding: 4px
    border-radius: 10px
    background: #f2f4f7

  .credentials-tabs__item
    appearance: none
    border: 0
    background: transparent
    border-radius: 8px
    font-size: 12px
    font-weight: 600
    color: var(--futzo-on-surface-muted)
    padding: 8px 10px
    cursor: pointer
    transition: .18s ease

  .credentials-tabs__item:focus-visible
    outline: 2px solid rgba(41, 112, 255, .42)
    outline-offset: 1px

  .credentials-tabs__item--active
    background: var(--futzo-surface)
    color: var(--futzo-on-surface)
    box-shadow: 0 1px 2px rgba(16, 24, 40, .08)

  .credentials-shell__content
    display: flex
    flex-direction: column
    gap: 16px
</style>
