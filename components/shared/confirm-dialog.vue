<script lang="ts" setup>
const model = defineModel('model', {type: Boolean, default: false})
const {title} = defineProps({
  title: {type: String, default: '¿Estás seguro que quieres eliminar esta ubicación?'},
})
const emits = defineEmits(['action-confirmed'])
</script>
<template>
  <v-dialog
      width="100%"
      max-width="544"
      v-model="model"
  >
    <v-card class="futzo-rounded">
      <v-card-item>
        <v-card-title>
          <span class="title">{{ title }}</span>
        </v-card-title>
        <v-card-subtitle>
          <span class="subtitle">  Esta acción no se puede deshacer</span>
        </v-card-subtitle>
      </v-card-item>


      <v-card-actions>
        <div class="d-flex  align-center w-100">
          <v-btn @click="() => emits('action-confirmed')" class="cancel-btn" color="rgba(52, 64, 84, 1)">Eliminar</v-btn>
          <v-btn @click="() => model = false" variant="elevated" class="confirm-btn" border="sm" color="rgba(232, 69, 74, 1)">Eliminar
            definitivamente
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
<style scoped lang="sass">
.title
  color: #101828
  font-size: 24px
  font-weight: 600
  line-height: 32px
  word-wrap: break-word
  white-space: normal
  max-width: 100%

.subtitle
  color: #475467
  font-weight: 400
  font-size: 14px
  line-height: 20px

.confirm-btn, .cancel-btn
  padding: 10px 16px
  width: calc(50% - 24px)
  margin: 0 12px
  font-weight: 600

.cancel-btn
  color: rgba(52, 64, 84, 1)
  border-radius: 8px
  border: 1px solid rgba(208, 213, 221, 1)
</style>
