<script lang="ts" setup>
import createTeamStep from "~/components/pages/equipos/stepper/01-create-team.vue";
import createDtStep from "~/components/pages/equipos/stepper/02-create-dt.vue";
import createOwnerStep from "~/components/pages/equipos/stepper/03-create-owner.vue";

interface Props {
  step: keyof typeof steps;
}
const steps = {
  createTeam: createTeamStep,
  createDt: createDtStep,
  createOwner: createOwnerStep,
};
const props = withDefaults(defineProps<Props>(), { step: "createTeam" });
</script>
<template>
  <div class="box">
    <transition-slide
      group
      :offset="{
        enter: ['-100%', 0],
        leave: ['1%', 0],
      }"
    >
      <component :is="steps[props.step]"></component>
    </transition-slide>
  </div>
</template>
