<template>
  <div>
      <v-btn @click="getUser"> get user</v-btn>
    <pre v-if="user">
        {{user}}
    </pre>
  </div>
</template>

<script setup lang="ts">
onMounted(()=>{

  // window?.FB.login(function(response) {
  //   console.log({response})
  //   if (response.authResponse) {
  //     console.log('Welcome!  Fetching your information.... ');
  //     window?.FB.api('/me', function(response) {
  //       console.log({response})
  //       console.log('Good to see you, ' + response.name + '.');
  //     });
  //   } else {
  //     console.log('User cancelled login or did not fully authorize.');
  //   }
  // });

})
const user = ref(null)
const getUser = async () =>{
 user.value = await useNuxtApp().$api?.auth.user()
}
</script>
