<script lang="ts" setup>
  import { usePlayerStore } from '~/store'
  const { defaultLineupAvailableTeamPlayers } = storeToRefs(usePlayerStore())
  defineProps<{
    icon: string
    number: number
  }>()
</script>
<template>
  <v-menu max-height="150" location="start">
    <template v-slot:activator="{ props }">
      <v-btn staked icon size="32" border="lg" color="red" readonly>
        <v-badge
          v-bind="props"
          offset-x="-10"
          offset-y="-10"
          location="top end"
          color="primary"
        >
          <template #badge>
            <Icon :name="icon"></Icon>
          </template>
          {{ number }}
        </v-badge>
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item
        v-for="(item, index) in defaultLineupAvailableTeamPlayers"
        :key="index"
        :value="item"
        @click="$emit('addPlayer', { id, player: item })"
      >
        <v-list-item-title
          >{{ item?.name }} | {{ item?.position }}</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>
