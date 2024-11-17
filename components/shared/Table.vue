<script lang="ts" setup>
type Header = {
  title: string;
  value: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  filterable?: boolean;
  divider?: boolean;
};

defineProps({
  headers: {
    type: Array as PropType<Header[]>,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  itemKey: {
    type: String,
    default: "name",
  },
  statusHandler: {
    type: Function as PropType<(item: string) => string>,
    required: false,
  },
  showIndex: {
    type: Boolean,
    default: false,
  },
  customName: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
});
const search = defineModel("search", {
  type: String,
  required: false,
});
const pagination = defineModel("pagination", {
  type: Object as PropType<{ page: number; total: number }>,
  required: true,
});
</script>
<template>
  <v-data-table
    class="border-sm futzo-rounded"
    :headers="headers"
    :items="items"
    :search="search"
    :item-key="itemKey"
    items-per-page="10"
    show-select
    :cell-props="{ class: 'text-capitalize' }"
    height="100%"
  >
    <!--    header-->
    <template
      v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }"
    >
      <v-checkbox-btn
        :indeterminate="someSelected && !allSelected"
        :model-value="allSelected"
        color="primary"
        @update:model-value="selectAll(!allSelected)"
      >
      </v-checkbox-btn>
    </template>
    <!--index colum-->
    <template v-if="showIndex" #[`item.index`]="{ index }">
      {{ index + 1 }}
    </template>
    <!-- name column-->
    <template v-if="customName" #[`item.name`]="{ item }">
      <v-avatar :image="item.image"></v-avatar>
      {{ item.name }}
    </template>
    <template #[`item.image`]="{ item }">
      <v-avatar size="50" :image="item.image"></v-avatar>
    </template>
    <template #[`item.birthdate`]="{ item }">
      <v-tooltip :text="item.birthdate.date">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="cursor-pointer">
            {{ item.birthdate.age }}</span
          >
        </template>
      </v-tooltip>
    </template>
    <template
      v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }"
    >
      <v-checkbox-btn
        :model-value="isSelected(internalItem)"
        color="primary"
        @update:model-value="toggleSelect(internalItem)"
      ></v-checkbox-btn>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip :color="statusHandler(item)" border="lg" class="text-capitalize">
        {{ item.status }}
      </v-chip>
    </template>
    <template #item.actions="{ item }">
      <div>
        <slot name="actions" :item="item"></slot>
      </div>
    </template>
    <template #bottom>
      <v-divider />
      <v-pagination
        v-if="showFooter"
        class="futzo-pagination"
        v-model="pagination.page"
        :length="pagination.total"
        start="1"
        @update:modelValue="
          $emit('update:pagination', { ...pagination, page: $event })
        "
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
