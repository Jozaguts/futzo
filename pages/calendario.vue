<script setup lang="ts">
import ViewCalendar from "~/components/pages/calendario/view-calendar.vue";
const tab = ref(1)
const test = () => {
  console.log('test')
}
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="tab">
          <v-tab :value="1">
            Torneo 1
          </v-tab>
          <v-tab :value="2">
            Torneo 2
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-window v-model="tab" class="w-100" >
        <v-fade-transition leave-absolute :group="true">
          <v-window-item :key="1" :value="1">
            <ViewCalendar />
          </v-window-item>
          <v-window-item :key="2" :value="2">
            <ViewCalendar />
          </v-window-item>
        </v-fade-transition>
      </v-window>
    </v-row>
  </v-container>
</template>