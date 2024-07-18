<script lang="ts" setup>
import { useAuthStore } from "~/store";
import PersonalDataCard from "~/components/configuration/personal-data-card.vue";

const user = computed(() => useAuthStore().user);
const tab = ref(1);
</script>
<template>
  <v-sheet height="100%" color="white" class="pa-10 full-height">
    <v-card variant="text">
      <v-card-item class="mb-12">
        <template #prepend>
          <v-avatar size="64" class="mr-4">
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-avatar>
        </template>
        <v-card-title class="card-title"> {{ user.name }} </v-card-title>
        <v-card-subtitle class="card-subtitle">{{
          user.email
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
            Lorem ipsum dolor sit amet
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<style lang="sass">
@import "~/assets/scss/pages/configuration"
</style>
