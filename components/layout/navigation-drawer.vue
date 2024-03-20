<template>
  <v-navigation-drawer
      :permanent="!isMobile"
      v-model="drawer"
      floating
      color="background"
      elevation="0"
      :border="false"
      app>
      <template #prepend>
       <v-container>
         <v-row >
           <v-col cols="12" class="d-flex align-center py-0">
             <v-img src="/futzo/logos/horizontal/logo-12.png" :eager="true" min-width="100%"  :height="$vuetify.display.mobile ? 80 : 105"></v-img>
           </v-col>
           <v-col cols="12">
              <v-list color="white" nav>
                <v-list-item
                    density="compact"
                    v-for="link in adminLinks"
                    :key="link.title"
                    link
                    :to="link.to"
                    :disabled="link.disabled"
                    class="my-1"
                    :prepend-icon="link.icon"
                    :title="link.title"
                />
                <LinkSeparator name="Liga"></LinkSeparator>
                <v-list-item
                    density="compact"
                    v-for="link in leagueLinks"
                    :key="link.title"
                    link
                    :to="link.to"
                    :disabled="link.disabled"
                    class="my-1"
                    :prepend-icon="link.icon"
                    :title="link.title"
                >
                </v-list-item>
                <!--          ################    #########-->
                <v-list-group value="teams">
                  <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        title="Equipos"
                        prepend-icon="mdi-account-group"
                    ></v-list-item>
                  </template>
                  <v-list-item
                      variant="text"
                      density="compact"
                      v-for="link in teamLinks"
                      :key="link.title"
                      link
                      :to="link.to"
                      :disabled="link.disabled"
                      :prepend-icon="link.icon"
                      :title="link.title"
                  >
                  </v-list-item>
                </v-list-group>
                <!--       $####################     ######33    -->
              </v-list>
           </v-col>
         </v-row>
       </v-container>
      </template>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import LinkSeparator from "~/components/layout/link-separator.vue";
import {useAuthStore, useGlobalStore} from "~/store";
import {storeToRefs} from "pinia";
const { drawer, isMobile,appName } = storeToRefs(useGlobalStore())
const authStore = useAuthStore()
const adminLinks = reactive([
  { icon: 'mdi-home', title: 'Home', to: '/', disabled: false},
  { icon: 'mdi-users', title: 'Roles y Permisos', to: '/roles-permisos', disabled: authStore?.role !== 'super administrador'},
])
const leagueLinks = reactive([
  { icon: 'mdi-trophy-variant', title: 'Torneos', to: '/torneos', disabled: false},
  { icon: 'mdi-calendar', title: 'Calendario', to: '/calendario', disabled: false},
])
const teamLinks = reactive([
  { icon: 'mdi-clipboard-list-outline', title: 'Ver Equipo', to: '/equipos', disabled: false},
  { icon: 'mdi-add', title: 'Inscribir Equipo', to: '/equipos/inscribir', disabled: false},
])
</script>
