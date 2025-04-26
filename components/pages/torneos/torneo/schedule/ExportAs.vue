<script lang="ts" setup>
</script>
<template>
  <v-select
      class="app-bar-secondary-btn mr-4"
      item-title="text"
      density="compact"
      min-width="200"
      max-width="200"
      item-value="value"
      model-value="Exportar como"
      variant="outlined"
      :items="[
      { value: 'excel', text: 'Excel', icon: 'futzo-icon:file-type-excel' },
      { value: 'image', text: 'Imagen', icon: 'futzo-icon:file-type-img-primary' },
    ]"
  >
    <template v-slot:item="{ props: itemProps, item }">
      <v-list-item v-bind="itemProps">
        <template #prepend>
          <Icon :name="item.raw.icon" class="mr-2"></Icon>
        </template>
      </v-list-item>
    </template>
    <template #selection="{item}"><span class="app-bar-secondary-btn__input_text ">{{ item.title }}</span></template>
  </v-select>
</template>
<style></style>
