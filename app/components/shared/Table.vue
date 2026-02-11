<script lang="ts" setup>
  import type { Header, IPagination } from '~/interfaces'
  import { useDisplay } from 'vuetify'
  import type { Team } from '~/models/Team'
  import { Icon } from '#components'
  const props = defineProps({
    headers: {
      type: Array as PropType<Header[]>,
      required: true,
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false,
    },
    items: {
      type: Array,
      required: true,
      default: [],
    },
    itemKey: {
      type: String,
      default: 'name',
    },
    statusHandler: {
      type: Function as PropType<(item: string) => string>,
      required: false,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    paginate: {
      type: Function,
      required: false,
    },
    assignTeam: {
      type: Function as PropType<(item: any) => void>,
      required: false,
    },
    enableAssignTeam: {
      type: Boolean,
      default: false,
      required: false,
    },
    showComplete: {
      type: Boolean,
      required: false,
      default: false,
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: undefined,
    },
  })
  const search = defineModel('search', {
    type: String,
    required: false,
  })
  const pagination = defineModel<IPagination>('pagination', { required: false })
  const itemPerPage = computed(() => {
    if (props.showComplete) {
      return props.items?.length ?? 0
    }
    if (typeof props.itemsPerPage === 'number') {
      return props.itemsPerPage
    }
    if (pagination.value?.per_page) {
      return pagination.value.per_page
    }
    return 10
  })
  const last5Handler = (last_5: string) => {
    return last_5.split('').map((value: string) => {
      switch (value) {
        case '-':
          return { icon: 'mdi:checkbox-blank-circle-outline', color: 'gray', label: 'No jugó' }
        case 'W':
          return { icon: 'mdi:checkbox-marked-circle', color: 'green', label: 'Ganó' }
        case 'L':
          return { icon: 'mdi:close-circle', color: 'red', label: 'Perdió' }
        case 'D':
          return { icon: 'ic:outline-remove-circle', color: 'gray', label: 'Empate' }
      }
    })
  }
  const { mobile } = useDisplay()
  const emits = defineEmits(['openAssignModal'])
  const resolveStatus = (status?: string | null) => {
    if (!props.statusHandler) {
      return { label: status ?? '-', color: undefined }
    }
    const result = props.statusHandler(status ?? '')
    if (typeof result === 'string') {
      return { label: status ?? '-', color: result }
    }
    return {
      label: result?.label ?? status ?? '-',
      color: result?.color,
    }
  }

  const resolveTournamentProgress = (item: any) => {
    const gamesProgress = item?.games_progress
    if (gamesProgress && typeof gamesProgress === 'object') {
      return {
        percent: Number(gamesProgress.percent ?? 0),
        label: gamesProgress.label ?? '0/0',
      }
    }

    const legacyProgress = item?.progress
    return {
      percent: Number(legacyProgress?.percent ?? 0),
      label: legacyProgress?.label ?? '0/0',
    }
  }
</script>
<template>
  <v-data-table
    class="border-sm futzo-rounded"
    :headers="headers"
    :items="items"
    :search="search"
    :item-key="itemKey"
    :items-per-page="itemPerPage"
    :show-select="selectable"
    :cell-props="{ class: 'text-capitalize' }"
    height="100%"
    fixed-header
    sticky
    :hide-default-header="$vuetify.display.mobile"
    striped="odd"
    :mobile="mobile"
  >
    <!--    header-->
    <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
      <v-checkbox-btn
        :indeterminate="someSelected && !allSelected"
        :model-value="allSelected"
        color="primary"
        @update:model-value="selectAll(!allSelected)"
      >
      </v-checkbox-btn>
    </template>
    <!-- name column-->
    <template #[`item.name`]="{ item }">
      <slot name="name" v-bind="item">
        <div class="d-flex align-center">
          <v-avatar :image="item?.image" density="compact"> </v-avatar>
          <span class="d-inline-block text-truncate mx-4" style="max-width: 100px"> {{ item?.name }}</span>
        </div>
      </slot>
    </template>
    <template #[`item.president.email`]="{ item }">
      <span class="d-inline-block text-truncate" style="max-width: 100px"> {{ item?.president?.email }}</span>
    </template>
    <template #[`item.tournament.name`]="{ item }">
      <span class="d-inline-block text-truncate" style="max-width: 100px"> {{ item?.tournament?.name }}</span>
    </template>
    <template #[`item.president.phone`]="{ item }">
      <span class="d-inline-block text-truncate" style="max-width: 100px"> {{ item?.president?.phone }}</span>
    </template>
    <template #[`item.image`]="{ item }">
      <v-avatar size="50" :image="item.image"></v-avatar>
    </template>
    <template #item.home_preferences="{ item }">
      <div class="d-flex align-center gap-2">
        <div v-if="item?.home_preferences?.location">
          <div class="text-body-2 font-weight-medium">{{ item?.home_preferences?.location?.name }}</div>
          <div
            class="text-caption text-medium-emphasis"
            v-if="item?.home_preferences?.day_label || item?.home_preferences?.start_time"
          >
            <span v-if="item?.home_preferences?.day_label">{{ item?.home_preferences?.day_label }}</span>
            <span v-if="item?.home_preferences?.day_label && item?.home_preferences?.start_time">&nbsp;·&nbsp;</span>
            <span v-if="item?.home_preferences?.start_time">{{ item?.home_preferences?.start_time }} hrs</span>
          </div>
        </div>
        <v-btn
          v-if="item?.home_preferences?.location"
          icon
          size="small"
          variant="text"
          color="primary"
          @click="emits('openAssignModal', item as Team)"
        >
          <Icon name="mdi-pencil" size="18" />
        </v-btn>
        <div v-else class="d-flex flex-column">
          <v-btn
            size="small"
            variant="outlined"
            density="comfortable"
            color="primary"
            @click="emits('openAssignModal', item as Team)"
          >
            Asignar sede
          </v-btn>
          <div class="mt-2">
            <span v-if="item?.home_preferences?.day_label && item?.home_preferences?.start_time">&nbsp;·&nbsp;</span>
            <span v-if="item?.home_preferences?.start_time">{{ item?.home_preferences?.start_time }} hrs</span>
          </div>
        </div>
      </div>
    </template>
    <template #[`item.birthdate`]="{ item }">
      <v-tooltip :text="item.birthdate.date">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="cursor-pointer"> {{ item.birthdate.age }}</span>
        </template>
      </v-tooltip>
    </template>
    <template v-slot:item.team.name="{ item }">
      <v-btn
        size="small"
        rounded="md"
        variant="outlined"
        class="table-action-btn"
        :disabled="!enableAssignTeam"
        v-if="!item?.team?.name"
        @click="() => assignTeam(item)"
        >Asignar equipo
      </v-btn>
      <span v-else>{{ item.team.name }}</span>
    </template>
    <template v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }">
      <v-checkbox-btn
        :model-value="isSelected(internalItem)"
        color="primary"
        @update:model-value="toggleSelect(internalItem)"
      ></v-checkbox-btn>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip :color="resolveStatus(item?.status).color" border="md" class="text-capitalize">
        {{ resolveStatus(item?.status).label }}
      </v-chip>
    </template>
    <template #[`item.progress`]="{item}">
      <div class="tournament-progress">
        <v-progress-linear
            :model-value="resolveTournamentProgress(item).percent"
            height="6"
            rounded
            color="primary"
            class="tournament-progress__bar"
        />
        <span class="tournament-progress__label">{{ resolveTournamentProgress(item).label }}</span>
      </div>
    </template>
    <template #item.actions="{ item }">
      <slot name="actions" :item="item"></slot>
    </template>
    <template #item.last_5="{ item }">
      <span v-for="color in last5Handler(item.last_5)" :key="item.id + color.color" class="text-lowercase">
        <v-tooltip :text="color?.label" location="bottom">
          <template v-slot:activator="{ props }">
            <Icon v-bind="props" :name="color?.icon" :class="`text-${color?.color}`" size="20" class="cursor-pointer" />
          </template>
        </v-tooltip>
      </span>
    </template>
    <template #bottom>
      <v-divider />
      <v-pagination
        v-if="showFooter"
        class="futzo-pagination"
        v-model="pagination.current_page"
        :length="pagination.last_page"
        start="1"
        :total-visible="mobile ? 1 : 10"
        @update:modelValue="() => paginate()"
      >
        <template #prev="props">
          <v-btn
            @click="props.onClick"
            :disabled="props.disabled"
            elevation="0"
            variant="text"
            color="black"
            rounded="md"
            border="thin secondary"
          >
            <template #prepend>
              <Icon name="futzo-icon:arrow-left"></Icon>
            </template>
            Anterior
          </v-btn>
        </template>
        <template #next="props">
          <v-btn
            @click="props.onClick"
            :disabled="props.disabled"
            elevation="0"
            variant="text"
            color="black"
            rounded="md"
            border="thin secondary"
            class="ml-auto"
          >
            <template #append>
              <Icon name="futzo-icon:arrow-right"></Icon>
            </template>
            Siguiente
          </v-btn>
        </template>
      </v-pagination>
    </template>
  </v-data-table>
</template>
<style scoped>
  .tournament-progress {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .tournament-progress__bar {
    width: 80px;
  }

  .tournament-progress__label {
    font-size: 12px;
    color: #667085;
  }
</style>
