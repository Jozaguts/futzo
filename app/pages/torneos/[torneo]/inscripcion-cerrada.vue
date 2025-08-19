<script setup lang="ts">
  definePageMeta({
    layout: 'blank',
    sanctum: {
      excluded: true,
    },
  })
</script>

<template>
  <v-container>
    <v-row>
      <v-col offset="3"><v-img src="/futzo/logos/horizontal/logo-12.png" width="200"> </v-img> </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-empty-state
          image="/junior-soccer.svg"
          headline="Registro no disponible"
          text="Lamentablemente este torneo ya alcanzó el número máximo de equipos permitidos o el registro ha sido deshabilitado por el organizador."
          title="No puedes inscribirte en este momento"
          action-text="Volver a inicio"
          href="https://futzo.io"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass"></style>
