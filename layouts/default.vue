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
