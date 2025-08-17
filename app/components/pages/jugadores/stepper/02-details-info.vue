<script lang="ts" setup>
  import useSchemas from '~/composables/useSchemas'
  import '@vuepic/vue-datepicker/dist/main.css'

  const { isEdition, playerStoreRequest } = storeToRefs(usePlayerStore())
  const { teams } = storeToRefs(useTeamStore())
  const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
    isEdition.value ? 'edit-player-details-info' : 'create-player-details-info'
  )
  const { positions } = storeToRefs(usePositionsStore())

  defineExpose({
    validate,
    handleSubmit,
  })
  const dominatedFootHandler = (value: string) => {
    fields.dominant_foot.fieldValue = value
  }
  onMounted(() => {
    if (playerStoreRequest.value.details) {
      setValues({ ...playerStoreRequest.value.details })
      if (playerStoreRequest.value.details.dominant_foot) {
        fields.dominant_foot.fieldValue = playerStoreRequest.value.details.dominant_foot
      }
    }
  })
</script>
<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Posición</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
          :items="positions"
          placeholder="p.ej. Ronaldo"
          outlined
          item-value="id"
          :item-props="(item) => ({ title: item.abbr, subtitle: item.name })"
          v-model="fields.position_id.fieldValue"
          v-bind="fields.position_id.fieldPropsValue"
          density="compact"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Jersey/Camiseta</span>
      </v-col>
      <v-col cols="12" lg="8" md="8" classs="position-relative">
        <v-text-field
          v-model="fields.number.fieldValue"
          v-bind="fields.number.fieldPropsValue"
          type="number"
          placeholder="p.ej. 12+1"
          min="1"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Altura</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. 180"
          outlined
          type="number"
          v-model="fields.height.fieldValue"
          v-bind="fields.height.fieldPropsValue"
          density="compact"
          min="0"
        >
          <template #append-inner>cm</template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Peso </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          v-model="fields.weight.fieldValue"
          v-bind="fields.weight.fieldPropsValue"
          type="number"
          min="0"
          placeholder="p.ej. 80"
        >
          <template #append-inner>kg</template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Pierna dominante</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-item-group
          selected-class="primary"
          class="d-flex"
          :model-value="fields.dominant_foot.fieldValue"
          @update:modelValue="dominatedFootHandler"
        >
          <v-row no-gutters>
            <v-col
              cols="6"
              v-for="item in [{ text: 'Izquierda' }, { text: 'Derecha' }]"
              :class="item.text === 'Izquierda' ? 'pr-2' : 'pl-2'"
            >
              <v-item v-slot="{ isSelected, selectedClass, toggle }" :value="item.text">
                <v-btn
                  variant="outlined"
                  density="compact"
                  size="x-large"
                  @click="toggle"
                  :color="isSelected ? 'primary' : 'secondary'"
                  block
                >
                  {{ item.text }}
                </v-btn>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Notas medicas</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-textarea
          v-model="fields.medical_notes.fieldValue"
          v-bind="fields.medical_notes.fieldPropsValue"
          placeholder="Añade notas médicas si es necesario…"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
  @use 'assets/scss/pages/players.sass';
</style>
