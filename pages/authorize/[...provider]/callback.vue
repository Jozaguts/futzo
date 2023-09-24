<template>
  <div>
     <h1>
       please wait login in ...
     </h1>
  </div>
</template>
<script setup lang="ts">

onMounted(async () => {
 const response = await  useNuxtApp().$api.auth.callback('facebook', useRoute().query.code)
 if (response.success) {
   useLocalStorage('token',response.token)
   useRouter().push('/')
 }
})
</script>