<template>
  <div>
     <h1>
       please wait login in ...
     </h1>
  </div>
</template>
<script setup lang="ts">
import {definePageMeta} from "#imports";

definePageMeta({
  layout: "blank",
});

onMounted(() => {
  useNuxtApp().$api.auth.callback('facebook', useRoute().query.code)
      .then(response =>{
        if (response.success) {
          useLocalStorage('token', response.token)
          useRouter().push('/')
        }
      }).catch(error => console.error(error))
})
</script>