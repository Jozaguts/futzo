<script lang="ts" setup>
  import { Icon } from '#components'
  import type { TournamentShareAction } from '~/models/tournament'

  const props = withDefaults(defineProps<{
    loading?: boolean
    iconOnly?: boolean
    label?: string
    testId?: string
  }>(), {
    loading: false,
    iconOnly: true,
    label: 'Compartir',
    testId: 'tournament-share-menu',
  })

  const emit = defineEmits<{
    (e: 'select', action: TournamentShareAction): void
  }>()

  const selectAction = (action: TournamentShareAction) => {
    if (props.loading) return
    emit('select', action)
  }
</script>

<template>
  <v-menu location="bottom end">
    <template #activator="{ props: menuProps }">
      <v-btn
        v-bind="menuProps"
        variant="text"
        :icon="iconOnly"
        :disabled="loading"
        class="tournament-share-menu__trigger"
        :data-testid="`${testId}-trigger`"
        :aria-label="label"
      >
        <Icon name="lucide:share-2" size="18" />
        <template v-if="!iconOnly">
          <span class="tournament-share-menu__label">{{ label }}</span>
          <Icon name="lucide:chevron-down" size="16" />
        </template>
      </v-btn>
    </template>

    <v-list class="tournament-share-menu__list" density="compact" nav :data-testid="`${testId}-list`">
      <v-list-subheader>Inscripción</v-list-subheader>
      <v-list-item @click="selectAction('registration_link')">
        <template #prepend>
          <Icon name="lucide:link-2" size="16" class="mr-2" />
        </template>
        <v-list-item-title>Copiar enlace</v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectAction('registration_qr')">
        <template #prepend>
          <Icon name="lucide:qr-code" size="16" class="mr-2" />
        </template>
        <v-list-item-title>Generar QR</v-list-item-title>
      </v-list-item>
      <v-divider class="my-1" />
      <v-list-subheader>Página pública</v-list-subheader>
      <v-list-item @click="selectAction('public_link')">
        <template #prepend>
          <Icon name="lucide:link-2" size="16" class="mr-2" />
        </template>
        <v-list-item-title>Copiar enlace</v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectAction('public_qr')">
        <template #prepend>
          <Icon name="lucide:qr-code" size="16" class="mr-2" />
        </template>
        <v-list-item-title>Generar QR</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
  .tournament-share-menu__trigger {
    text-transform: none;
    letter-spacing: normal;
    min-width: 34px;
  }

  .tournament-share-menu__label {
    margin: 0 6px;
    font-size: 13px;
    font-weight: 600;
  }

  .tournament-share-menu__list {
    min-width: 220px;
  }
</style>
