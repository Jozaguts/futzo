<script setup lang="ts">
  import getHeaders from '~//utils/headers-table'
  const { standings } = defineProps<{
    standings: any
  }>()
  const headers = getHeaders('standings')
  type exportListItem = {
    value: 'excel' | 'img'
    text: string
    icon: string
  }
  const items: exportListItem[] = [
    { value: 'excel', text: 'Excel', icon: 'futzo-icon:file-type-excel' },
    { value: 'img', text: 'Imagen', icon: 'futzo-icon:file-type-img-primary' },
  ]
  const loading = ref(false)
  const exportAsHandler = (item: exportListItem) => {
    loading.value = true
    useTournamentStore()
      .exportStandingTournament(item.value)
      .finally(() => (loading.value = false))
  }
</script>
<template>
  <v-table class="positions-table futzo-table">
    <template #top>
      <div class="d-flex align-center">
        <h2 class="positions-table-title mt-0">Tabla de posiciones</h2>
        <v-spacer />
        <v-menu location="start" transition="slide-x-transition" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" variant="plain" v-bind="props" :ripple="false" />
          </template>
          <v-list density="compact" nav :disabled="loading">
            <v-list-subheader> Exportar </v-list-subheader>
            <v-list-item v-for="(item, i) in items" :key="i" :value="i" @click="exportAsHandler(item)">
              <template #prepend>
                <Icon :name="item.icon" class="mr-2"></Icon>
              </template>
              <v-list-item-title>{{ item.text }} </v-list-item-title>
            </v-list-item>
            <v-progress-linear indeterminate height="2" v-show="loading" />
          </v-list>
        </v-menu>
      </div>
    </template>
    <template #wrapper>
      <div class="v-table__wrapper">
        <Table :headers="headers" :items="standings" itemKey="name" :showFooter="false" show-complete />
      </div>
    </template>
  </v-table>
</template>
<style lang="scss" scoped>
  .positions-table {
    background: var(--Colors-Base-White, #fff);
    border-radius: var(--radius-md, 8px);
  }

  .positions-table > .v-table__wrapper > table > tbody > tr:nth-child(odd) {
    border-bottom: 1px solid var(--Colors-Border-border-secondary, #eaecf0);
    background: var(--Colors-Background-bg-primary_hover, #f9fafb);
  }

  .positions-table-title {
    color: var(--Component-colors-Utility-Gray-utility-gray-800, #182230);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    margin: 0;
  }

  .positions-table > .v-table__wrapper > table {
    border-radius: var(--radius-md, 8px);
    border: 1px solid var(--Colors-Border-border-secondary, #eaecf0);
  }

  .positions-table > .v-table__wrapper > table > tbody > tr > td,
  table > tbody > tr {
    text-align: center !important;
    border-bottom: 1px solid #eaecf0 !important;
  }

  .positions-table > .v-table__wrapper > table > thead > tr > th {
    text-align: center !important;
    border-bottom: 1px solid #eaecf0 !important;
  }
</style>
