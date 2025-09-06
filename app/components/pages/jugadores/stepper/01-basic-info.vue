<script lang="ts" setup>
  import DragDropImage from '~/components/pages/torneos/drag-drop-image.vue'
  import useSchemas from '~/composables/useSchemas'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { dragDropImageRef } from '~/composables/useImage'

  const { isEdition, playerStoreRequest } = storeToRefs(usePlayerStore())
  const { teams, team } = storeToRefs(useTeamStore())
  const { categories } = storeToRefs(useCategoryStore())
  const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
    isEdition.value ? 'edit-player-basic-info' : 'create-player-basic-info',
    { nationality: 'Mexicana' }
  )
  const isPreRegister = computed(() => useRoute().name === 'equipos-equipo-jugadores-inscripcion')
  const updateCategory = (teamId: number) => {
    const selectedTeam = teams.value?.find((t) => t.id === teamId)
    if (!selectedTeam) return
    // Prefer single category if present; fallback to first of categories array in preregister context
    const categoryId = (selectedTeam as any)?.category?.id ?? (selectedTeam as any)?.categories?.[0]?.id
    if (categoryId) fields.category_id.fieldValue = categoryId
  }
  onMounted(() => {
    if (!isPreRegister.value) {
      useTeamStore().list()
    }
  })

  // Ensure form reflects preloaded data (e.g., preregister flow) even if it arrives after mount
  watch(
    () => playerStoreRequest.value?.basic,
    (basic) => {
      if (!basic) return
      setValues({ ...basic })
      // If category not present but team is, derive it from selected team
      if (!basic.category_id && basic.team_id) updateCategory(basic.team_id as number)
      nextTick(() => {
        if ((basic as any).image) dragDropImageRef.value?.loadImage()
      })
    },
    { immediate: true, deep: true }
  )
  onUnmounted(() => {
    resetForm()
  })
  defineExpose({
    validate,
    handleSubmit,
  })
</script>
<template>
  <v-container class="pt-0">
    <BaseInput label="Nombre(s) del jugador*" placeholder="p.ej. Cristiano" v-model="fields.name"></BaseInput>
    <BaseInput placeholder="p.ej. Ronaldo" label="Apellido(s) del jugador*" v-model="fields.last_name" />
    <BaseInput label="Fecha de nacimiento*">
      <template #input>
        <BaseCalendarInput v-model:start_date="fields.birthdate.fieldValue" :multiCalendar="false" />
        <span class="text-error ml-4 text-caption">{{ fields.birthdate.fieldPropsValue['error-messages'][0] }}</span>
      </template>
    </BaseInput>
    <BaseInput v-model="fields.nationality" label="Nacionalidad*" placeholder="p.ej. Mexicana"></BaseInput>
    <BaseInput label="Imagen del jugador">
      <template #input>
        <DragDropImage v-model="fields.image.fieldValue" />
        <span
          class="text-error text-caption"
          :class="fields.image.fieldPropsValue['error-messages'][0] ? 'ml-2' : ''"
          >{{ fields.image.fieldPropsValue['error-messages'][0] ?? '' }}</span
        >
      </template>
    </BaseInput>
    <BaseInput label="Equipo">
      <template #input>
        <v-autocomplete
          item-value="id"
          :disabled="isPreRegister"
          item-title="name"
          v-model="fields.team_id.fieldValue"
          density="compact"
          v-bind="fields.team_id.fieldPropsValue"
          :items="teams"
          @update:model-value="updateCategory"
        />
      </template>
    </BaseInput>
    <BaseInput :disabled="isPreRegister" label="Categoría">
      <template #input>
        <v-select
          item-value="id"
          item-title="name"
          v-model="fields.category_id.fieldValue"
          density="compact"
          disabled
          v-bind="fields.category_id.fieldPropsValue"
          :items="categories"
        />
      </template>
    </BaseInput>
  </v-container>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/players.sass"
  @use "~/assets/css/vue-datepicker-custom"
</style>
