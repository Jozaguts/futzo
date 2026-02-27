<script setup lang="ts">
import type {TournamentShareAction} from '~/models/tournament'
import TournamentShareMenu from '~/components/pages/torneos/tournament-share-menu.vue'
type SectionItem = {
  value: string
  label: string
}

const props = defineProps<{
  tournamentName: string
  tournamentMeta: string
  statusLabel: { text: string; color: string }
  mobile: boolean | { value?: boolean }
  shareLoading: boolean
  sections: SectionItem[]
  activeTab: string
}>()

const emit = defineEmits<{
  (event: 'share', action: TournamentShareAction): void
  (event: 'go-public'): void
  (event: 'go-calendar'): void
  (event: 'update:activeTab', value: string): void
}>()

const openPublic = () => emit('go-public')
const openCalendar = () => emit('go-calendar')
const share = (action: TournamentShareAction) => emit('share', action)
const setActiveTab = (value: string) => emit('update:activeTab', value)
const isMobile = computed(() => (typeof props.mobile === 'boolean' ? props.mobile : Boolean(props.mobile?.value)))
</script>

<template>
  <section class="tournament-page__top-shell futzo-rounded" data-testid="tournament-page-top-shell">
    <header class="tournament-page__intro" data-testid="tournament-page-intro">
      <div class="tournament-page__header">
        <div class="tournament-page__title">
          <p class="tournament-page__eyebrow">Gestión de torneos</p>
          <div class="title-row">
            <h1 class="tournament-page__headline">{{ tournamentName }}</h1>
            <v-chip size="small" :color="statusLabel.color" variant="tonal">{{ statusLabel.text }}</v-chip>
          </div>
          <p class="tournament-meta">{{ tournamentMeta || 'Control general del torneo, calendario y disciplina.' }}</p>
        </div>
        <div class="tournament-page__actions">
          <TournamentShareMenu
            label="Compartir"
            test-id="tournament-header-share"
            :icon-only="isMobile"
            :loading="shareLoading"
            @select="share"
          />
          <v-tooltip text="Vista pública" location="bottom">
            <template #activator="{ props: tooltipProps }">
              <v-btn
                icon
                variant="text"
                v-bind="tooltipProps"
                class="tournament-page__action-btn"
                aria-label="Abrir vista pública del torneo"
                @click="openPublic"
              >
                <Icon name="lucide:eye" size="18" />
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Calendario" location="bottom">
            <template #activator="{ props: tooltipProps }">
              <v-btn
                icon
                variant="text"
                v-bind="tooltipProps"
                class="tournament-page__action-btn"
                aria-label="Abrir calendario del torneo"
                @click="openCalendar"
              >
                <Icon name="lucide:calendar-days" size="18" />
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </div>
    </header>
    <div class="tournament-page__top-divider" aria-hidden="true"></div>
    <div class="tournament-sections-tabs-shell">
      <div class="tournament-sections-tabs" data-testid="tournament-sections">
        <button
          v-for="section in props.sections"
          :key="section.value"
          type="button"
          class="tournament-sections-tabs__item"
          :class="{ 'tournament-sections-tabs__item--active': props.activeTab === section.value }"
          :aria-pressed="props.activeTab === section.value"
          @click="setActiveTab(section.value)"
        >
          {{ section.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.tournament-page__top-shell
  display: flex
  flex-direction: column
  gap: 12px
  padding: 14px

.tournament-page__intro
  display: flex
  flex-direction: column
  gap: 8px

.tournament-page__header
  display: flex
  flex-direction: column
  gap: 12px

.tournament-page__title
  min-width: 0

.title-row
  display: flex
  align-items: center
  gap: 10px
  flex-wrap: wrap

.tournament-page__eyebrow
  margin: 0
  font-size: 12px
  font-weight: 600
  letter-spacing: .03em
  text-transform: uppercase
  color: var(--futzo-on-surface-muted)

.tournament-page__headline
  margin: 0
  font-size: 22px
  line-height: 1.2
  font-weight: 700
  color: var(--futzo-on-surface)

.tournament-meta
  margin: 4px 0 0
  color: var(--futzo-on-surface-muted)
  font-size: 13px

.tournament-page__actions
  display: flex
  align-items: center
  flex-wrap: wrap
  gap: 6px
  align-self: flex-start

.tournament-page__action-btn
  width: 34px
  height: 34px
  min-width: 34px

.tournament-page__top-divider
  width: 100%
  height: 1px
  background: #f2f4f7

.tournament-sections-tabs-shell
  border: 1px solid var(--futzo-border)
  border-radius: 12px
  background: var(--futzo-surface)
  padding: 8px

.tournament-sections-tabs
  display: grid
  grid-template-columns: repeat(3, minmax(0, 1fr))
  gap: 8px
  padding: 4px
  border-radius: 10px
  background: #f2f4f7

.tournament-sections-tabs__item
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

.tournament-sections-tabs__item:focus-visible
  outline: 2px solid rgba(41, 112, 255, 0.42)
  outline-offset: 1px

.tournament-sections-tabs__item--active
  background: var(--futzo-surface)
  color: var(--futzo-on-surface)
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08)

@media (min-width: 700px)
  .tournament-page__header
    flex-direction: row
    justify-content: space-between
    align-items: flex-start

  .tournament-page__actions
    align-self: auto

  .tournament-page__headline
    font-size: 24px

@media (min-width: 900px)
  .tournament-page__headline
    font-size: 26px
</style>
