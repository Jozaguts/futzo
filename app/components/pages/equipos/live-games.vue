<script lang="ts" setup>
import type {ExportListItem} from '~/models/tournament'

type Props = {
    title?: string
    showExport?: boolean
  }
  const { title = 'Tabla de posiciones', showExport = true } = defineProps<Props>()
  const loading = ref(false)
  const items: ExportListItem[] = [
    { value: 'excel', text: 'Excel', icon: 'futzo-icon:file-type-excel' },
    { value: 'img', text: 'Imagen', icon: 'futzo-icon:file-type-img-primary' },
  ]
  const exportAsHandler = (item: ExportListItem) => {
    loading.value = true
    useTournamentStore()
      .exportTournamentStatsTables(item.value)
      .finally(() => (loading.value = false))
  }
</script>
<template>
  <v-table class="live-games-table futzo-rounded" density="comfortable">
    <template #top>
      <div class="d-flex justify-center align-center w-100">
        <h2 class="live-games-table__title mr-auto">{{ title }}</h2>
        <v-menu
          v-if="showExport && title === 'Líderes de estadísticas'"
          location="start"
          transition="slide-x-transition"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ props }">
            <v-btn variant="plain" v-bind="props" :ripple="false" icon>
              <Icon name="lucide:ellipsis-vertical" size="18" />
            </v-btn>
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
      <div class="v-table__wrapper content">
        <slot name="content">
          <v-skeleton-loader v-if="loading" type="table" class="mb-6" />
        </slot>
      </div>
    </template>
  </v-table>
</template>
<style lang="scss" scoped>
  .live-games-table {
    height: 100%;
    display: flex;
    width: 100%;
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xl, 16px);
  }

  .live-games-table :deep(.v-table__wrapper) {
    overflow: hidden;
    max-height: none;
  }

  .live-games-table__title {
    color: var(--Component-colors-Utility-Gray-utility-gray-800, #182230);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
  }

  .v-table__wrapper.content {
    width: 100%;
  }

  .live-games-table__cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    width: 100%;
    border-radius: var(--radius-md, 8px);
    border: 2px solid var(--colors-gray-light-mode-200, #eee);
  }

  .live-games-table__cell:not(:last-child) {
    margin: 0 0 1rem 0;
  }

  .team {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs, 4px);
    flex: 1 0 0;
    min-height: 80px;
  }

  .data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xs, 4px);
    flex: 1 0 0;
  }

  .logo {
    display: flex;
    width: 48px;
    height: 48px;
    padding: var(--spacing-md, 8px);
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 100px;
    //background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  }

  .team_name {
    color: var(--Component-colors-Utility-Gray-utility-gray-700, #344054);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }

  .data > .live {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xs, 4px);
  }

  .data > .live > span {
    color: var(--Colors-Error-600, #e8454a);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 150% */
  }

  .data > .result {
    display: flex;
    padding: var(--spacing-none, 0px) 16px;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-md, 8px);
    border-radius: 100px;
    background: var(--Colors-Base-Black, #000);
  }

  .data > .result > .text {
    color: var(--futzo-surface);
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 150% */
  }
</style>
