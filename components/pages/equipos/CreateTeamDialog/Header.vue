<script lang="ts" setup>
  import { useTeamStore } from '~/store'

  const { dialog, steps, isEdition } = storeToRefs(useTeamStore())
  const page = useRoute()
  const isInscriptionPage = computed(() => page.name === 'torneos-torneo-inscripcion')
  const title = computed(() => {
    switch (steps.value.current) {
      case 'createTeam':
        return isEdition.value
          ? `${isInscriptionPage.value ? 'Editar' : 'Editar'} equipo`
          : `${isInscriptionPage.value ? 'Pre inscribir' : 'Crear'} equipo`
      case 'createDt':
        return isEdition.value
          ? `${isInscriptionPage.value ? 'Editar' : 'Editar'} DT`
          : `${isInscriptionPage.value ? 'Pre inscribir' : 'Crear'} DT`
      case 'createOwner':
        return isEdition.value
          ? `${isInscriptionPage.value ? 'Editar' : 'Editar'} dueño`
          : `${isInscriptionPage.value ? 'Pre inscribir' : 'Crear'} dueño`
    }
  })
  const subtitle = computed(() => {
    switch (steps.value.current) {
      case 'createTeam':
        return isEdition.value ? 'Modifica los detalles del equipo.' : 'Completa los detalles del equipo.'
      case 'createDt':
        return isEdition.value ? 'Modifica los detalles del DT.' : 'Completa los detalles del DT.'
      case 'createOwner':
        return isEdition.value ? 'Modifica los detalles del dueño.' : 'Completa los detalles del dueño.'
    }
  })
</script>
<template>
  <v-card-item>
    <template #prepend>
      <v-sheet
        border="primary thin"
        class="mx-auto d-flex justify-center align-center mr-2 rounded-lg"
        height="45"
        width="45"
      >
        <Icon name="fluent:people-team-20-regular"></Icon>
      </v-sheet>
    </template>
    <template #title
      ><span class="">{{ title }}</span></template
    >
    <template #subtitle>{{ subtitle }}</template>
    <template #append>
      <Icon name="futzo-icon:x-dialog" class="cursor-pointer" @click="dialog = false" />
    </template>
  </v-card-item>
  <v-divider></v-divider>
</template>
