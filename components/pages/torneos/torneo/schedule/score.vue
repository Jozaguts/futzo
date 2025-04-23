<script setup lang="ts">
import type {Match} from "~/models/Schedule";

defineProps({
  roundId: {
    type: Number,
    required: true,
  },
  matchId: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  isEditable: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(['update:match'])

</script>

<template>
  <div class="result result-container">
    <transition-fade mode="out-in" :easing="{
        enter: 'cubic-bezier(0.6, 0, 0.4, 2)',
        leave: 'ease-out'
      }">
      <v-text-field
          v-if="isEditable"
          density="compact"
          variant="outlined"
          :value="value"
      >
        <template #append>
          <div class="d-flex flex-column">
            <v-btn @click="emits('update:match','up', matchId, type,roundId)" class="mb-1" color="secondary" size="small" height="20" width="20" icon :rounded="false"
                   density="compact">+
            </v-btn>
            <v-btn @click="emits('update:match','down', matchId, type, roundId)" class="mb-1" color="secondary" size="small" height="20" width="20" icon :rounded="false"
                   density="compact"> -
            </v-btn>
          </div>
        </template>
      </v-text-field>
      <div v-else class="result">{{ value }}</div>
    </transition-fade>

  </div>

</template>
<style>
.result-container {
  max-width: 120px;
  margin: 6px 0;
}
</style>
