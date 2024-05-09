<template>
  <v-app-bar color="background" density="comfortable" :border="false" elevation="0" app>
<!--    <v-app-bar-nav-icon @click.stop="rail = !rail"></v-app-bar-nav-icon>-->
    <v-container fluid>
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn icon="mdi-bell"  color="on-background"></v-btn>
          <v-btn
              @click="toggleTheme"
              :icon="isDark ? 'mdi-lightbulb-on': 'mdi-lightbulb-off'"
              color="on-background"
          />
          <v-menu>
            <template #activator="{props}">
              <v-badge color="success" dot  offset-x="2" offset-y="20" class="align-self-center">
                <v-avatar :image="avatar"  size="30" v-bind="props"></v-avatar>
              </v-badge>
            </template>
            <v-card min-width="200">
              <v-card-item>
                <template #prepend>
                  <v-badge color="success" dot  size="5" offset-x="2" offset-y="30">
                    <v-avatar :image="avatar"  size="40"></v-avatar>
                  </v-badge>
                </template>
                <v-card-title class="text-body-1 pa-0">{{user?.name}}</v-card-title>
                <v-card-subtitle class="text-caption pa-0 text-capitalize">{{role}}</v-card-subtitle>
              </v-card-item>
              <v-divider></v-divider>
              <v-card-text class="pa-0">
                <v-list>
                  <v-list-item >
                    <template #prepend>
                      <v-icon>mdi-account</v-icon>
                    </template>
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item>
                  <v-list-item >
                    <template #prepend>
                      <v-icon>mdi-settings</v-icon>
                    </template>
                    <v-list-item-title>Settings</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click.stop="logout">
                    <template #prepend>
                      <v-icon>mdi-logout</v-icon>
                    </template>
                    <v-list-item-title >Logout</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>

    </v-container>
  </v-app-bar>
</template>
<script lang="ts" setup>
import {useGlobalStore} from "~/store";
import {storeToRefs} from "pinia";

import { useTheme } from 'vuetify'
import type {User} from "~/interfaces";
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
const { logout} = useSanctumAuth();
const toggleTheme =  () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

const { drawer,isMobile, appName, rail} = storeToRefs(useGlobalStore())
const user = useSanctumUser<User>()
const avatar = computed(() => `https://ui-avatars.com/api/?name=${user.value?.name}`)
const role = computed(() => user.value?.roles[0])
</script>