<template>
  <div>
    <v-layout>
      <v-app app>
        <ClientOnly>
          <VSonner position="top-right" />
        </ClientOnly>
        <ClientOnly>
          <Navigation > </Navigation>
          <AppBar> </AppBar>
          <v-main v-show="show" class="v-main" app >
            <slot></slot>
          </v-main>
          <v-footer  color="background" app class="d-flex justify-start align-center" height="64px" >
            <span class="caption ml-4">© 2021 Futzo</span>
          </v-footer>
        </ClientOnly>
      </v-app>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
import Navigation from '~/components/layout/navigation-drawer.vue'
import AppBar from  '~/components/layout/app-bar.vue'
import {VSonner} from "vuetify-sonner";
import {useGlobalStore} from "~/store";
import {storeToRefs} from "pinia";
const show = ref(false);
const { rail } = storeToRefs(useGlobalStore())
onMounted(() => {
  show.value = true;
});
const paddingLeft = computed(() => {
  return rail.value ? '56px' : '256px';
});
watchEffect(()=>{
  console.log(useRoute());
  if (useRoute().query?.code === '401'){
    useGlobalStore().showErrorNotification({
      message: 'Correo electronico no ha sido verificado'
    })
    useRouter().replace('/')
  }
})
</script>
<style>
.v-main{
  padding-left: v-bind(paddingLeft);
  padding-bottom: 64px;
}
@media (min-width: 920px) {
  .v-main{
    padding-left: v-bind(paddingLeft);
  }
}
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
