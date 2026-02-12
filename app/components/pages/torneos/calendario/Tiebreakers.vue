<script lang="ts" setup>
import {useAutoAnimate} from '@formkit/auto-animate/vue'
import type {Tiebreaker} from "~/models/Schedule";

const tiebreakers = defineModel<Tiebreaker[]>();
const sortedItems = computed(() => {
  return tiebreakers.value?.slice().sort((a, b) => a.priority - b.priority);
});
let draggedIndex: null | number = null;
const onDragStart = (index: number) => {
  draggedIndex = index;
};
// Función para manejar el arrastre sobre otro elemento
const onDragOver = (index: number) => {
  if (draggedIndex === null || draggedIndex === index) return;

  const draggedItem = tiebreakers.value?.splice(draggedIndex, 1)[0] as Tiebreaker;
  tiebreakers.value?.splice(index, 0, draggedItem);

  draggedIndex = index;

  updatePriorities();
};

const onDrop = () => {
  draggedIndex = null;
};
const updatePriorities = () => {
  tiebreakers.value?.forEach((item, index) => {
    item.priority = index + 1; // Prioridad comienza en 1
  });
};

const [parent] = useAutoAnimate();
</script>


<template>
  <v-list density="compact" lines="one" slim ref="parent">
    <v-list-item
        class="draggable-item futzo-rounded"
        :draggable="true"
        density="compact"
        v-for="(tiebreaker, index) in sortedItems"
        @drop="onDrop"
        @dragstart="onDragStart(index)"
        @dragover.prevent="onDragOver(index)"
        :key="index"
    >
      <v-list-item-title density="compact">
        <div class="w-100 d-flex py-1">
          <span :class=" !tiebreaker.is_active ? 'text-disabled': ''">{{ tiebreaker.rule }}</span>
          <v-spacer/>
          <v-switch
              inset
              density="compact"
              false-icon="lucide:lightbulb-off"
              true-icon="lucide:lightbulb"
              v-model="tiebreaker.is_active"
              base-color="white"
              color="white"
              class="futzo-rounded"
          >
            <template #thumb="{icon}">
              <v-icon v-if="icon" color="primary" size="14">{{ icon }}</v-icon>
            </template>
          </v-switch>
        </div>
      </v-list-item-title>
      <v-list-item-subtitle :class=" !tiebreaker.is_active ? 'text-disabled': ''" class="text-caption" tag="small">
        Prioridad: {{ tiebreaker.priority }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
<style>
.draggable-item {
  cursor: grab;
  margin: 8px 0;
  padding: 4px;
}

.draggable-item:active {
  cursor: grabbing;
}
</style>
