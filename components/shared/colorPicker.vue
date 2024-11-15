<script lang="ts" setup>
const color = defineModel("color", {
  type: String,
});
</script>
<template>
  <div
    class="color-picker-items-container__item"
    :style="{ backgroundColor: color }"
  >
    <v-dialog
      activator="parent"
      max-width="264"
      :absolute="true"
      :scrim="false"
      :offset="[150, 0]"
      class="color-picker-dialog"
      elevation="15"
      location-strategy="connected"
    >
      <v-card
        height="350"
        width="264"
        class="d-flex justify-center align-center flex-row pa-4 position-relative"
      >
        <v-color-picker
          width="230"
          elevation="0"
          mode="hexa"
          v-model="color"
        ></v-color-picker>
      </v-card>
      <nuxt-icon name="polygon" filled class="polygon"></nuxt-icon>
    </v-dialog>
  </div>
</template>
<style lang="sass">
.color-picker-dialog, .v-color-picker-canvas
  border-radius: var(--radius-md, 8px)

.v-color-picker-preview__dot
  display: none

.v-color-picker__controls
  padding: 1rem .5rem

.v-color-picker-preview__sliders
  padding: 0

.nuxt-icon.polygon > svg
  width: 66px
  height: 44px

.nuxt-icon.polygon
  position: absolute
  bottom: 0
  left: 50%
  transform: translate(-50%, 100%)

.v-color-picker-edit__input > input
  font-size: .8rem
</style>
