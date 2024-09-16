<script lang="ts" setup>
import Avatar from "~/components/pages/configuration/avatar.vue";
import { useAuthStore } from "~/store";
import PersonalDataCard from "~/components/pages/configuration/personal-data-card.vue";

const user = computed(() => useAuthStore().user);
const tab = ref(1);
</script>
<template>
  <v-sheet
    height="100%"
    color="white"
    class="pa-10 full-height configuration-v-sheet"
  >
    <v-card variant="text">
      <v-card-item class="mb-12">
        <template #prepend>
          <Avatar />
        </template>
        <v-card-title class="card-title ml-2"> {{ user?.name }} </v-card-title>
        <v-card-subtitle class="card-subtitle ml-2">{{
          user?.email
        }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-tabs v-model="tab">
          <v-tab :value="1"> Datos personales </v-tab>
          <v-tab :value="2"> Contraseña </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="1" :key="1">
            <personal-data-card />
          </v-tabs-window-item>
          <v-tabs-window-item :value="2" :key="2">
            <lazy-pages-configuration-password-data-card />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<style lang="sass">
@import "~/assets/scss/pages/configuration"
</style>
