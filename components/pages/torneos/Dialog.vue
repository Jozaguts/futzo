<script setup lang="ts">
import {storeToRefs} from "pinia";
import TournamentForm from "~/components/pages/torneos/tournament-form.vue";
import {useTournamentStore} from "~/store";
const {dialog} = storeToRefs(useTournamentStore());
const reset  = () => {
  console.log('reset')
}

</script>
<template>
  <v-dialog v-model="dialog" max-width="688" @after-leave="reset">
    <v-card class="create-tournament-card bg-background" >
      <v-card-item>
        <template #prepend>
          <v-sheet border="primary thin" class="mx-auto d-flex justify-center align-center mr-2 rounded-lg" height="45" width="45" color="background" >
            <Icon name="icon-park-outline:soccer-one" size="25" color="black" border="border-lg"  />
          </v-sheet>
        </template>
        <template #title><span class="">Crear un torneo</span></template>
        <template #subtitle>Completa los detalles del torneo para agregarlo a tu liga</template>
        <template #append>
          <Icon name="icon-park-outline:close" size="20" color="grey" @click="dialog = false" />
        </template>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text >
        <TournamentForm />
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style >
.create-tournament-card > .v-card-item > .v-card-item__append {
  cursor: pointer;
  align-self: flex-start !important;
  justify-self: center !important;
  padding-inline-start: 0 !important;
  margin-top: .4rem;
}
.nuxt-icon.image-plus svg, .nuxt-icon.file-type-img svg, .nuxt-icon.trash-error svg{
  width: 2rem;
  height: 2rem;
}
.nuxt-icon.trash svg{
  width: 1rem;
  height: 1rem;
}
</style>