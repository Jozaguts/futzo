<script lang="ts" setup>
import General from "~/components/pages/torneos/calendario/stepper/01-general.vue";
import Regular from "~/components/pages/torneos/calendario/stepper/02-regular-phase.vue";
import Elimination from "~/components/pages/torneos/calendario/stepper/03-elimination-phase.vue";
import Fields from "~/components/pages/torneos/calendario/stepper/04-fields-phase.vue";
import IndicatorStep from "~/components/shared/IndicatorStep.vue";
import {useScheduleStore} from "~/store";

type StepRef = { handleSubmit: Function, isValid: boolean, validate: Function };
const {
  calendarSteps,
} = storeToRefs(useScheduleStore());
const stepRef = defineModel<StepRef>("stepRef");
const hasValidForm = () => stepRef.value?.isValid;
const validate = async () => await stepRef.value.validate()
defineExpose({
  hasValidForm,
  validate
});
</script>
<template>
  <v-container class="pa-0">
    <v-row>
      <v-col>
        <IndicatorStep :form-steps="calendarSteps"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <transition-slide
            group
            :offset="{
            enter: ['-100%', 0],
            leave: ['100%', 0],
          }"
        >
          <General
              ref="stepRef"
              v-if="calendarSteps.current === 'general'"
              :key="calendarSteps.current"
          />
          <Regular
              ref="stepRef"
              v-if="calendarSteps.current === 'regular'"
              :key="calendarSteps.current"
          />
          <Elimination
              ref="stepRef"
              v-if="calendarSteps.current === 'elimination'"
              :key="calendarSteps.current"
          />
          <Fields
              ref="stepRef"
              v-if="calendarSteps.current === 'fields'"
              :key="calendarSteps.current"
          />
        </transition-slide>
      </v-col>
    </v-row>
  </v-container>
</template>
