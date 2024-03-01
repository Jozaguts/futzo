<script setup lang="ts">
import ViewCalendar from "~/components/pages/calendario/view-calendar.vue";
import IconsSection from "~/components/pages/calendario/icons-section.vue";
import SelectsSection from "~/components/pages/calendario/selects-section.vue";
import GenerateScheduleButton from "~/components/pages/calendario/generate-schedule-button.vue";
import {useScheduleStore} from "~/store/useScheduleStore";
import {useLeaguesStore} from "~/store/useLeaguesStore";
import {storeToRefs} from "pinia";
const {leagues} = storeToRefs(useLeaguesStore())
const tab = ref(1)
const loading = ref(false)

const theAreNotSchedules = computed(() => useScheduleStore().schedules.value?.length === 0)

onMounted(async() => {
  await useLeaguesStore().fetchLeagues()
})

</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-container fluid>
          <v-row>
            <IconsSection />
            <SelectsSection />
            <GenerateScheduleButton />
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="10">
        <v-window v-model="tab" class="w-100">
          <v-fade-transition leave-absolute :group="true">
            <v-window-item :key="1" :value="1">
              <ViewCalendar/>
            </v-window-item>
            <v-window-item :key="2" :value="2">
              <ViewCalendar />
            </v-window-item>
          </v-fade-transition>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>