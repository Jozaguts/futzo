<script lang="ts" setup>
import RolesPermissions from "~/components/pages/configuration/roles-permissions.vue";
const route = useRoute()

const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  { title: 'Roles y permisos', icon: 'mdi-account-outline', tab: 'roles-permissions' },
]
</script>

<template>
  <div>
    <VTabs
        v-model="activeTab"
        show-arrows
    >
      <VTab
          v-for="item in tabs"
          :key="item.icon"
          :value="item.tab"
      >
        <VIcon
            size="20"
            start
            :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow
        v-model="activeTab"
        class="mt-5 disable-tab-transition"
    >
      <!-- Roles & permissions -->
      <VWindowItem value="roles-permissions">
        <RolesPermissions />
      </VWindowItem>

    </VWindow>
  </div>
</template>