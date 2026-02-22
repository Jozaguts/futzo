<script lang="ts" setup>
import General from '~/components/pages/torneos/calendario/stepper/01-general.vue'
import Rules from '~/components/pages/torneos/calendario/stepper/02-rules-phase.vue'
import Elimination from '~/components/pages/torneos/calendario/stepper/03-elimination-phase.vue'
import Fields from '~/components/pages/torneos/calendario/stepper/04-fields-phase.vue'

const { calendarSteps } = storeToRefs(useScheduleStore())
  const stepEntries = computed(() =>
    Object.entries(calendarSteps.value.steps).sort(([, a], [, b]) => Number(a.number) - Number(b.number))
  )
  const currentStepNumber = computed(() => calendarSteps.value.steps[calendarSteps.value.current]?.number ?? 1)
</script>

<template>
  <section class="calendar-stepper">
    <div class="calendar-stepper__header" data-testid="calendar-stepper-header">
      <div v-for="([stepKey, step], index) in stepEntries" :key="stepKey" class="calendar-stepper__item">
        <div class="calendar-stepper__dot-wrapper">
          <div
            class="calendar-stepper__dot"
            :class="{
              'calendar-stepper__dot--active': stepKey === calendarSteps.current,
              'calendar-stepper__dot--completed': step.number < currentStepNumber,
            }"
          >
            <Icon v-if="step.number < currentStepNumber" name="lucide:check" size="12" />
            <span v-else>{{ step.number }}</span>
          </div>
          <div v-if="index < stepEntries.length - 1" class="calendar-stepper__line" />
        </div>
        <span class="calendar-stepper__label">{{ step.label }}</span>
      </div>
    </div>

    <div class="calendar-stepper__content">
      <transition-slide
        group
        :offset="{
          enter: ['-100%', 0],
          leave: ['100%', 0],
        }"
      >
        <General v-if="calendarSteps.current === 'general'" :key="calendarSteps.current" />
        <Rules v-if="calendarSteps.current === 'rules'" :key="calendarSteps.current" />
        <Elimination v-if="calendarSteps.current === 'elimination'" :key="calendarSteps.current" />
        <Fields v-if="calendarSteps.current === 'fields'" :key="calendarSteps.current" />
      </transition-slide>
    </div>
  </section>
</template>

<style scoped lang="sass">
  .calendar-stepper
    display: flex
    flex-direction: column
    gap: 12px
    overflow-x: hidden

  .calendar-stepper__header
    display: grid
    grid-template-columns: repeat(4, minmax(0, 1fr))
    gap: 8px

  .calendar-stepper__item
    min-width: 0
    display: flex
    flex-direction: column
    gap: 6px

  .calendar-stepper__dot-wrapper
    display: flex
    align-items: center

  .calendar-stepper__dot
    width: 24px
    height: 24px
    border-radius: 999px
    border: 1px solid var(--futzo-border)
    color: var(--futzo-on-surface-muted)
    background: #f2f4f7
    font-size: 11px
    font-weight: 700
    display: inline-flex
    align-items: center
    justify-content: center
    flex-shrink: 0

  .calendar-stepper__dot--active
    background: #7f56d9
    border-color: #7f56d9
    color: var(--futzo-on-surface)

  .calendar-stepper__dot--completed
    background: #12b76a
    border-color: #12b76a
    color: var(--futzo-on-surface)

  .calendar-stepper__line
    flex: 1
    height: 1px
    background: var(--futzo-border-strong)
    margin-left: 6px

  .calendar-stepper__label
    font-size: 12px
    color: var(--futzo-on-surface-muted)
    font-weight: 500
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  .calendar-stepper__content
    min-width: 0

  @media (max-width: 600px)
    .calendar-stepper__header
      grid-template-columns: repeat(4, minmax(0, 1fr))
      gap: 4px

    .calendar-stepper__label
      font-size: 11px
</style>
