<script lang="ts" setup>
import {number as yup_number, object, string} from 'yup'
import '@vuepic/vue-datepicker/dist/main.css'
import type {PlayerStoreRequest} from '~/models/Player'
import {vuetifyConfig} from '~/utils/constants'

const { playerStoreRequest, steps } = storeToRefs(usePlayerStore())
  const { positions } = storeToRefs(usePositionsStore())
  const { defineField, meta, values } = useForm<PlayerStoreRequest['details']>({
    validationSchema: toTypedSchema(
      object({
        position_id: yup_number().nullable(),
        number: yup_number().nullable(),
        height: yup_number().nullable(),
        weight: yup_number().nullable(),
        dominant_foot: string().nullable(),
        medical_notes: string().nullable(),
      })
    ),
    initialValues: playerStoreRequest.value.details,
  })
  const [position_id, position_id_props] = defineField('position_id', vuetifyConfig)
  const [number, number_props] = defineField('number', vuetifyConfig)
  const [height, height_props] = defineField('height', vuetifyConfig)
  const [weight, weight_props] = defineField('weight', vuetifyConfig)
  const [dominant_foot, dominant_foot_props] = defineField('dominant_foot', vuetifyConfig)
  const [medical_notes, medical_notes_props] = defineField('medical_notes', vuetifyConfig)

  onMounted(() => {
    steps.value.steps[steps.value.current].disable = false
  })
  watch(
    () => meta.value.valid,
    (isValid) => {
      steps.value.steps[steps.value.current].disable = !isValid
    },
    { immediate: true }
  )
  watch(
    values,
    () => {
      if (!meta.value.valid) {
        return
      }
      playerStoreRequest.value.details = { ...values }
    },
    { deep: true, immediate: true }
  )
</script>
<template>
  <v-container class="pt-0" id="player-step-2">
    <BaseInput label="Posición" placeholder="Delantero" sublabel="Opcional">
      <template #input>
        <v-select
          :items="positions"
          placeholder="p.ej. Delantero"
          outlined
          item-value="id"
          :item-props="(item) => ({ title: item.abbr, subtitle: item.name })"
          v-model="position_id"
          v-bind="position_id_props"
          density="compact"
        ></v-select>
      </template>
    </BaseInput>

    <BaseInput
      label="Jersey/Camiseta"
      v-model="number"
      sublabel="Opcional"
      :props="{ ...number_props, min: 0 }"
      type="number"
      placeholder="p.ej. 12+1"
    />

    <BaseInput
      label="Altura"
      v-model="height"
      sublabel="Opcional"
      :props="{ ...height_props, min: 0 }"
      type="number"
      placeholder="p.ej. 180"
    />

    <BaseInput
      label="Peso"
      v-model="weight"
      sublabel="Opcional"
      :props="{ ...weight_props, min: 0 }"
      type="number"
      placeholder="p.ej. 80"
    />
    <BaseInput label="Pierna dominante" sublabel="Opcional">
      <template #input>
        <v-item-group selected-class="primary" class="d-flex" v-model="dominant_foot" v-bind="dominant_foot_props">
          <v-row no-gutters>
            <v-col
              cols="6"
              v-for="item in [{ text: 'Izquierda' }, { text: 'Derecha' }]"
              :class="item.text === 'Izquierda' ? 'pr-2' : 'pl-2'"
            >
              <v-item v-slot="{ isSelected, toggle }" :value="item.text">
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
      </template>
    </BaseInput>
    <BaseInput label="Notas medicas" sublabel="Opcional">
      <template #input>
        <v-textarea
          v-model="medical_notes"
          v-bind="medical_notes_props"
          placeholder="Añade notas médicas si es necesario…"
        ></v-textarea>
      </template>
    </BaseInput>
  </v-container>
</template>
<style lang="sass">
  @use '~/assets/scss/pages/players.sass'
</style>
