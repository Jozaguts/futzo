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
  const provider = useRoute().params.provider[0]
  if ( provider === 'google' || provider === 'facebook') {
    const client = useSanctumClient()
    client( `/auth/${provider}/callback`)
        .then(response =>{
          if (response.success) {
            useLocalStorage('token', response.token)
            useRouter().push('/')
          }
        }).catch(error => console.error(error))
  } else{
    console.error('provider not found')
  }

})
</script>