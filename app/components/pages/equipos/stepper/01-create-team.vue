<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import CategorySelectComponent from '~/components/inputs/CategoriesSelect.vue'
  import DragDropImage from '~/components/pages/torneos/drag-drop-image.vue'
  import ColorsComponent from '~/components/pages/equipos/colors-component.vue'
  import useSchemas from '~/composables/useSchemas'
  import { VPhoneInput } from 'v-phone-input'
  import { dragDropImageRef, imageForm, removeImage, saveImage } from '~/composables/useImage'
  import { usePlaceSearch } from '~//utils/googleSearch'

  let locationsFind = ref([])
  const { tournaments, tournament } = storeToRefs(useTournamentStore())
  const { teamStoreRequest, isEdition } = storeToRefs(useTeamStore())
  const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
    isEdition.value ? 'edit-team' : 'create-team'
  )
  const { search } = usePlaceSearch()
  const saveImageHandler = (image: File) => {
    saveImage(image)
    fields.image.fieldValue = image
  }
  const removeImageHandler = () => {
    removeImage()
    fields.image.fieldValue = null
    fields.image.fieldValue = null
  }
  const searchHandler = async (place: string) => {
    const response = await search(place)
    if (response) {
      locationsFind.value = response
    }
  }
  const categoryHandler = (value?: number) => {
    if (!value) {
      return
    }
    const tournament = tournaments.value.find((tournament) => tournament.id === value)
    if (!tournament) {
      return
    }
    fields.category_id.fieldValue = tournament?.category_id
  }
  onMounted(() => {
    if (teamStoreRequest.value?.team) {
      setValues({ ...teamStoreRequest.value.team })
      if (teamStoreRequest.value.team.image) {
        dragDropImageRef.value?.loadImage()
      }
    }
    if (useRoute().name === 'torneos-torneo-inscripcion') {
      setValues({
        tournament_id: tournament.value.id,
        category_id: tournament.value?.category_id,
      })
    }
  })
  onUnmounted(() => {
    resetForm()
  })
  defineExpose({
    validate,
    handleSubmit,
  })
  const isInscription = computed(() => {
    return useRoute().name === 'torneos-torneo-inscripcion'
  })
</script>
<template>
  <v-container class="container" style="min-height: 480px">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Nombre del equipo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. Equipo de verano"
          outlined
          v-model="fields.name.fieldValue"
          v-bind="fields.name.fieldPropsValue"
          density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Torneo* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
          item-title="name"
          item-value="id"
          clearable
          :items="tournaments"
          placeholder="p.ej. Clausura "
          outlined
          :disabled="isEdition || isInscription"
          v-model="fields.tournament_id.fieldValue"
          v-bind="fields.tournament_id.fieldPropsValue"
          density="compact"
          @update:model-value="categoryHandler"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Categoría* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <CategorySelectComponent v-model="fields.category_id.fieldValue" :errors="fields.category_id.fieldPropsValue" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Imagen del equipo </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <DragDropImage
          ref="dragDropImageRef"
          :image="imageForm"
          @image-dropped="saveImageHandler"
          @remove-image="removeImageHandler"
        />
        <span
          class="text-error text-caption"
          :class="fields.image.fieldPropsValue['error-messages'][0] ? 'ml-2' : ''"
          >{{ fields.image.fieldPropsValue['error-messages'][0] ?? '' }}</span
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Dirección</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-autocomplete
          v-model="fields.address.fieldValue"
          :items="locationsFind"
          outlined
          return-object
          hide-selected
          clear-on-select
          clearable
          density="compact"
          no-filter
          v-bind="fields.address.fieldPropsValue"
          @update:search="searchHandler($event)"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              two-line
              :title="item.value.structured_formatting.main_text"
              :subtitle="item.value.structured_formatting.secondary_text"
            ></v-list-item>
          </template>
          <template v-slot:selection="{ item }">
            <v-list-item>
              <v-list-item-title v-text="item.value.structured_formatting.main_text"></v-list-item-title>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Colores del equipo </span>
      </v-col>
      <v-col cols="12" lg="8" md="8" class="pt-0">
        <v-row no-gutters class="position-relative">
          <v-col cols="12">
            <ColorsComponent v-model:model-value="fields.colors.fieldValue" :errors="fields.colors.fieldPropsValue" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Contacto</span>
      </v-col>
      <v-col col="12" lg="8" md="8">
        <v-text-field
          v-model="fields.email.fieldValue"
          v-bind="fields.email.fieldPropsValue"
          placeholder="Correo electrónico"
          outlined
          :disabled="isEdition"
          class="mb-4"
          density="compact"
        ></v-text-field>
        <client-only>
          <VPhoneInput
            variant="plain"
            :singleLine="true"
            v-model="fields.phone.fieldValue"
            class="phone-input"
            :disabled="isEdition"
            display-format="international"
            example="52 1 55 1234 5678"
            validate-on="blur lazy"
            :invalidMessage="
              ({ label, example }) => {
                return `${label} debe ser un numero valido (${example}).`
              }
            "
          >
          </VPhoneInput>
          <small class="text-error">{{ fields.phone.fieldPropsValue['error-messages'][0] }}</small>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>
