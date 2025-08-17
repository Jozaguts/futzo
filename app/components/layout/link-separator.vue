<template>
  <v-list-item-title>
    <p class="d-block list-separator text-caption text-disabled text-uppercase">{{name}}</p>
  </v-list-item-title>
</template>
<script lang="ts" setup>
defineProps({
  name: String
})
</script>
<style>
.list-separator{
  position: relative;
}

.v-list-item-title > .list-separator::after {
  content: "";
  width: 100%;
  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
  margin-left: .5rem;
}
.v-theme--dark > .v-list-item-title > .list-separator::after {
  border-block-end: 1px solid rgba(231, 227, 252, 0.12);

}
.v-theme--light > .v-list-item-title > .list-separator::after {
  border-block-end: 1px solid rgba(46, 38, 61, 0.12);
}

</style>