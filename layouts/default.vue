<template>
 <v-app>
   <Navigation > </Navigation>
   <AppBar > </AppBar>
   <v-main>
      <v-container>
        <slot></slot>
      </v-container>
   </v-main>
   <v-footer app></v-footer>
 </v-app>
</template>

<script setup lang="ts">
import Navigation from '~/components/layout/navigation-drawer.vue'
import AppBar from  '~/components/layout/app-bar.vue'
</script>
<style>
 .v-list-item--active {
  background: linear-gradient(-72.47deg, rgb(145, 85, 253) 22.16%, rgba(145, 85, 253, 0.7) 76.47%) !important;
}
.v-list-item:hover, .v-list-item--active {
  border-radius: 25px;
}
</style>
