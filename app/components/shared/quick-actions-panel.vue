<script setup lang="ts">
type QuickActionItem = {
  id: string
  label: string
  icon?: string
  disabled?: boolean
  loading?: boolean
  testId?: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    actions: QuickActionItem[]
    primaryActionId?: string | null
    testId?: string
  }>(),
  {
    title: 'Acciones Rápidas',
    primaryActionId: null,
    testId: 'quick-actions-panel',
  }
)

const emit = defineEmits<{
  (event: 'action', actionId: string): void
}>()

const isPrimaryAction = (actionId: string) => props.primaryActionId === actionId
const primaryActions = computed(() => props.actions.filter((action) => isPrimaryAction(action.id)))
const secondaryActions = computed(() => props.actions.filter((action) => !isPrimaryAction(action.id)))
const actionTestId = (action: QuickActionItem) => action.testId || `quick-action-${action.id}`
const triggerAction = (actionId: string) => emit('action', actionId)
</script>

<template>
  <section class="quick-actions-panel panel panel--actions" :data-testid="testId">
    <div class="panel__header">
      <h2 class="panel__title">{{ title }}</h2>
    </div>
    <div class="panel__body">
      <div class="actions-grid">
        <PrimaryBtn
          v-for="action in primaryActions"
          :key="action.id"
          class="action-btn action-btn--primary"
          :text="action.label"
          :icon="action.icon || 'lucide:sparkles'"
          icon-position="right"
          :loading="Boolean(action.loading)"
          :disabled="Boolean(action.disabled)"
          :data-testid="actionTestId(action)"
          @click="triggerAction(action.id)"
        />
        <SecondaryBtn
          v-for="action in secondaryActions"
          :key="action.id"
          class="action-btn"
          :text="action.label"
          :icon="action.icon || 'lucide:circle'"
          icon-position="right"
          :loading="Boolean(action.loading)"
          :disabled="Boolean(action.disabled)"
          :data-testid="actionTestId(action)"
          @btn-click="triggerAction(action.id)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.quick-actions-panel {
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel__header {
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2f4f7;
}

.panel__title {
  font-size: 16px;
  font-weight: 600;
  color: #101828;
  margin: 0;
}

.panel__body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 12px;
  min-height: 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.action-btn {
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  height: 44px;
}

.action-btn--primary {
  color: #fff;
}

@media (width > 600px) {
  .actions-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
