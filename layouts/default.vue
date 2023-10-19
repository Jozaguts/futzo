<!--<template>-->
<!--    <v-app>-->
<!--      <v-navigation-drawer-->
<!--          :floating="true"-->
<!--          :sticky="true"-->
<!--          :absolute="false"-->
<!--          style="background: rgb(var(&#45;&#45;v-theme-background))"-->
<!--          class="layout-vertical-nav position-fixed"-->
<!--          v-model="useGlobalStore().drawer"-->
<!--          :model-value="useAuthStore().isLogged"-->
<!--      >-->
<!--        <vertical-nav>-->

<!--        </vertical-nav>-->
<!--      </v-navigation-drawer>-->
<!--      <v-app-bar-->
<!--          app-->
<!--          flat-->
<!--          class="px-6 layout-navbar"-->
<!--          style="background: transparent"-->
<!--      >-->
<!--        <template-->
<!--            v-if="mdAndDown"-->
<!--            #prepend-->
<!--        >-->
<!--          <v-app-bar-nav-icon-->
<!--              class="d-block d-lg-none me-2 ms-n3"-->
<!--              color="inherit"-->
<!--              @click="useGlobalStore().drawer = true"-->
<!--          />-->
<!--        </template>-->
<!--      </v-app-bar>-->
<!--      <v-main>-->
<!--        <v-alert-->
<!--            position="absolute"-->
<!--            width="100%"-->
<!--            :closable="true"-->
<!--            :color="useGlobalStore().computedAlert.value.color"-->
<!--            :min-height="80"-->
<!--            :model-value="!!useGlobalStore().computedAlert.value.message"-->
<!--            :title="useGlobalStore().computedAlert.value.title"-->
<!--            :type="useGlobalStore().computedAlert.value.type"-->
<!--            @click:close="useGlobalStore().resetAlert()"-->
<!--        >-->
<!--          {{useGlobalStore().computedAlert.value.message}}-->
<!--        </v-alert>-->
<!--        <slot />-->
<!--      </v-main>-->
<!--      <v-footer app v-if="useAuthStore().isLogged" >-->
<!--        <v-btn to="/legales">legales</v-btn>-->
<!--      </v-footer>-->
<!--    </v-app>-->
<!--</template>-->
<!--<script setup lang="ts">-->
<!--import {useDisplay} from "vuetify";-->
<!--const { mdAndDown } = useDisplay()-->
<!--import {useAuthStore,useGlobalStore} from "~/store";-->
<!--import VerticalNav from "~/components/VerticalNavLayout.vue";-->
<!--</script>-->
<!--<style lang="scss">-->
<!--@use "src/@layouts/styles/default-layout";-->
<!--</style>-->
<template>
  <!--    <v-app class="layout-wrapper layout-nav-type-vertical">-->
  <!--        <v-main class="layout-wrapper layout-blank">-->
  <!--            <slot />-->
  <!--        </v-main>-->
  <!--    </v-app>-->
  <DefaultLayoutWithVerticalNav>
    <slot/>
  </DefaultLayoutWithVerticalNav>
</template>
<script setup lang="ts">
import { useGlobalStore } from "~/store";
import DefaultLayoutWithVerticalNav from "~/layouts/components/defaultLayoutWithVerticalNav.vue";
</script>
<style>
.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
