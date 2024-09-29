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
    height="100%"
  >
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
      <v-chip color="primary" border="lg" class="text-capitalize">
        {{ item.status }}
      </v-chip>
    </template>
    <template #item.actions="{ item }">
      <div>
        <slot name="actions" :item="item"></slot>
      </div>
    </template>
    <template #bottom="props">
      <v-divider />
      <v-pagination
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
              <nuxt-icon name="arrow-left" filled></nuxt-icon>
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
              <nuxt-icon name="arrow-right" filled></nuxt-icon>
            </template>
            Siguiente
          </v-btn>
        </template>
      </v-pagination>
    </template>
  </v-data-table>
</template>
