<script lang="ts" setup>

const items = [
  {id: 1, title: 'Editar', icon: 'futzo-icon:edit'},
  {id: 2, title: 'Eliminar', icon: 'futzo-icon:trash-01'},
]
const emits = defineEmits(['click'])
</script>
<template>
  <div class="menu-container">
    <v-menu
        class="rounded-lg border-md"
        location="bottom"
        transition="slide-x-transition"
        :offset="[0,100]"
        width="120"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="menu-btn" color="black" variant="text" icon v-bind="props">
          <Icon name="lucide:ellipsis" size="16" />
        </v-btn>
      </template>
      <v-list density="compact" class="pa-0">
        <v-list-item
            min-height="34"
            v-for="item in items"
            :key="item.id"
            class="py-0"
            @click="() => emits('click', item.title)"
        >
          <div class="menu-item-container">
            <Icon :name="item.icon"></Icon>
            <span class="text-item"> {{ item.title }}</span>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<style scoped lang="sass">
.menu-container
  position: relative
  z-index: 3

.menu-btn
  background-color: rgba(236, 236, 236, 0.50)
  box-shadow: 0 2px 2px -1

.menu-item-container
  display: flex
  justify-content: flex-start
  justify-items: center
  cursor: pointer
  min-width: 120px

.text-item
  font-size: 12px
  line-height: 18px
  color: #181D27
  font-weight: 500
  margin-left: 8px
</style>
