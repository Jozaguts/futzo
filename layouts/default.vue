<template>
 <v-app>
   <Navigation > </Navigation>
   <AppBar > </AppBar>
   <v-main v-show="show">
     <slot></slot>
   </v-main>
   <v-footer app>
      <v-container>
        <v-row>
          <v-col>
            <span class="caption">© 2021 Futzo</span>
          </v-col>
        </v-row>
      </v-container>
   </v-footer>
   <CustomSnackbar />
 </v-app>
</template>

<script setup lang="ts">
import Navigation from '~/components/layout/navigation-drawer.vue'
import AppBar from  '~/components/layout/app-bar.vue'
import CustomSnackbar from '~/components/snackbar.vue'
const show = ref(false);
onMounted(() => {
  show.value = true;
});
</script>
<style>
.v-list-group__items{
  --indent-padding: 1rem;
}
.v-list-group__items > .v-list-item.v-list-item--active.v-list-item--link.v-list-item--nav{
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  background: linear-gradient(-72.47deg, rgb(145, 85, 253) 22.16%, rgba(145, 85, 253, 0.7) 76.47%) !important;
}
.v-list-group__items > .v-list-item.v-list-item--link.v-list-item--nav{
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
}
.v-list-group__items > .v-list-item.v-list-item--active.v-list-item--link.v-list-item--nav> .v-list-item__overlay{
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
}
 .v-list--nav > .v-list-item--active {
  background: linear-gradient(-72.47deg, rgb(145, 85, 253) 22.16%, rgba(145, 85, 253, 0.7) 76.47%) !important;
}
.v-list--nav > .v-list-item:hover, .v-list--nav > .v-list-item--active {
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
}
 .v-list-group__items > .v-list-item .v-list-item--active {
   background: linear-gradient(-72.47deg, rgb(145, 85, 253) 22.16%, rgba(145, 85, 253, 0.7) 76.47%) !important;
 }
</style>
