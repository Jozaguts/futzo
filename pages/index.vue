<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Dashboard</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import {useGlobalStore} from "~/store";

watchEffect(()=>{
  const route = useRoute();
  const router = useRouter();
  const globalStore = useGlobalStore();
  if (route.query?.code === 'USER_NOT_VERIFIED'){
    globalStore.showErrorNotification({
      message: 'Correo electrónico no ha sido verificado'
    })
    router.replace('/');
  }
})
</script>
