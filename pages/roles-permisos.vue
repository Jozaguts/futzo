<script lang="ts" setup>
import PageLayout from "~/components/shared/page-layout/index.vue";
import AppBar from "~/components/layout/app-bar.vue";
import RolesPermissions from "~/components/pages/configuration/roles-permissions.vue";

definePageMeta({
  middleware: "admin",
});
const route = useRoute();

const activeTab = ref(route.params.tab);

const tabs = [
  {
    title: "Roles y permisos",
    icon: "mdi-account-outline",
    tab: "roles-permissions",
  },
];
</script>

<template>
  <PageLayout>
    <template #app-bar>
      <AppBar />
    </template>
    <template #default>
      <v-container fluid>
        <v-row>
          <v-col>
            <VTabs v-model="activeTab">
              <VTab v-for="tab in tabs" :key="tab.icon" :value="tab.tab">
                <VIcon size="20" start :icon="tab.icon" />
                {{ tab.title }}
              </VTab>
            </VTabs>
            <v-divider></v-divider>
            <VWindow v-model="activeTab" class="mt-5 disable-tab-transition">
              <VWindowItem value="roles-permissions">
                <RolesPermissions />
              </VWindowItem>
            </VWindow>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </PageLayout>
</template>
