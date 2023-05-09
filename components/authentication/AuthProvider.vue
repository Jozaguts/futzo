<script setup lang="ts">
import { useTheme } from 'vuetify'
const vuetifyTheme = useTheme()

const authProviders = [
  {
    icon: 'mdi-facebook',
    color: '#4267b2',
    colorInDark: '#4267b2',
    provider: 'facebook',
  },
  {
    icon: 'mdi-twitter',
    color: '#1da1f2',
    colorInDark: '#1da1f2',
    provider: 'twitter',
  },
  {
    icon: 'mdi-google',
    color: '#db4437',
    colorInDark: '#db4437',
    provider: 'google',
  },
]
const PROVIDERS = {
    facebook: 'facebook',
    twitter: 'twitter',
    google: 'google',
}
const launchProvider = (provider: string) => {
  if (provider === PROVIDERS.facebook){
      try {
          window?.FB.login(function(response) {
              console.log({response})
              // if (response.authResponse) {
              //     useNuxtApp()?.$api.auth.loginWithFacebook(response.authResponse)
              //     console.log('Welcome!  Fetching your information.... ');
              //     window?.FB.api('/me', function(response) {
              //         console.log({response})
              //         console.log('Good to see you, ' + response.name + '.');
              //     });
              // } else {
              //     console.log('User cancelled login or did not fully authorize.');
              // }
          });
      }catch (error) {
          console.log(error)
      }
  }
}
</script>

<template>
    <VBtn
            v-for="link in authProviders"
            :key="link.icon"
            :icon="link.icon"
            variant="text"
            @click="launchProvider(link.provider)"
            :color="vuetifyTheme.global.name.value === 'dark' ? link.colorInDark : link.color"
    />
</template>
