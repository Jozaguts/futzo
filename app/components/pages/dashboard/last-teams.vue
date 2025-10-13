<script lang="ts" setup>
  import getHeaders from '~/utils/headers-table'
  const headers = getHeaders('teams')
  await useTeamStore().getTeams()
  const { teams, search, pagination } = storeToRefs(useTeamStore())
</script>
<template>
  <Table
    v-if="teams?.length"
    :headers="headers"
    :items="teams"
    itemKey="name"
    :search.sync="search"
    v-model:pagination="pagination"
    :paginate="useTeamStore().getTeams"
    :show-footer="$vuetify.display.mobile"
    :show-link="true"
    :items-per-page="$vuetify.display.mobile ? 1 : 15"
  >
    <template #name="item">
      <div class="d-flex align-center">
        <v-btn variant="text" :to="`equipos/${item.slug}`">
          <template #prepend>
            <v-avatar :image="item?.image" density="compact" />
          </template>
          <span class="d-inline-block text-truncate mx-4" style="max-width: 100px"> {{ item?.name }}</span>
        </v-btn>
      </div>
    </template>
  </Table>
  <v-empty-state
    v-else
    image="/no-data.svg"
    size="100"
    text="No hay equipos"
    title="Últimos equipos inscritos"
  ></v-empty-state>
</template>
